# 📚 API Bibliothèque — Documentation & Tests

API REST de gestion d'une bibliothèque développée avec Express.js et PostgreSQL.

---

## 🛠️ Stack technique

- **Runtime** : Node.js v18+
- **Framework** : Express.js
- **Base de données** : PostgreSQL
- **ORM** : Sequelize
- **Auth** : JWT (jsonwebtoken)
- **Documentation** : OpenAPI 3.x / Swagger UI
- **Tests** : Postman Collections

---

## ⚙️ Installation

### 1. Cloner le projet
```bash
git clone https://github.com/[ton-username]/api-bibliotheque.git
cd api-bibliotheque
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer l'environnement
```bash
cp .env.example .env
```

Édite `.env` avec tes valeurs :
```env
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bibliotheque_db
DB_USER=postgres
DB_PASSWORD=ton_mot_de_passe
JWT_SECRET=un_secret_long_et_complexe
JWT_EXPIRES_IN=24h
```

### 4. Créer la base de données
```bash
psql -U postgres -c "CREATE DATABASE bibliotheque_db;"
```

### 5. Lancer le seed (tables + données de test)
```bash
npm run db:seed
```

Cela crée :
- 3 auteurs
- 5 livres
- 2 emprunts
- 1 utilisateur admin : `admin@biblio.com` / `password123`

### 6. Démarrer le serveur
```bash
npm run dev      # développement (nodemon)
npm start        # production
```

Le serveur démarre sur : `http://localhost:8000`

---

## 📖 Documentation Swagger UI

Accessible sur : `http://localhost:8000/api/docs`

### Utilisation :
1. Aller sur `/api/docs`
2. Cliquer **POST /auth/login** → Try it out
3. Body : `{"email":"admin@biblio.com","password":"password123"}`
4. Copier le token retourné
5. Cliquer **Authorize 🔒** → coller le token → Authorize
6. Tester tous les endpoints directement depuis l'interface

---

## 🔑 Endpoints principaux

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/api/v1/auth/login` | ❌ | Connexion JWT |
| GET | `/api/v1/authors` | ❌ | Liste auteurs |
| POST | `/api/v1/authors` | ✅ | Créer auteur |
| GET | `/api/v1/books` | ❌ | Liste livres |
| POST | `/api/v1/books` | ✅ | Ajouter livre |
| GET | `/api/v1/borrows` | ✅ | Liste emprunts |
| POST | `/api/v1/borrows` | ✅ | Emprunter un livre |
| PATCH | `/api/v1/borrows/:id/return` | ✅ | Retourner un livre |

---

## 🧪 Tests Postman

### Importer la collection :
1. Ouvrir Postman
2. **Import** → sélectionner `collection_bibliotheque_[NomPrenom].json`
3. Importer aussi `env_dev_[NomPrenom].json`
4. Activer l'environnement **Développement**
5. Lancer **POST /auth/login** en premier
6. Utiliser **Collection Runner** pour tout exécuter

---

## 📁 Structure du projet

api-bibliotheque/
├── src/
│   ├── config/
│   │   ├── database.js       # Connexion Sequelize
│   │   └── swagger.js        # Config Swagger UI
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── authorController.js
│   │   ├── bookController.js
│   │   └── borrowController.js
│   ├── middlewares/
│   │   └── auth.js           # Middleware JWT
│   ├── models/
│   │   ├── Author.js
│   │   ├── Book.js
│   │   ├── Borrow.js
│   │   ├── User.js
│   │   └── index.js          # Associations
│   ├── routes/
│   │   ├── auth.js
│   │   ├── authors.js
│   │   ├── books.js
│   │   └── borrows.js
│   ├── seeders/
│   │   └── seed.js
│   ├── app.js
│   └── server.js
├── openapi.yaml
├── .env.example
├── README.md
└── package.json

---

## 👤 Auteur

RAMAMONJISOA Sitrakiniaina Tsiatosika — L3 Technologies Client-Serveur 