# Rapport — Documentation d'API (Swagger & Postman)
**Nom :** RAMAMONJISOA Sitrakiniaina Tsiatosika  
**Matière :** Technologies Client-Serveur — L3  
**Cours 2026**

---

## 1. Pourquoi la documentation d'API est essentielle en entreprise

Dans un contexte professionnel, une API est rarement utilisée uniquement par
son créateur. Elle est consommée par d'autres développeurs, d'autres équipes,
parfois d'autres entreprises. Sans documentation claire, chaque intégration
devient une perte de temps : il faut deviner les paramètres, les formats de
réponse, les codes d'erreur.

La documentation d'API remplit trois rôles critiques. D'abord, elle accélère
l'intégration : un développeur frontend peut travailler en parallèle du backend
dès que le contrat d'interface est documenté. Ensuite, elle réduit les erreurs :
des exemples de requêtes et de réponses évitent les mauvaises interprétations.
Enfin, elle facilite la maintenance : quand le code évolue, la documentation
sert de référence pour identifier les changements à signaler aux consommateurs.

---

## 2. Swagger UI vs Postman — Comparaison

### Swagger UI / OpenAPI
Swagger UI est un outil de **documentation interactive** généré à partir
d'un fichier de spécification OpenAPI (YAML ou JSON). Son rôle principal
est de présenter l'API de façon visuelle et de permettre des tests rapides
directement depuis le navigateur.

On l'utilise quand on veut **exposer le contrat d'interface** à d'autres
équipes ou à des clients externes. C'est la première chose qu'on partage
quand on livre une API.

### Postman Collections
Postman est un outil de **test et d'automatisation**. Il permet de créer
des requêtes réutilisables, des environnements (dev, prod), des scripts de
test JavaScript et des runners qui exécutent toute une collection en un clic.

On l'utilise en interne, pendant le développement et la recette, pour vérifier
que chaque endpoint se comporte comme prévu, notamment les cas d'erreur (401,
404, 422) que Swagger ne teste pas aussi facilement.

### En résumé

| Critère | Swagger UI | Postman |
|---------|-----------|---------|
| Public cible | Equipes externes, clients | Développeurs internes |
| Usage principal | Documentation, exploration | Tests, automatisation |
| Format | Fichier YAML/JSON | Collection JSON |
| Tests automatisés | Non | Oui (JS) |
| Environnements | Non | Oui |

Les deux outils sont complémentaires : Swagger documente, Postman teste.

---

## 3. Difficulté rencontrée et résolution

La principale difficulté rencontrée concernait la **contrainte de clé
étrangère** lors de la création de livres. Lorsque le seeder était relancé
avec `force: true`, toutes les tables étaient recréées et les IDs repartaient
de zéro. Si un token JWT de l'ancienne session était encore actif dans Swagger,
les requêtes POST échouaient avec une erreur de clé étrangère car l'`author_id`
référencé n'existait plus.

La résolution a consisté à systématiquement se déconnecter et regénérer un
nouveau token JWT après chaque relance du seeder, et à vérifier les IDs
disponibles via GET /authors avant tout test de création.

---

## 4. Amélioration envisagée

Avec plus de temps, j'aurais ajouté un système de **pagination** sur les
endpoints de liste (GET /books, GET /authors) avec des paramètres `?page`
et `?limit`, documentés dans Swagger. J'aurais également implémenté un
**script de test d'intégration Postman** enchaînant automatiquement :
login → création d'auteur → création de livre → emprunt → retour → suppression,
pour valider le workflow complet en une seule exécution du Runner.