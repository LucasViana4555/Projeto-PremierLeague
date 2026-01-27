⚽ Premier League Estatísticas - Projeto FullStack

Este projeto é um ecossistema completo para gerenciamento e análise de estatísticas de jogadores da Premier League. Ele permite o controle total de um elenco (CRUD), monitorando métricas reais de desempenho.

🚀 Tecnologias e Arquitetura

O sistema foi construído utilizando práticas modernas de desenvolvimento voltadas para escalabilidade e manutenção:

Backend (Java & Spring Boot)

Arquitetura por Funcionalidade: Organização de pacotes focada no domínio (jogador), facilitando a modularização.

Spring Data JPA: Abstração da camada de dados para comunicação com o PostgreSQL.

REST API: Endpoints estruturados para operações de CRUD e filtragem dinâmica.

Frontend (React)

Interface Dinâmica: Construída com estados reativos e hooks para uma experiência de usuário fluida.

Consumo de API: Integração com o backend via Axios para sincronização de dados em tempo real.

Mapeamento de Dados: Tradução automática de siglas técnicas e exibição de bandeiras nacionais dinâmicas.

Banco de Dados (PostgreSQL)

Persistência Relacional: Armazenamento robusto e permanente das métricas dos atletas.

🛠️ Funcionalidades Principais

Gestão de Estatísticas Avançadas: Cadastro e edição de métricas como Gols Esperados (xG), Assistências Esperadas (xAG), minutos jogados e cartões.

Filtros Acumulativos: Busca inteligente por Nome, Time, Posição e Nacionalidade.

Tradução de UX: Interface totalmente adaptada com termos esportivos em português (ex: GK -> GOL, FW -> ATA).

🏁 Como Executar o Projeto

1. Banco de Dados
Certifique-se de ter o PostgreSQL instalado.

Crie um banco de dados chamado prem_estatisticas.

Execute o script localizado em /sql/backup_premier.sql para popular as tabelas e dados iniciais.

2. Backend
Navegue até a pasta /spring.

Configure suas credenciais no application.properties ou via variáveis de ambiente.

Execute: ./mvnw spring-boot:run.

3. Frontend
Navegue até a pasta /react.

Crie um arquivo .env com a URL da API: REACT_APP_API_URL=http://localhost:8080/api/v1/jogadores.

Execute: npm install e npm start.

Desenvolvido por Lucas Viana da Silva
