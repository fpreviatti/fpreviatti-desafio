package com.example.backend.controller;

import com.example.ejb.service.BeneficioEjbService;
import jakarta.ejb.EJB;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/beneficios")
public class BeneficioController {

    @EJB
    private BeneficioEjbService beneficioService;

    @PostMapping("/transfer")
    public String transfer() {

        beneficioService.transfer(
                1L,
                2L,
                new BigDecimal("100")
        );

        return "Transferência realizada";
    }
}