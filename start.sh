#!/bin/bash
# strict mode http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

export NODE_ENV=production

cd /srv/rachelandjoey.com
git reset --hard HEAD
git pull --rebase --prune
npm prune
npm i --production

# remove all unused images (saves space)
docker ps -a | grep 'Exited' | awk '{print $1}' | xargs --no-run-if-empty docker rm

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

echo "ensuring assests are cached"
time curl -s https://rachelandjoey.com/static/index.js > /dev/null
