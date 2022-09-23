#!/bin/bash

#################################################################
# Script de automação de projeto
# Requisitos: docker, docker-compose
#
# uso: bash start.sh   ou sh start.sh
#
#################################################################

yarn

docker-compose up -d --build
echo '  -- fastcar-api está rodando  -- '
echo ''

docker exec -it fastcar-api chown -R node:node /usr/src/app
echo '  -- permissões dadas --  '
echo ''

docker exec -it fastcar-api yarn

docker exec -it fastcar-api yarn migrate
echo '  -- migrate concluido  --  '

docker restart fastcar-api
echo '  -- fastcar-api reiniciado  --  '
echo ''
