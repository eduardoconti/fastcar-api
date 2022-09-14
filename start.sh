#!/bin/bash

#################################################################
# Script de automação de projeto
# Requisitos: docker, docker-compose
#
# Autor: Jeyson Luiz Romualdo
# Data: 09/08/2022
# Descrição: Script de inicialização de projeto docker
#
# uso: bash start.sh   ou sh start.sh
#
#################################################################


echo '  ____    _     ________ _   _ _        _    ____
 / ___|  / \   |__  /_ _| \ | | |      / \  | __ )
| |  _  / _ \    / / | ||  \| | |     / _ \ |  _ \
| |_| |/ ___ \  / /_ | || |\  | |___ / ___ \| |_) |
 \____/_/   \_\/____|___|_| \_|_____/_/   \_\____/'
echo ''
echo ''

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
