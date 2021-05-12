projet 7 openclassrooms

prérequis :

- Node.js
- MySQL
- Git

Instructions 

1- Cloner le repository
2- Dans le Frontend :
	- ouvrir le terminal 
	- npm install
	- npm run serve
3- Pour SQL :
	- Ouvrir un second terminal
	- connectez-vous à mysql
	- Dans les settings de votre ordinateur, assurez vous qu'une 	  instance MySQL soit bien active.
	- importez le fichier "initBdd.sql"
4- Dans le Backend:
	-  remplir le fichier .env.init:
		- DB_USER: votre nom d'utilisateur pour votre base de 		  données.
		- DB_PASS: votre mot de passe pour votre base de données.
		- TKN_SECRET = variable de votre choix.
	- Renommer ce dossier ".env" à la place de ".env.int"
	- Ouvrir un troisième terminal.
	- npm install
	- node server