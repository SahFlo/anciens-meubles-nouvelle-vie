//Explication avec analogie
//Inviter des amis = importer des modules
// Chaque ami a une compétence particulière :
var createError = require('http-errors');
var express = require('express'); //C'est le chef d'orchestre qui va gérer les interactions avec les invités (utilisateurs).
var path = require('path'); //Il aide à trouver le chemin vers différentes pièces de la maison (fichiers et dossiers).
var cookieParser = require('cookie-parser'); //Il gère les petits cadeaux (cookies) que les invités apportent.
var logger = require('morgan'); //Il note tout ce qui se passe pendant la fête pour que vous puissiez vous en souvenir plus tard.
const sequelize = require('./config/db'); //ORM :facilite la manipulation de données
const bcrypt = require('bcrypt'); //Utilisé pour hacher les mots de passe. Cela aide à sécuriser les mots de passe des utilisateurs en les transformant en une chaîne illisible.
const jwt = require('jsonwebtoken'); //pour créer et vérifier des jetons JSON Web (JWT). Cela permet de gérer l'authentification des utilisateurs de manière sécurisée.
require('dotenv').config(); //Permet de charger des variables d'environnement à partir d'un fichier .env. Utile pour gérer kes cibdugs sensibles comme les clés API ou les mots de passe de base de données.
const multer = require('multer'); //pour gérer les téléchargements de fichiers, comme les images ou les documents, dans votre application Express.


// Configuration de multer pour les téléchargements de fichiers
const upload = multer({ dest: 'uploads/' });


//Créer l'application (initialiser Express)
var app = express();
// Chef d'orchestre : Vous nommez express comme chef d'orchestre pour gérer la fête.

// Synchroniser les modèles avec la base de données
async function syncDatabase() {
  try {
    await sequelize.sync({ force: false }); // Utilisez { force: true } pour supprimer et recréer les tables
    console.log('✅ Modèles synchronisés avec la base de données');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation des modèles:', error);
  }
}
syncDatabase().then(() => {
  // Configurer les middlewares et les routes après la synchronisation
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
});

//Préparer les pièces (importer les routes)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var furnitureRouter = require('./routes/furniture');
// Pièces spéciales : Vous avez des pièces spéciales dans la maison où certaines activités se déroulent. Par exemple, une pièce pour accueillir les invités (indexRouter) et une autre pour gérer les informations des invités (usersRouter).

//configurer les routes
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/furniture', furnitureRouter);


  // Gestion des erreurs
  app.use(function(req, res, next) {
    next(createError(404));
  });

  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  });

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


//Configurer la décoration (moteur de vues/view engine setup)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Décoration : Vous décidez comment les pièces seront décorées (views) et quel style de décoration utiliser (ejs).

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

