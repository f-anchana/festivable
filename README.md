# Symfony Set-Up
Comment set up symfony

AVOIR LA VERSION 8+ DE PHP

1- Installer composer (sur le site) composer -v pour voir si c bien installé composer -v pour voir si c bien installé

2- composer create-project symfony/skeleton quick_tour

3- Installer scoop pour installer sympfony cli: 

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

iwr -useb get.scoop.sh | iex

scoop -v

4- Installer sympfony pour de bon: scoop install symfony-cli

5- Démarrer le serveur: symfony server:start

(PS: si y a des problèmes c parce que t'as demarré le serveur sans te déplacer dans API, dans ce cas il faut d'abord arrêter l'autre serveur qui est dans le dossier principal : symfony server:stop et après aller dans API 👍)

## POSTMAN
Pour tester l'API en cours de développement utilisez postman ça sauve 👍