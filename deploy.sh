git pull --rebase
sudo docker build -t joeybaker/rachelandjoey .
sudo docker kill rachelandjoey
sudo docker rm rachelandjoey
sudo docker run -d  -p 80:8000 --name rachelandjoey joeybaker/rachelandjoey
