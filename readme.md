# Projet Devops

Ce projet est développé en TypeScript. Dans mon référentiel d'origine, le déploiement fonctionne parfaitement, mais je n'ai pas eu de chance avec celui-ci.

J'ai configuré l'automatisation du déploiement de mon image à chaque fois que mon référentiel reçoit un `git push` dans `.github/workflows/docker-build.yml`.

J'ai créé un fichier Docker pour construire une image : `/Projet-Devops/Dockerfile`. J'ai également configuré des pipelines dans GitHub Actions pour compiler et construire votre projet à partir de son code source.

Je n'ai pas encore implémenté les tests unitaires.

Je reçois parfaitement l'image sur Docker Hub, ce qui me permet ensuite de tirer (pull) l'image depuis Docker App. Le fichier de configuration pour GitHub Workflow se trouve dans `/Projet-Devops/.github/workflows/docker-build.yml`.

J'ai également mis en place `/Projet-Devops/deploy-script.sh` pour le déploiement continu, en interagissant avec `webhook-server.tsx`.

## Comment exécuter le projet

Pour exécuter le projet, assurez-vous d'avoir les dépendances nécessaires installées, puis suivez les étapes suivantes :

1. Clonez ce référentiel sur votre machine locale.

2. Assurez-vous que Docker est installé sur votre système.

3. Exécutez le script de déploiement en continu en utilisant la commande suivante :

   ```bash
   sh /Projet-Devops/deploy-script.sh Cela déclenchera le déploiement continu et mettra à jour votre conteneur avec la dernière image Docker.
    ```
   
