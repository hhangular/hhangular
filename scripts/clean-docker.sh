# tue tous les conteneurs qui tourne
docker kill $(docker ps -a -q)
# supprime tous les conteneurs stoppé
docker rm $(docker ps -a -q)
# supprime tous les images
docker rmi $(docker images -q) --force
