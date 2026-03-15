package com.desafio.backend.controller;

import com.desafio.backend.dto.BeneficioDto;
import com.desafio.backend.service.BeneficioService;

import com.desafio.ejb.entity.Beneficio;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/beneficios")
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Beneficios", description = "Operações relacionadas a beneficios")
public class BeneficioController {

    private final BeneficioService beneficioService;

    public BeneficioController(BeneficioService beneficioService) {
        this.beneficioService = beneficioService;
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(
            @RequestParam Long fromId,
            @RequestParam Long toId,
            @RequestParam BigDecimal amount) {
        beneficioService.transfer(fromId, toId, amount);
        return ResponseEntity.ok("Transferência realizada");
    }

    @GetMapping
    public ResponseEntity<List<BeneficioDto>> getBeneficios() {
        List<BeneficioDto> beneficios = beneficioService.findAll()
                .stream()
                .map(b -> new BeneficioDto(
                        b.getId(),
                        b.getNome(),
                        b.getDescricao(),
                        b.getValor(),
                        b.getAtivo()
                ))
                .toList();

        return ResponseEntity.ok(beneficios);
    }

    @PostMapping
    public ResponseEntity<BeneficioDto> addBeneficio(@RequestBody BeneficioDto beneficioDto) {
        Beneficio beneficio = new Beneficio();
        beneficio.setNome(beneficioDto.nome());
        beneficio.setDescricao(beneficioDto.descricao());
        beneficio.setValor(beneficioDto.valor());
        beneficio.setAtivo(true);
        Beneficio salvo = beneficioService.save(beneficio);

        BeneficioDto response = new BeneficioDto(
                salvo.getId(),
                salvo.getNome(),
                salvo.getDescricao(),
                salvo.getValor(),
                salvo.getAtivo()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBeneficio(@PathVariable Long id) {
        beneficioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}