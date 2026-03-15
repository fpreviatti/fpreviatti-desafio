package com.desafio.backend.dto;

import java.math.BigDecimal;

public record BeneficioDto(
        Long id,
        String nome,
        String descricao,
        BigDecimal valor,
        Boolean ativo
) {}