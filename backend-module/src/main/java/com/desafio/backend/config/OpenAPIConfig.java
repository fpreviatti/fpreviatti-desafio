package com.desafio.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Primary;

@Configuration
public class OpenAPIConfig {

    @Primary
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(new Info()
                        .title("API de Gestão de Benefícios")
                        .version("1.0")
                        .description("API para gerenciamento de benefícios")
                        .contact(new Contact()
                                .name("Fábio Previatti")
                                .email("fpreviatti@hotmail.com"))
                        .license(new License()
                                .name("Apache 2.0")));
    }
}