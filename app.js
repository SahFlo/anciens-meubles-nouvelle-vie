// Explication des dépendances
// bcrypt : Utilisé pour hacher les mots de passe. Cela aide à sécuriser les mots de passe des utilisateurs en les transformant en une chaîne illisible.
// jsonwebtoken : Utilisé pour créer et vérifier des jetons JSON Web (JWT). Cela permet de gérer l'authentification des utilisateurs de manière sécurisée.
// dotenv : Permet de charger des variables d'environnement à partir d'un fichier .env dans process.env. C'est utile pour gérer les configurations sensibles comme les clés API ou les mots de passe de base de données.
// multer : Un middleware pour gérer les téléchargements de fichiers, comme les images ou les documents, dans votre application Express.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');

// Configuration de multer pour les téléchargements de fichiers
const upload = multer({ dest: 'uploads/' });

// Exemple de route pour tester bcrypt
app.post('/hash-password', async (req, res) => {
  try {
    const password = req.body.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    res.send(`Hashed Password: ${hashedPassword}`);
  } catch (error) {
    res.status(500).send('Error hashing password');
  }
});

// Exemple de route pour générer un JWT
app.post('/generate-token', (req, res) => {
  const userId = req.body.userId;
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.send(`Generated Token: ${token}`);
});

// Exemple de route pour télécharger un fichier
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});



//Explication avec analogie
//Inviter des amis = importer des modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Invitations : Vous invitez des amis spéciaux (modules) qui vont vous aider à organiser la fête. Chaque ami a une compétence particulière :
// express : C'est le chef d'orchestre qui va gérer les interactions avec les invités (utilisateurs).
// path : Il aide à trouver le chemin vers différentes pièces de la maison (fichiers et dossiers).
// cookieParser : Il gère les petits cadeaux (cookies) que les invités apportent.
// logger : Il note tout ce qui se passe pendant la fête pour que vous puissiez vous en souvenir plus tard.

//Préparer les pièces (importer les routes)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Pièces spéciales : Vous avez des pièces spéciales dans la maison où certaines activités se déroulent. Par exemple, une pièce pour accueillir les invités (indexRouter) et une autre pour gérer les informations des invités (usersRouter).

//Créer l'application (initialiser Express)
var app = express();
// Chef d'orchestre : Vous nommez express comme chef d'orchestre pour gérer la fête.

//Configurer la décoration (moteur de vues/view engine setup)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Décoration : Vous décidez comment les pièces seront décorées (views) et quel style de décoration utiliser (ejs).

//Préparer les activités (middleware)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Activités : Vous mettez en place des activités pour les invités :
// logger : Note ce qui se passe pendant la fête.
// express.json() et express.urlencoded() : Aident à comprendre les cadeaux (données) apportés par les invités.
// cookieParser : Gère les petits cadeaux (cookies).
// express.static : Sert des rafraîchissements (fichiers statiques) aux invités.

//Guider les invités (routes)
app.use('/', indexRouter);
app.use('/users', usersRouter);
//Guide : Vous guidez les invités vers les différentes pièces de la maison en fonction de ce qu'ils veulent faire.

//Gérer les imprévus (gestion des erreurs)
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// Plan B : Vous avez un plan pour gérer les imprévus, comme si un invité se perd (erreur 404) ou si quelque chose ne va pas (erreur 500). Vous les redirigez vers une pièce spéciale pour les aider.


//Exporter l'application :
module.exports = app;

//démarrer le serveur et écouter sur un port
const port = 3000; // ou un autre port de votre choix
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

