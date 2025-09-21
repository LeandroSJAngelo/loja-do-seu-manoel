# Clonar repositório
git clone git@github.com:LeandroSJAngelo/loja-do-seu-manoel.git
cd nest-packaging

# Instalar dependências
npm ci

# Rodar em dev
npm run start:dev

# Rodar testes
npm run test

# Rodar com Docker
docker build -t nest-packaging .
docker run -p 3000:3000 nest-packaging

Swagger: http://localhost:3000/api

Usar token no header: x-api-key: <token>

# 📦 Loja do Seu Manoel - API de Empacotamento

## 🏗 Arquitetura

O projeto segue o padrão de **Clean Architecture** dividido em camadas:

* **Entities (Domain):** regras de negócio (Produtos, Caixas).
* **Use Cases (Application):** lógica de empacotamento.
* **Controllers (Interface):** endpoints REST.
* **Infrastructure:** API Key Authentication, integração com Swagger, etc.

---

## 🔑 Segurança

A API utiliza **API Key Authentication** para autenticação.

* Cada requisição deve incluir o header `x-api-key` com a chave válida.

* Exemplo:

  ```
  x-api-key: SUA_CHAVE_SECRETA
  ```

* Sem a chave correta, o acesso é negado.

---


## 📖 Swagger

A documentação interativa está disponível em:

```
http://localhost:3000/api-doc
```

---

## 🚀 Como rodar o projeto

### 1. Rodando localmente (Node.js)

1. Clone o repositório:

   ```bash
   git clone git@github.com:LeandroSJAngelo/loja-do-seu-manoel.git
   cd nest-packaging
   ```
2. Instale as dependências:

   ```bash
   npm ci
   ```
3. Rode em ambiente de desenvolvimento:

   ```bash
   npm run start:dev
   ```
4. Acesse:

   * API: `http://localhost:3000`
   * Swagger: `http://localhost:3000/api-doc`

---

### 2. Rodando com Docker

1. Build da imagem:

   ```bash
   docker build -t nest-packaging .
   ```
2. Executar container:

   ```bash
   docker run -p 3000:3000 nest-packaging
   ```
3. Ou usando **docker-compose**:

   ```bash
   docker-compose up --build
   ```

---

## 🧪 Testes

O projeto inclui testes unitários com Jest.

Rodar testes:

```bash
npm run test
```

---

## 📦 Exemplo de uso da API

### Requisição

`POST /pedido/empacotar`
Header:

```
x-api-key: SUA_CHAVE_SECRETA
```

Body:

```json
{
  "orders": [
    {
      "order_id": "1",
      "products": [
        { "product_id": "PS5", "height": 40, "width": 10, "depth": 25 },
        { "product_id": "Vol", "height": 10, "width": 10, "depth": 10 }
      ]
    }
  ]
}
```

### Resposta

```json
{
  "results": [
    {
      "order_id": "1",
      "boxes": [
        {
          "box_type": "Caixa 1",
          "box_dimensions": { "height": 30, "width": 40, "depth": 80 },
          "products": ["PS5","Vol"]
        }
      ]
    }
  ]
}
```

---

## ⚠️ Limitações conhecidas

* O empacotamento é feito via **heurística greedy** baseada em volume e dimensões.
* Pode não encontrar os valores ideais em cenários muito complexos (problema clássico NP-hard de bin packing 3D).

---

## 📌 Futuras melhorias

* Persistência em banco (Postgres ou MongoDB).
* Algoritmos de empacotamento mais avançados (guillotine, skyline).
* Suporte a regras extras (fragilidade, peso, ordem de empacotamento).

---
