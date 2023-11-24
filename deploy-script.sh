#!/bin/bash

# Arrête le conteneur s'il est en cours d'exécution
docker stop projet-devops || true

# Supprime le conteneur s'il existe
docker rm projet-devops || true

# Lance un nouveau conteneur avec l'image la plus récente
docker run -d --name projet-devops -p 3000:3000 projet-devops
