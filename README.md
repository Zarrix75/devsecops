# Projet DevSecOps : Application Node.js Sécurisée

![DevSecOps Pipeline](https://github.com/Zarrix75/devsecops/actions/workflows/security.yml/badge.svg)

Ce dépôt contient une application Node.js sécurisée, réalisée dans le cadre d'un TD de Cybersécurité. L'objectif était de partir d'une application vulnérable et de mettre en place un pipeline **CI/CD DevSecOps** pour détecter et corriger les failles automatiquement.

## Le Pipeline de Sécurité (GitHub Actions)

À chaque mise à jour du code (`git push`), les outils suivants analysent le projet :

| Catégorie | Outil | Ce qu'il vérifie |
|-----------|-------|------------------|
| **SAST** | **Semgrep** | Analyse le code source pour trouver des failles (XSS, Injections, mauvaises pratiques). |
| **SCA** | **NPM Audit** | Vérifie si les bibliothèques importées (`package.json`) contiennent des CVE connues. |
| **Secrets** | **Gitleaks** | Scanne l'historique Git pour s'assurer qu'aucun mot de passe ou clé API n'a été publié. |
| **Container** | **Trivy** | Scanne l'image Docker finale pour détecter les vulnérabilités du système d'exploitation. |

##  Corrections Appliquées

L'application a été "durcie" (Hardening) grâce aux mesures suivantes :

1.  **Gestion des Secrets :**
    * Suppression des clés API (Stripe, SendGrid) et mots de passe hardcodés.
    * Utilisation de variables d'environnement (`process.env`) via le module `dotenv`.
    * Configuration des vrais secrets dans **GitHub Repository Secrets**.

2.  **Sécurisation du Conteneur Docker :**
    * Migration vers une image de base légère et sûre : `node:18-alpine`.
    * Exécution de l'application avec un utilisateur non-root (`nodejs`) pour limiter les privilèges.

3.  **Qualité du Code :**
    * Validation stricte des entrées utilisateurs.
    * Suppression des routes de débogage exposant des informations sensibles.

## Installation et Test en Local

Si vous souhaitez tester l'application sur votre machine :

### 1. Cloner le projet
```bash
git clone [https://github.com/Zarrix75/devsecops.git](https://github.com/Zarrix75/devsecops.git)
cd devsecops
```

## Configurer les variables

## Créez un fichier .env à la racine :

Extrait de code

JWT_SECRET=super-secret-local-key
ADMIN_USER=admin
ADMIN_PASS=admin

## 3. Lancer avec Docker

Bash

docker build -t secure-app .
docker run -p 3000:3000 --env-file .env secure-app
Projet réalisé par Zarrix75.






