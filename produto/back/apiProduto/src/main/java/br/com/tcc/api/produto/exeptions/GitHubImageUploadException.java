package br.com.tcc.api.produto.exeptions;

public class GitHubImageUploadException extends RuntimeException {
    public GitHubImageUploadException(String message) {
        super(message);
    }

    public GitHubImageUploadException(String message, Throwable cause) {
        super(message, cause);
    }
}
