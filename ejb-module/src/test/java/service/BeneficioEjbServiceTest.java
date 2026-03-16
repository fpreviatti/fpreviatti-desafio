package service;

import com.desafio.ejb.entity.Beneficio;
import com.desafio.ejb.service.BeneficioEjbService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.LockModeType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BeneficioEjbServiceTest {

    private BeneficioEjbService service;

    @Mock
    private EntityManager em;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        service = new BeneficioEjbService();

        java.lang.reflect.Field f;
        try {
            f = BeneficioEjbService.class.getDeclaredField("em");
            f.setAccessible(true);
            f.set(service, em);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void transfer_success_updatesValues() {
        var from = new Beneficio(); from.setId(1L); from.setValor(BigDecimal.valueOf(10));
        var to   = new Beneficio(); to.setId(2L); to.setValor(BigDecimal.valueOf(2));
        when(em.find(Beneficio.class, 1L, LockModeType.PESSIMISTIC_WRITE)).thenReturn(from);
        when(em.find(Beneficio.class, 2L, LockModeType.PESSIMISTIC_WRITE)).thenReturn(to);

        service.transfer(1L, 2L, BigDecimal.valueOf(3));

        assertEquals(BigDecimal.valueOf(7), from.getValor());
        assertEquals(BigDecimal.valueOf(5), to.getValor());
    }

    @Test
    void transfer_invalidAmount_throws() {
        assertThrows(IllegalArgumentException.class, () -> service.transfer(1L, 2L, BigDecimal.ZERO));
    }

    @Test
    void transfer_insufficientBalance_throws() {
        var from = new Beneficio(); from.setId(1L); from.setValor(BigDecimal.valueOf(1));
        var to   = new Beneficio(); to.setId(2L); to.setValor(BigDecimal.ZERO);
        when(em.find(Beneficio.class, 1L, LockModeType.PESSIMISTIC_WRITE)).thenReturn(from);
        when(em.find(Beneficio.class, 2L, LockModeType.PESSIMISTIC_WRITE)).thenReturn(to);

        assertThrows(IllegalStateException.class, () -> service.transfer(1L, 2L, BigDecimal.valueOf(5)));
    }
}