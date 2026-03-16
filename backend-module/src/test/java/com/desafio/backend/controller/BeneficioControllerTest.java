package com.desafio.backend.controller;

import com.desafio.backend.exception.BusinessException;
import com.desafio.backend.exception.CustomExceptionHandler;

import com.desafio.backend.service.BeneficioService;
import com.desafio.ejb.entity.Beneficio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class BeneficioControllerTest {

    private MockMvc mvc;
    private final ObjectMapper mapper = new ObjectMapper();

    @Mock
    private BeneficioService service;

    @BeforeEach
    void setup() {
        mvc = MockMvcBuilders
                .standaloneSetup(new BeneficioController(service))
                .setControllerAdvice(new CustomExceptionHandler())
                .build();
    }

    @Test
    void getBeneficios_returnsList() throws Exception {
        var b = Beneficio.builder().id(1L).nome("X").descricao("d").valor(BigDecimal.TEN).ativo(true).build();
        when(service.findAll()).thenReturn(List.of(b));

        mvc.perform(get("/api/v1/beneficios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].nome").value("X"));
    }

    @Test
    void update_notFound_returns404() throws Exception {
        when(service.findById(99L)).thenReturn(Optional.empty());

        var payload = mapper.writeValueAsString(
                new java.util.HashMap<String, Object>() {{
                    put("nome", "Novo");
                    put("descricao", "d");
                    put("valor", 10);
                    put("ativo", true);
                }}
        );

        mvc.perform(put("/api/v1/beneficios/99")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
    }

    @Test
    void addBeneficio_returnsOk() throws Exception {
        var request = new java.util.HashMap<String, Object>() {{
            put("nome", "Novo");
            put("descricao", "d");
            put("valor", 10);
            put("ativo", true);
        }};
        var saved = Beneficio.builder().id(5L).nome("Novo").descricao("d").valor(BigDecimal.TEN).ativo(true).build();
        when(service.save(any())).thenReturn(saved);

        mvc.perform(post("/api/v1/beneficios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(5))
                .andExpect(jsonPath("$.nome").value("Novo"));
    }

    @Test
    void deleteBeneficio_returnsNoContent() throws Exception {
        mvc.perform(delete("/api/v1/beneficios/7"))
                .andExpect(status().isNoContent());
        verify(service).deleteById(7L);
    }

    @Test
    void transfer_missingParam_returnsBadRequest() throws Exception {
        mvc.perform(post("/api/v1/beneficios/transfer"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));
    }

    @Test
    void transfer_businessError_returns422() throws Exception {
        doThrow(new BusinessException("Saldo insuficiente"))
                .when(service).transfer(1L, 2L, BigDecimal.valueOf(5));

        mvc.perform(post("/api/v1/beneficios/transfer")
                .param("fromId", "1")
                .param("toId", "2")
                .param("amount", "5"))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.status").value(422))
                .andExpect(jsonPath("$.message").value("Saldo insuficiente"));
    }
}