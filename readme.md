
# Aplicação em NodeJs com Clean Architecture

## Tecnologias e Informações
- NodeJS
- TypeScript
- Prisma/TypeORM
- Módulo Http do NodeJs para criar o server. Não foi utilizado frameworks
- Jest
- S.O.L.I.D

## Instalação e execução
```
$ sh start.sh 

ou com 

$ docker-compose up --build

se estiver usando Prisma deve rodar as migrations.
$ yarn migrate

se estiver usando o TypeORM deixe o synchronize como true em data-source.ts para criar as tabelas pois nao fiz as migrations.

Ajustar .env conforme necessário, o env.example está pronto para usar com docker

```