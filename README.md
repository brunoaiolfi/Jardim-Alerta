# 🌱 Jardim Alerta

**Jardim Alerta** é um aplicativo que ajuda os usuários a lembrarem de regar suas plantas, permitindo o agendamento de notificações em dias e horários específicos. Este projeto é uma reinterpretação do meu primeiro aplicativo, agora utilizando uma arquitetura mais robusta e tecnologias modernas.

## ✨ Funcionalidades

- Cadastrar uma planta.
- Agendar notificações para lembrar de regar a planta.
- Escolher os dias da semana e o horário para cada notificação.

## 🏗️ Arquitetura

O projeto segue o padrão **Clean Architecture**, promovendo uma separação clara de responsabilidades e facilitando a manutenção e escalabilidade do código. As principais camadas são:

- **Domain**: Modelos de negócio e regras de domínio (entidades, use cases, validações).
- **Application**: Orquestração de casos de uso, lógica de aplicação e coordenação entre domínio e infraestrutura.
- **Infra**: Implementações concretas de repositórios, serviços, banco de dados, integrações externas, etc.
- **UI**: Componentes visuais, telas, hooks, rotas e temas.

## 📁 Organização das Pastas

```
src/
├── application/           # Orquestração da infra e domain
├── common/                # DTOs, enums e utilitários compartilhados
├── domain/                # Modelos e use cases do domínio
├── infra/                 # Implementações técnicas
│   ├── database/          # Entidades, repositórios e migrações do banco
│   ├── implementations/   # Serviços concretos (notificações, storage, etc)
├── ui/                    # Interface do usuário
│   ├── assets/            # Imagens e recursos visuais
│   ├── components/        # Componentes reutilizáveis
│   ├── contexts/          # Contextos React
│   ├── hooks/             # Hooks customizados (queries, mutations)
│   ├── routes/            # Rotas públicas e privadas
│   ├── themes/            # Temas de UI
│   └── views/             # Telas (públicas e privadas)
```

## ⚙️ Configuração de Ambiente (.env)

O projeto utiliza variáveis de ambiente para armazenar informações sensíveis e configurações específicas de cada ambiente (ex: chaves de API, endpoints, etc).

- Crie um arquivo `.env` na raiz do projeto.
- O arquivo `.env` está listado no `.gitignore` e **não deve ser versionado**.
- Exemplo de conteúdo:

```
CLIENT_ID_FIREBASE=xxxxx
```

## 🔥 Configuração do Firebase (google-services.json)

Para que funcionalidades como notificações push e autenticação funcionem corretamente, é necessário configurar o Firebase:

### Android
1. No [console do Firebase](https://console.firebase.google.com/), crie um projeto e registre o app Android.
2. Baixe o arquivo `google-services.json`.
3. Coloque o arquivo em `android/app/google-services.json`.
4. O arquivo está listado no `.gitignore` e **não deve ser versionado**.

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
```

## 📌 Sobre o projeto

Este projeto foi recriado como parte de um desafio pessoal para refatorar meu primeiro aplicativo. O objetivo foi aplicar os conceitos aprendidos ao longo do tempo, com foco em organização de código, arquitetura escalável e práticas modernas de desenvolvimento.
