# 🌱 Jardim Alerta

**Jardim Alerta** é um aplicativo que ajuda os usuários a lembrarem de regar suas plantas, permitindo o agendamento de notificações em dias e horários específicos. Este projeto é uma reinterpretação do meu primeiro aplicativo, agora utilizando uma arquitetura mais robusta e tecnologias modernas.

## ✨ Funcionalidades

- Selecionar uma planta já cadastrada.
- Agendar notificações para lembrar de regar a planta.
- Escolher os dias da semana e o horário para cada notificação.

## 🧱 Tecnologias e Arquitetura

- **Clean Architecture** — Separação clara entre camadas de domínio, dados, apresentação e infraestrutura.
- **TypeORM** — ORM utilizado para persistência local de dados.

## 🚀 Como executar o projeto

```bash
# Clone o repositório
git clone https://github.com/brunoaiolfi/Jardim-Alerta.git

# Acesse a pasta do projeto
cd jardim-alerta

# Instale as dependências
npm install

# Execute o projeto
npm start
````

## 📁 Estrutura do Projeto

```
src/
├── domain/ # Models (entidades e estruturas de dados)
├── applications/ # Casos de uso, organizados por contexto seguindo o CCP
├── infra/
│ ├── database/ # Configuração e entidades do TypeORM
│ ├── implementations/ # Implementações dos repositórios e serviços
│ ├── ui/ # Componentes visuais e telas
│ └── assets/ # Imagens, fontes, ícones etc.
```

## 📌 Sobre o projeto

Este projeto foi recriado como parte de um desafio pessoal para refatorar meu primeiro aplicativo. O objetivo foi aplicar os conceitos aprendidos ao longo do tempo, com foco em organização de código, arquitetura escalável e práticas modernas de desenvolvimento.