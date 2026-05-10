package com.edu.auth_service.controller;

import com.edu.auth_service.dto.internal.LoginResult;
import com.edu.auth_service.dto.request.LoginRequest;
import com.edu.auth_service.dto.request.RegisterRequest;
import com.edu.auth_service.dto.response.ApiResponse;
import com.edu.auth_service.dto.response.LoginResponse;
import com.edu.auth_service.dto.response.RegisterResponse;
import com.edu.auth_service.exception.AuthException;
import com.edu.auth_service.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthController — unit tests")
class AuthControllerTest {

    @Mock AuthService authService;

    @InjectMocks AuthController controller;

    // ══════════════════════════════ LOGIN ═════════════════════════════════════

    @Test
    @DisplayName("login: thành công → response body chứa userId (không chứa token)")
    void login_thanhCong_responseBodyChuaUserId() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@gmail.com");
        request.setPassword("password123");

        when(authService.login(any())).thenReturn(new LoginResult("eyJhbGc.payload.sig", 42L));

        ApiResponse<LoginResponse> result = controller.login(request, new MockHttpServletResponse());

        assertThat(result.getStatusCode()).isEqualTo(200);
        assertThat(result.getMessage()).isEqualTo("Đăng nhập thành công");
        assertThat(result.getData().getUserId()).isEqualTo(42L);
    }

    @Test
    @DisplayName("login: thành công → Set-Cookie header có HttpOnly, SameSite=Lax, Max-Age=86400")
    void login_thanhCong_setCookieDungThuocTinh() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@gmail.com");
        request.setPassword("password123");

        when(authService.login(any())).thenReturn(new LoginResult("my-jwt-token", 42L));

        MockHttpServletResponse response = new MockHttpServletResponse();
        controller.login(request, response);

        String setCookie = response.getHeader(HttpHeaders.SET_COOKIE);
        assertThat(setCookie).isNotNull();
        assertThat(setCookie).contains("token=my-jwt-token");
        assertThat(setCookie).containsIgnoringCase("HttpOnly");
        assertThat(setCookie).containsIgnoringCase("SameSite=Lax");
        assertThat(setCookie).containsIgnoringCase("Max-Age=86400");
        assertThat(setCookie).containsIgnoringCase("Path=/");
    }

    @Test
    @DisplayName("login: response body KHÔNG có field 'token' (bảo mật XSS)")
    void login_thanhCong_responseBodyKhongChuaToken() {
        when(authService.login(any())).thenReturn(new LoginResult("secret-token", 42L));

        ApiResponse<LoginResponse> result = controller.login(new LoginRequest(), new MockHttpServletResponse());

        boolean hasTokenField = false;
        for (var field : result.getData().getClass().getDeclaredFields()) {
            if (field.getName().equalsIgnoreCase("token")) {
                hasTokenField = true;
                break;
            }
        }
        assertThat(hasTokenField).isFalse();
    }

    @Test
    @DisplayName("login: authService throw AuthException → exception lan ra controller")
    void login_authServiceThrowAuthException_exceptionLanRa() {
        when(authService.login(any())).thenThrow(new AuthException("Sai mật khẩu"));

        assertThatThrownBy(() -> controller.login(new LoginRequest(), new MockHttpServletResponse()))
                .isInstanceOf(AuthException.class)
                .hasMessage("Sai mật khẩu");
    }

    // ══════════════════════════════ LOGOUT ════════════════════════════════════

    @Test
    @DisplayName("logout: Set-Cookie header xóa cookie bằng Max-Age=0")
    void logout_setCookieMaxAge0() {
        MockHttpServletResponse response = new MockHttpServletResponse();

        ApiResponse<String> result = controller.logout(response);

        assertThat(result.getStatusCode()).isEqualTo(200);
        assertThat(result.getMessage()).isEqualTo("Đăng xuất thành công");

        String setCookie = response.getHeader(HttpHeaders.SET_COOKIE);
        assertThat(setCookie).isNotNull();
        assertThat(setCookie).containsIgnoringCase("Max-Age=0");
        assertThat(setCookie).containsIgnoringCase("HttpOnly");
        assertThat(setCookie).containsIgnoringCase("SameSite=Lax");
    }

    @Test
    @DisplayName("logout: KHÔNG gọi authService (stateless)")
    void logout_khongGoiAuthService() {
        controller.logout(new MockHttpServletResponse());
        verifyNoInteractions(authService);
    }

    // ══════════════════════════════ REGISTER ══════════════════════════════════

    @Test
    @DisplayName("register: thành công → statusCode 200, message đúng, data có credentialId")
    void register_thanhCong_traVe200VoiCredentialId() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Nguyen Van A");
        request.setEmail("user@gmail.com");
        request.setPhoneNumber("0123456789");
        request.setStatus("student");
        request.setPassword("password123");

        when(authService.register(any())).thenReturn(new RegisterResponse(42L));

        ApiResponse<RegisterResponse> result = controller.register(request);

        assertThat(result.getStatusCode()).isEqualTo(200);
        assertThat(result.getMessage()).isEqualTo("Đăng ký thành công");
        assertThat(result.getData().getCredentialId()).isEqualTo(42L);
    }

    @Test
    @DisplayName("register: authService throw exception → exception lan ra controller")
    void register_authServiceThrowException_exceptionLanRa() {
        when(authService.register(any())).thenThrow(new RuntimeException("Email đã được sử dụng"));

        assertThatThrownBy(() -> controller.register(new RegisterRequest()))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Email đã được sử dụng");
    }
}
