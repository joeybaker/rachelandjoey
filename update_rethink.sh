#!/bin/bash
# strict mode http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

export NODE_ENV=production

docker pull rethinkdb
if [[ -n $(docker ps -f 'name=rethinkdb' -q) ]]; then
  sudo docker rm -f rethinkdb
fi

sudo docker run --name rethinkdb -v "/srv/rethinkdb:/data" -d rethinkdb

sudo docker rm -f rachelandjoey
sudo docker run -d --restart=always --name rachelandjoey -e NODE_ENV=production \
  --link rethinkdb:rdb joeybaker/rachelandjoey

sudo docker rm -f bud
sudo docker run -d --restart=always -v "/srv/bud:/data" -p 443:443 --name bud \
  --link rachelandjoey:backend joeybaker/bud-tls

echo "ensuring assests are cached"
time curl -s https://rachelandjoey.com/static/index.js > /dev/null
