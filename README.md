# Tower of heroes 🦸‍♂️

Une application Angular permettant de gérer une liste de héros et d'armes avec des fonctionnalités de filtre, tri, édition, et suppression.

---

## 📋 Table des matières

- [Introduction](#introduction)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Contribuer](#contribuer)
- [Licence](#licence)

---

## 🌟 Introduction

L'application **Tower of heroes** est conçue pour gérer facilement des listes de héros et d'armes. Cette application utilise Angular pour l'interface utilisateur et un service centralisé pour gérer les données des héros.

Une vidéo de présentation est disponible associer à ce projet.

---

## ✨ Fonctionnalités

- **Liste des héros** : Affiche une table avec les caractéristiques des héros.
- **Filtres et Tri** : 
  - Filtrer les héros par nom.
  - Trier par différentes colonnes (ex. : Attaque, Défense).
- **Édition et Suppression** : Modifier ou supprimer un héros.
- **Détails** : Voir les détails d'un héros spécifique.
- **Réinitialisation** : Réinitialiser les filtres et afficher la liste complète des héros.

Ces fonctionnalités sont aussi disponibles pour les armes.

- **Associer une arme à un héro :** Il est possible d'associer une arme à un héro afin de lui conférer des bonus !

- **Gestion des données avec Firebase** : Le projet est relié à une application web Firebase.


---

## 🛠️ Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés :

- [Node.js](https://nodejs.org/) (v16 ou plus recommandé)
- [Angular CLI](https://angular.io/cli) (v18)
- [npm](https://www.npmjs.com/)

---

## ⚙️ Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/LucasPerbet/perbetlu-toh
   ```

2. Accédez au répertoire du projet :
   ```bash
   cd perbetlu-toh
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

4. Lancez l'application en mode développement :
   ```bash
   ng serve
   ```

5. Ouvrez votre navigateur à l'adresse suivante :
   ```
   http://localhost:4200
   ```

---

## 🚀 Usage

### Commandes principales

- **Lancer le serveur local** :
  ```bash
  ng serve
  ```

- **Générer un build de production** :
  ```bash
  ng build
  ```

---

## 🏗️ Architecture

L'application suit l'architecture standard d'Angular avec les principes suivants :

- **Composants** : Pour la vue et les interactions utilisateur (ex. : `HeroesComponent`).
- **Services** : Gestion des données et communication avec une API ou une source locale (`HeroService`).
- **Modules** : Organisation modulaire pour charger uniquement les ressources nécessaires.
- **Observables** : Gestion des données asynchrones avec RxJS.

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Suivez les étapes ci-dessous pour contribuer :

1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b ma-nouvelle-fonctionnalite
   ```
3. Commitez vos modifications :
   ```bash
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```
4. Poussez vers votre branche :
   ```bash
   git push origin ma-nouvelle-fonctionnalite
   ```
5. Ouvrez une Pull Request sur le dépôt principal.

---

## 📜 Licence

Ce projet est sous licence **MIT**. Consultez le fichier [LICENSE](./LICENSE) pour plus de détails.

---

## 📞 Support

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue ou à me contacter à [lucas.perbet@etu.univ-grenoble-alpes.fr](mailto:lucas.perbet@etu.univ-grenoble-alpes.fr).

---

🎉 Merci d'utiliser **Tower of heroes** et bonne gestion de vos héros !