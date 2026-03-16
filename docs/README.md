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
- `db`

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
- **OpenAPI / Swagger** disponível no backend

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

## Backend

- mvn clean install
- Executar o módulo backend-module
