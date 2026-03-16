package com.desafio.backend.exception;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class CustomExceptionHandlerTest {

    private MockMvc mvc;

    @BeforeEach
    void setup() {
        mvc = MockMvcBuilders
                .standaloneSetup(new TestController())
                .setControllerAdvice(new CustomExceptionHandler())
                .build();
    }

    @Test
    void returns404ForResourceNotFound() throws Exception {
        mvc.perform(get("/test/notfound"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("não existe"));
    }

    @Test
    void returns422ForBusinessException() throws Exception {
        mvc.perform(get("/test/business"))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.status").value(422))
                .andExpect(jsonPath("$.message").value("saldo insuficiente"));
    }

    @Test
    void returns400ForMissingParam() throws Exception {
        mvc.perform(get("/test/missing"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("Parâmetro obrigatório ausente")));
    }

    @Test
    void returns400WithValidationErrors() throws Exception {
        mvc.perform(post("/test/validate")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.errors.valor").exists());
    }

    @RestController
    static class TestController {
        @GetMapping("/test/notfound")
        public void notFound() {
            throw new ResourceNotFoundException("não existe");
        }

        @GetMapping("/test/business")
        public void business() {
            throw new BusinessException("saldo insuficiente");
        }

        @GetMapping("/test/missing")
        public void missing(@RequestParam String p) {
        }

        @PostMapping("/test/validate")
        public void validate(@RequestBody @jakarta.validation.Valid TestDto dto) {
        }
    }

    public record TestDto(@jakarta.validation.constraints.NotNull(message = "valor é obrigatório") BigDecimal valor) {}
}