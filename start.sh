#!/bin/bash
# strict mode http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

cd /srv/rachelandjoey.com
git reset --hard HEAD
git pull --rebase --prune
npm prune
npm i --production

if [[ -n $(docker ps -f 'name=rethinkdb' -q) ]]; then
  echo 'rethinkdb already running'
else
  sudo docker run --name rethinkdb -v "/srv/rethinkdb:/data" -d rethinkdb
fi

sudo docker build -t joeybaker/rachelandjoey /srv/rachelandjoey.com
sudo docker rm -f rachelandjoey
sudo docker run -d --restart=always --name rachelandjoey -e NODE_ENV=production \
  --link rethinkdb:rdb joeybaker/rachelandjoey


sudo docker rm -f bud
sudo docker run -d --restart=always -v "/srv/bud:/data" -p 443:443 --name bud \
  --link rachelandjoey:backend joeybaker/bud-tls

sudo docker rm -f redirector
sudo docker run -d --restart=always -p 80:80 \
  --name redirector getable/https-redirect
