# festivable
Comment set up symfony

1- Installer composer (sur le site) composer -v pour voir si c bien installé composer -v pour voir si c bien installé

2- composer create-project symfony/skeleton quick_tour

3- Installer scoop pour installer sympfony cli: 

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

iwr -useb get.scoop.sh | iex

scoop -v

4- Installer sympfony pour de bon: scoop install symfony-cli

5- Démarrer le serveur: symfony server:start