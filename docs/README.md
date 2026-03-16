# Desafio Fullstack

## 📌 Resumo
Projeto de desafio **fullstack** com backend **Spring Boot**, **EJB** para regras transacionais e frontend **Angular moderno (standalone components)**.  

Implementa:
- CRUD de benefícios
- Transferência de valores entre benefícios
- Validações e testes automatizados

---

# 📦 Módulos

- `ejb-module`
- `backend-module`
- `frontend`

---

# ⭐ Destaques

### Backend
- **Spring Boot**
- **Spring MVC**
- **Spring Data JPA**
- Endpoints **REST** para gerenciamento de benefícios

### EJB
- Lógica transacional de transferência
- Validação de saldo
- Controle de locking e rollback

### Frontend
- **Angular 19**
- Componentes **standalone**
- Testes com **Jest + jest-preset-angular**

### Testes
- **JUnit + Mockito** para backend
- **Jest + HttpClientTestingModule** para frontend

### Documentação
- **OpenAPI / Swagger** disponível no backend acessível via http://localhost:8080/swagger-ui/index.html#/

---

# ⚙️ Pré-requisitos

- **JDK:** 17 ou superior
- **Node.js / npm:** Node 18+ recomendado
- **Maven:** 3.8+
- **Postman** — collection disponível no módulo backend-module em resources

---

# 🚀 Como rodar (desenvolvimento)

### Banco de dados H2
- Acessivel via http://localhost:8080/h2-console

## Frontend

- cd frontend
- npm install
- npm start

Para acessar o sistema digitar a URL http://localhost:4200 no navegador

## Backend

- mvn clean install
- Executar o módulo backend-module

# 🧠 Decisões Técnicas

## Arquitetura

O projeto utiliza o padrão **Spring MVC** para organização das camadas da aplicação:

- **Controller** → exposição de endpoints REST
- **Service** → orquestração das regras de negócio
- **Repository** → acesso a dados com Spring Data JPA
- **EJB Module** → responsável por regras transacionais críticas

O módulo **EJB** é utilizado para centralizar regras de negócio que exigem **controle transacional robusto**, como a operação de transferência entre benefícios.

---

## Transações

A operação de **transferência de valores entre benefícios** é implementada no módulo **EJB**, garantindo:

- validação de saldo
- consistência de dados
- rollback automático em caso de erro
- controle de concorrência durante a operação

---

## Tratamento de erros

A aplicação utiliza **exceptions customizadas** e handlers para melhorar a clareza das regras de negócio e o retorno de erros da API.

Exemplos de Exception:

- `CustomException`
- `BusinessException`
- `InvalidRequestException`
- `ResourceNotFoundException`

Handler utilizado: CustomExceptionHandler

- `CustomExceptionHandler`


Isso garante:

- respostas HTTP padronizadas
- mensagens de erro claras
- desacoplamento entre controller e tratamento de exceções

---

## Testes

### Backend

O backend possui dois tipos de testes:

**Testes unitários**
- JUnit
- Mockito

**Testes de integração**
- Spring Boot Test
- MockMvc para simular requisições HTTP aos endpoints REST

Isso permite validar:

- comportamento dos serviços
- respostas dos controllers
- integração entre camadas

---

### Frontend

O frontend Angular utiliza:

- **Jest**
- **jest-preset-angular**
- **HttpClientTestingModule**

Os testes verificam:

- componentes
- pipes
- integração com serviços HTTP

---

## Angular moderno

O frontend foi implementado utilizando **Standalone Components**, recurso introduzido nas versões mais recentes do Angular.

Benefícios:

- redução de boilerplate
- eliminação de módulos desnecessários
- estrutura mais simples e moderna