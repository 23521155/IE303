import { BE_URL } from '@/src/utils/constans';

export type NextFetchOptions = {
    revalidate?: number | false;
    tags?: string[];
};

export type ServiceRequestOptions = Omit<RequestInit, 'body'> & {
    body?: BodyInit | Record<string, unknown> | unknown[] | null;
    query?: Record<string, string | number | boolean | null | undefined>;
    next?: NextFetchOptions;
};

export interface ApiEnvelope<T> {
    success?: boolean;
    message?: string;
    statusCode?: number;
    data: T;
}

export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly payload?: unknown,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export interface ApiResponse<T> {
    response: Response;
    data: T;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' &&
    value !== null &&
    !(value instanceof FormData) &&
    !(value instanceof URLSearchParams) &&
    !(value instanceof Blob) &&
    !(value instanceof ArrayBuffer);

const buildUrl = (path: string, query?: ServiceRequestOptions['query']) => {
    const url = new URL(path.startsWith('http') ? path : `${BE_URL}${path}`);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.set(key, String(value));
            }
        });
    }

    return url.toString();
};

const normalizeBody = (body: ServiceRequestOptions['body']) => {
    if (body == null) {
        return { body: undefined, contentType: undefined as string | undefined };
    }

    if (typeof body === 'string' || body instanceof FormData || body instanceof URLSearchParams || body instanceof Blob) {
        return { body, contentType: undefined as string | undefined };
    }

    if (body instanceof ArrayBuffer) {
        return { body, contentType: undefined as string | undefined };
    }

    if (Array.isArray(body) || isPlainObject(body)) {
        return { body: JSON.stringify(body), contentType: 'application/json' };
    }

    return { body: body as BodyInit, contentType: undefined as string | undefined };
};

const parseResponsePayload = async (response: Response) => {
    if (response.status === 204) return null;

    const contentType = response.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
        return response.json();
    }

    return response.text();
};

export async function apiRequest<T>(path: string, options: ServiceRequestOptions = {}): Promise<T> {
    const { query, body: rawBody, headers, ...fetchOptions } = options;
    const { body, contentType } = normalizeBody(rawBody);

    const mergedHeaders = new Headers(headers);

    if (contentType && !mergedHeaders.has('Content-Type')) {
        mergedHeaders.set('Content-Type', contentType);
    }

    const response = await fetch(buildUrl(path, query), {
        ...fetchOptions,
        headers: mergedHeaders,
        body,
    });

    const payload = await parseResponsePayload(response);

    if (!response.ok) {
        const message =
            typeof payload === 'object' &&
            payload !== null &&
            'message' in payload &&
            typeof payload.message === 'string'
                ? payload.message
                : `Request failed with status ${response.status}`;

        throw new ApiError(message, response.status, payload);
    }

    return payload as T;
}

export async function apiRequestWithResponse<T>(
    path: string,
    options: ServiceRequestOptions = {},
): Promise<ApiResponse<T>> {
    const { query, body: rawBody, headers, ...fetchOptions } = options;
    const { body, contentType } = normalizeBody(rawBody);

    const mergedHeaders = new Headers(headers);

    if (contentType && !mergedHeaders.has('Content-Type')) {
        mergedHeaders.set('Content-Type', contentType);
    }

    const response = await fetch(buildUrl(path, query), {
        ...fetchOptions,
        headers: mergedHeaders,
        body,
    });

    const payload = await parseResponsePayload(response);

    if (!response.ok) {
        const message =
            typeof payload === 'object' &&
            payload !== null &&
            'message' in payload &&
            typeof payload.message === 'string'
                ? payload.message
                : `Request failed with status ${response.status}`;

        throw new ApiError(message, response.status, payload);
    }

    return {
        response,
        data: payload as T,
    };
}

export async function apiStream(path: string, options: ServiceRequestOptions = {}): Promise<Response> {
    const { query, body: rawBody, headers, ...fetchOptions } = options;
    const { body, contentType } = normalizeBody(rawBody);

    const mergedHeaders = new Headers(headers);

    if (contentType && !mergedHeaders.has('Content-Type')) {
        mergedHeaders.set('Content-Type', contentType);
    }

    const response = await fetch(buildUrl(path, query), {
        ...fetchOptions,
        headers: mergedHeaders,
        body,
    });

    if (!response.ok) {
        const payload = await parseResponsePayload(response);
        const message =
            typeof payload === 'object' &&
            payload !== null &&
            'message' in payload &&
            typeof payload.message === 'string'
                ? payload.message
                : `Request failed with status ${response.status}`;

        throw new ApiError(message, response.status, payload);
    }

    return response;
}

export const apiClient = {
    get<T>(path: string, options?: ServiceRequestOptions) {
        return apiRequest<T>(path, { ...options, method: 'GET' });
    },
    getWithResponse<T>(path: string, options?: ServiceRequestOptions) {
        return apiRequestWithResponse<T>(path, { ...options, method: 'GET' });
    },
    post<T>(path: string, body?: ServiceRequestOptions['body'], options?: ServiceRequestOptions) {
        return apiRequest<T>(path, { ...options, method: 'POST', body });
    },
    postWithResponse<T>(path: string, body?: ServiceRequestOptions['body'], options?: ServiceRequestOptions) {
        return apiRequestWithResponse<T>(path, { ...options, method: 'POST', body });
    },
    put<T>(path: string, body?: ServiceRequestOptions['body'], options?: ServiceRequestOptions) {
        return apiRequest<T>(path, { ...options, method: 'PUT', body });
    },
    patch<T>(path: string, body?: ServiceRequestOptions['body'], options?: ServiceRequestOptions) {
        return apiRequest<T>(path, { ...options, method: 'PATCH', body });
    },
    delete<T>(path: string, options?: ServiceRequestOptions) {
        return apiRequest<T>(path, { ...options, method: 'DELETE' });
    },
    stream(path: string, options?: ServiceRequestOptions) {
        return apiStream(path, options);
    },
};
