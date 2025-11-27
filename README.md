# Projet DevSecOps : Application Node.js Sécurisée

![Security Pipeline](https://github.com/Zarrix75/devsecops/actions/workflows/security.yml/badge.svg)

Ce projet démontre la mise en place d'un pipeline **CI/CD sécurisé** (DevSecOps) avec GitHub Actions. L'objectif était de partir d'une application volontairement vulnérable et de la sécuriser entièrement.

## Fonctionnalités du Pipeline

À chaque `git push`, le pipeline exécute les vérifications suivantes :

| Outil | Type | Rôle |
|-------|------|------|
| **Semgrep** | SAST | Analyse le code pour trouver des failles (XSS, Injection, etc.) |
| **Gitleaks** | Secrets | Vérifie qu'aucun mot de passe n'est caché dans l'historique |
| **Trivy** | Container | Scanne l'image Docker pour trouver des CVE (vulnérabilités système) |
| **NPM Audit** | SCA | Vérifie les failles dans les dépendances (`package.json`) |

## Corrections Appliquées

L'application a été sécurisée via les mesures suivantes :
- [x] **Code :** Suppression des secrets en dur (utilisation de `process.env`).
- [x] **Docker :** Passage à une image `alpine` (plus légère) et utilisateur non-root.
- [x] **Dépendances :** Mise à jour des paquets et ajout de `helmet` pour la sécurité HTTP.
- [x] **GitHub Secrets :** Stockage sécurisé des variables d'environnement.

## Comment lancer le projet

**Prérequis :** Docker installé.

1. **Construire l'image :**
   ```bash
   docker build -t secure-app .