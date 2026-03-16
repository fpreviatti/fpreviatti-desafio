package com.desafio.backend.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import com.desafio.backend.dto.BeneficioDto;
import com.desafio.backend.exception.BusinessException;
import com.desafio.backend.exception.CustomException;
import com.desafio.backend.exception.InvalidRequestException;
import com.desafio.backend.exception.ResourceNotFoundException;
import com.desafio.backend.repository.BeneficioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.desafio.ejb.entity.Beneficio;
import com.desafio.ejb.service.BeneficioEjbService;

@Service
public class BeneficioService {

    private final BeneficioRepository repository;
    private final BeneficioEjbService ejbService;

    public BeneficioService(BeneficioRepository repository, BeneficioEjbService ejbService) {
        this.repository = repository;
        this.ejbService = ejbService;
    }

    public List<Beneficio> findAll() {
        return repository.findAll();
    }

    public Optional<Beneficio> findById(Long id) {
        return repository.findById(id);
    }

    public Beneficio save(Beneficio b) {
        return repository.save(b);
    }

    public Beneficio update(Long id, BeneficioDto dto) {
        Beneficio existente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Benefício não encontrado"));
        existente.setNome(dto.nome());
        existente.setDescricao(dto.descricao());
        existente.setValor(dto.valor());
        return repository.save(existente);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void transfer(Long fromId, Long toId, BigDecimal amount) {
        try {
            ejbService.transfer(fromId, toId, amount);
            repository.flush();
        } catch (IllegalArgumentException e) {
            throw new InvalidRequestException(e.getMessage());
        } catch (IllegalStateException e) {
            throw new BusinessException(e.getMessage());
        } catch (Exception e) {
            throw new CustomException(e.getMessage(), 500);
        }
    }
}