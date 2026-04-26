# 🐦 CloneX – Réseau social inspiré de Twitter/X

Bienvenue sur CloneX, un clone de Twitter/X développé en React, qui reproduit les principales fonctionnalités d'un réseau social moderne : authentification, fil d'actualité, abonnements, réponses aux tweets, et plus encore. Le projet a été pensé pour être pleinement responsive, du mobile au grand écran, avec une navigation adaptée à chaque format.

Réalisé dans le cadre du programme **Rocket Accelerator** de [Believemy](https://believemy.com), il s'agit du troisième projet capstone du cursus.

🔗 **Démo en ligne :** [https://clone-x-clairelise-devs-projects.vercel.app/feed)

## 🔍 Fonctionnalités principales

- ✅ Inscription, connexion et déconnexion via Firebase Authentication
- ✅ Création automatique d'un avatar unique à l'inscription (DiceBear)
- ✅ Suppression de compte sécurisée (réauthentification par mot de passe)
- ✅ Publication, affichage et suppression de tweets (limite 140 caractères)
- ✅ Réponses aux tweets via un composer dédié
- ✅ Système d'abonnements : suivre / ne plus suivre un utilisateur
- ✅ Modale d'abonnements pour consulter ses follows
- ✅ Suggestions d'utilisateurs à suivre, adaptées selon le format d'écran
- ✅ Page profil personnalisée pour chaque utilisateur
- ✅ Mode clair et mode sombre (deux thèmes personnalisés)
- ✅ Interface entièrement responsive (mobile, tablette, desktop)
- ✅ Navigation adaptative : sidebar latérale sur desktop, barre fixée en bas sur mobile
- ✅ Page d'erreur 404 dédiée + redirection automatique sur les profils inexistants
- ✅ Notifications utilisateur via React Toastify

## 🧱 Structure technique

### 🧠 Architecture du projet

Le projet suit une organisation par responsabilité, avec une séparation claire entre :

- **Pages** : composants principaux liés aux routes (`Home`, `Signup`, `Feed`, `Profile`, `Error`)
- **Layouts** : structures partagées entre plusieurs pages (`Main`, `ConnectedLayout`)
- **Components** : éléments d'interface réutilisables (`TweetCard`, `BottomNav`, `Sidebar`, etc.)
- **Hooks** : logique métier encapsulée et réutilisable (`useTweets`, `useFollows`, `useUserProfile`, etc.)
- **Store** : contexte global pour l'authentification (`AuthProvider`)

### ⚛️ Frontend – React + Vite

- **React 19** avec **Vite** comme bundler
- **React Router DOM** pour la navigation côté client
- **React Hook Form** pour la gestion des formulaires et de la validation
- **TanStack React Query** pour le cache et la synchronisation des données
- **TailwindCSS 4 + DaisyUI** pour le design system et les thèmes
- **Lucide React** pour les icônes

### 🔥 Backend – Firebase

- **Firebase Authentication** : gestion des utilisateurs (inscription, connexion, suppression)
- **Firebase Realtime Database** : stockage des données (utilisateurs, tweets, replies, follows)
- **DiceBear API** : génération d'avatars uniques à partir du pseudo

## 📂 Structure de la base de données

* `users/{uid}` – Profils des utilisateurs (Pseudo, Email, AvatarUrl, following)
* `users/{uid}/following/{followedUserId}` – Relations d'abonnement (booléen)
* `tweets/{tweetId}` – Publications (texte, authorId, createdAt)
* `replies/{tweetId}/{replyId}` – Réponses (texte, authorId, createdAt, tweetId)

## 🎨 Responsive design

L'application a été conçue selon une approche **mobile-first**, avec trois niveaux de mise en page :

- **< 1024px (mobile)** : barre de navigation fixée en bas (`BottomNav`), sidebar masquée, suggestion d'utilisateur intégrée au feed
- **1024px – 1279px (tablette / petit laptop)** : sidebar visible, suggestion en haut du feed, layout en deux colonnes
- **≥ 1280px (desktop)** : layout complet en trois colonnes (sidebar, feed, suggestions)

## 🚀 Installation

### Prérequis

- Node.js 18 ou supérieur
- Un compte Firebase avec un projet créé

### Étapes

1. Cloner le dépôt

```bash
git clone https://github.com/VOTRE_PSEUDO/clonex.git
cd clonex
```

2. Installer les dépendances

```bash
npm install
```

3. Configurer les variables d'environnement (voir section ci-dessous)

4. Lancer le serveur de développement

```bash
npm run dev
```

L'application est alors accessible sur `http://localhost:5173`.

## 🔐 Configuration Firebase

1. Créer un projet sur la [console Firebase](https://console.firebase.google.com)
2. Activer **Authentication** avec la méthode "Email/Mot de passe"
3. Activer **Realtime Database** (région Europe recommandée)
4. Créer un fichier `.env` à la racine du projet :

```env
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_auth_domain
VITE_FIREBASE_DATABASE_URL=votre_database_url
VITE_FIREBASE_PROJECT_ID=votre_project_id
VITE_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_messaging_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
```

5. Configurer les règles de sécurité de la Realtime Database :

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

## 📜 Scripts disponibles

```bash
npm run dev       # Lance le serveur de développement
npm run build     # Build de production
npm run preview   # Aperçu du build de production
npm run lint      # Vérification du code avec ESLint
```

## 👤 Auteure

**[ClaireLise-dev]**

Projet réalisé dans le cadre du programme Rocket Accelerator de Believemy.
