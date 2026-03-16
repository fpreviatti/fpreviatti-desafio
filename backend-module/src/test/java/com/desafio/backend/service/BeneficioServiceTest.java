package com.desafio.backend.service;

import com.desafio.backend.repository.BeneficioRepository;
import com.desafio.ejb.entity.Beneficio;
import com.desafio.ejb.service.BeneficioEjbService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BeneficioServiceTest {

    @Mock
    private BeneficioRepository repository;

    @Mock
    private BeneficioEjbService ejbService;

    @InjectMocks
    private BeneficioService service;

    @Test
    void findAll_returnsRepositoryData() {
        var b = Beneficio.builder().id(1L).nome("X").valor(BigDecimal.TEN).ativo(true).build();
        when(repository.findAll()).thenReturn(List.of(b));
        var res = service.findAll();
        assertEquals(1, res.size());
        assertSame(b, res.get(0));
    }

    @Test
    void findById_returnsOptional() {
        var b = Beneficio.builder().id(3L).nome("Z").valor(BigDecimal.ZERO).ativo(false).build();
        when(repository.findById(3L)).thenReturn(Optional.of(b));
        var res = service.findById(3L);
        assertTrue(res.isPresent());
        assertEquals(3L, res.get().getId());
    }

    @Test
    void save_delegatesToRepository() {
        var b = Beneficio.builder().id(4L).nome("Save").valor(BigDecimal.ONE).ativo(true).build();
        when(repository.save(b)).thenReturn(b);
        var saved = service.save(b);
        assertSame(b, saved);
        verify(repository).save(b);
    }

    @Test
    void deleteById_delegatesToRepository() {
        service.deleteById(5L);
        verify(repository).deleteById(5L);
    }

    @Test
    void transfer_callsEjbAndFlush() {
        doNothing().when(ejbService).transfer(1L, 2L, BigDecimal.valueOf(5));
        service.transfer(1L, 2L, BigDecimal.valueOf(5));
        verify(ejbService).transfer(1L, 2L, BigDecimal.valueOf(5));
        verify(repository).flush();
    }

    @Test
    void transfer_propagatesException_andDoesNotFlush() {
        doThrow(new IllegalStateException("Saldo insuficiente"))
            .when(ejbService).transfer(anyLong(), anyLong(), any());
        assertThrows(IllegalStateException.class, () -> service.transfer(1L, 2L, BigDecimal.ONE));
        verify(repository, never()).flush();
    }
}