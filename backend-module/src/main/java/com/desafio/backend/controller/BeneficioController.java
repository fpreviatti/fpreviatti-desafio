package com.desafio.backend.controller;

import com.desafio.backend.dto.BeneficioDto;
import com.desafio.backend.service.BeneficioService;

import com.desafio.ejb.entity.Beneficio;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Realizar transferencia")
    public ResponseEntity<String> transfer(
            @RequestParam Long fromId,
            @RequestParam Long toId,
            @RequestParam BigDecimal amount) {
        beneficioService.transfer(fromId, toId, amount);
        return ResponseEntity.ok("Transferência realizada");
    }

    @GetMapping
    @Operation(summary = "Retornar benefícios cadastrados")
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

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar benefício existente")
    public ResponseEntity<BeneficioDto> updateBeneficio(
            @PathVariable Long id,
            @RequestBody BeneficioDto beneficioDto) {

        Beneficio existente = beneficioService.findById(id)
                .orElseThrow(() -> new RuntimeException("Benefício não encontrado"));

        existente.setNome(beneficioDto.nome());
        existente.setDescricao(beneficioDto.descricao());
        existente.setValor(beneficioDto.valor());

        Beneficio atualizado = beneficioService.save(existente);

        return ResponseEntity.ok(new BeneficioDto(
                atualizado.getId(),
                atualizado.getNome(),
                atualizado.getDescricao(),
                atualizado.getValor(),
                atualizado.getAtivo()
        ));
    }

    @PostMapping
    @Operation(summary = "Adicionar benefício ou atualizar se id for fornecido")
    public ResponseEntity<BeneficioDto> addBeneficio(@RequestBody BeneficioDto beneficioDto) {
        System.out.println(beneficioDto.id());

        if(beneficioDto.id()!=null){
            return this.updateBeneficio(beneficioDto.id(), beneficioDto);
        }

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
    @Operation(summary = "Remover benefício por id")
    public ResponseEntity<Void> deleteBeneficio(@PathVariable Long id) {
        beneficioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}