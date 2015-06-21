#!/bin/bash
# strict mode http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

export NODE_ENV=production

cd /srv/rachelandjoey.com
echo "pulling latest"
git reset --hard HEAD
git pull --rebase --prune

echo "npm install"
npm prune
npm i --production

echo "db connection"
if [[ -n $(docker ps -f 'name=rethinkdb' -q) ]]; then
  echo 'rethinkdb already running'
else
  sudo docker run --name rethinkdb -v "/srv/rethinkdb:/data" -d rethinkdb
fi

echo "building app"
sudo docker build -t joeybaker/rachelandjoey /srv/rachelandjoey.com
sudo docker rm -f rachelandjoey
sudo docker run -d --restart=always --name rachelandjoey \
  -e NODE_ENV=production \
  -e LOGGLY_TOKEN="$LOGGLY_TOKEN" \
  -e LOGGLY_SUBDOMAIN="$LOGGLY_SUBDOMAIN" \
  --link rethinkdb:rdb joeybaker/rachelandjoey

echo "starting ssl"
sudo docker rm -f bud
sudo docker run -d --restart=always -v "/srv/bud:/data" -p 443:443 --name bud \
  --link rachelandjoey:backend joeybaker/bud-tls

echo "starting http → https redirector"
if [[ -n $(docker ps -f 'name=redirector' -q) ]]; then
  echo "redirector already running"
else
  sudo docker run -d --restart=always -p 80:80 \
    --name redirector getable/https-redirect
fi;

echo "looking for old containers to remove"
# remove all unused images (saves space)
if [[ -n $(docker ps -a | grep 'Exited' | awk '{print $1}') ]]; then
  echo "removing old containers"
  docker ps -a | grep 'Exited' | awk '{print $1}' | xargs --no-run-if-empty docker rm
else
  echo "no old containers found"
fi;

# wait for the server to go up
echo "ensuring assests are cached"
sleep 10
curl --silent https://rachelandjoey.com/ > /dev/null

echo "done"
