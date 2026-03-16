package com.desafio.backend.exception;

public class InvalidRequestException extends CustomException {
    public InvalidRequestException(String message) {
        super(message, 400);
    }
}