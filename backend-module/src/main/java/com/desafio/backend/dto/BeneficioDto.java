package com.desafio.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record BeneficioDto(
        Long id,
        @NotBlank(message = "Nome é obrigatório") String nome,
        @NotBlank(message = "Descrição é obrigatória") String descricao,
        @NotNull(message = "Valor é obrigatório") @DecimalMin(value = "0.01", message = "Valor deve ser maior que 0")
        BigDecimal valor,
        Boolean ativo
) {}