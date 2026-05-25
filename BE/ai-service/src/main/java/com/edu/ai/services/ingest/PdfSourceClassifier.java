package com.edu.ai.services.ingest;

import java.nio.file.Path;

public final class PdfSourceClassifier {

    public enum PdfType { BOOK, EXAM_QUESTION, SKIP }

    private PdfSourceClassifier() {}

    /**
     * Classifies a PDF by filename.
     * Answer files are detected first because some answer filenames also contain
     * exam keywords (e.g. "2014S_FE_AM_Ans.pdf").
     */
    public static PdfType classify(String filename) {
        String lower = filename.toLowerCase();

        if (lower.contains("answer") || lower.contains("_ans.") || lower.endsWith("_ans.pdf")) {
            return PdfType.SKIP;
        }
        if (lower.contains("book") || lower.contains("contents") || lower.contains("preparation")) {
            return PdfType.BOOK;
        }
        if (lower.contains("question")) {
            return PdfType.EXAM_QUESTION;
        }
        return PdfType.SKIP;
    }

    /** Filename without .pdf extension — used as source_id in DB. */
    public static String sourceId(String filename) {
        return filename.replaceAll("(?i)\\.pdf$", "");
    }

    /**
     * Exam code from parent folder name, e.g. "2019A_FE" from
     * .../2019A_FE/2019A_FE/2019A_FE_AM_Question.pdf
     */
    public static String examCode(Path pdfPath) {
        Path parent = pdfPath.getParent();
        return parent != null ? parent.getFileName().toString() : "unknown";
    }
}
