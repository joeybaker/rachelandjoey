sudo docker build -t joeybaker/rachelandjoey /srv/rachelandjoey.com
sudo docker rm -f rachelandjoey
sudo docker run -d --name rachelandjoey joeybaker/rachelandjoey
sudo docker rm -f bud
sudo docker run -d -v /srv/bud:/data -p 443:443 --name bud --link rachelandjoey:backend joeybaker/bud-tls
sudo docker rm -f redirector
sudo docker run -d --restart=always -p 80:80 --name redirector getable/https-redirect
