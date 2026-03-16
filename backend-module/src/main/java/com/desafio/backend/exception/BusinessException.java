package com.desafio.backend.exception;

public class BusinessException extends CustomException {
    public BusinessException(String message) {
        super(message, 422);
    }
}