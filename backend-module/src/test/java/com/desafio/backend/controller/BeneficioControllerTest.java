// package com.example.backend.controller;

// import com.example.backend.service.BeneficioService;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;

// import java.math.BigDecimal;

// import static org.mockito.Mockito.doNothing;
// import static org.mockito.Mockito.doThrow;
// import static org.mockito.ArgumentMatchers.anyLong;

// import static org.mockito.ArgumentMatchers.any;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// @WebMvcTest(BeneficioController.class)
// public class BeneficioControllerTest {

//     @Autowired
//     private MockMvc mvc;

//     @MockBean
//     private BeneficioService beneficioService;

//     @Test
//     void transfer_returnsOkAndMessage_whenServiceSucceeds() throws Exception {
//         doNothing().when(beneficioService).transfer(1L, 2L, BigDecimal.valueOf(5));

//         mvc.perform(post("/api/v1/beneficios/transfer")
//                 .param("fromId", "1")
//                 .param("toId", "2")
//                 .param("amount", "5")
//                 .contentType(MediaType.APPLICATION_FORM_URLENCODED))
//             .andExpect(status().isOk())
//             .andExpect(content().string("Transferência realizada"));
//     }

//     @Test
//     void transfer_returnsServerError_whenServiceThrows() throws Exception {
//         doThrow(new IllegalStateException("Saldo insuficiente"))
//             .when(beneficioService).transfer(anyLong(), anyLong(), any());

//         mvc.perform(post("/api/v1/beneficios/transfer")
//                 .param("fromId", "1")
//                 .param("toId", "2")
//                 .param("amount", "1")
//                 .contentType(MediaType.APPLICATION_FORM_URLENCODED))
//             .andExpect(status().is5xxServerError());
//     }
// }