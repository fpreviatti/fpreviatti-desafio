package com.example.backend.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.repository.BeneficioRepository;
import com.example.ejb.entity.Beneficio;
import com.example.ejb.service.BeneficioEjbService;

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

    public List<Beneficio> findActive() {
        return repository.findByAtivoTrue();
    }

    public Optional<Beneficio> findById(Long id) {
        return repository.findById(id);
    }

    public Beneficio save(Beneficio b) {
        return repository.save(b);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void transfer(Long fromId, Long toId, BigDecimal amount) {
        ejbService.transfer(fromId, toId, amount);
        repository.flush();
    }
}