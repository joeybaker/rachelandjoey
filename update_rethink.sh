#!/bin/bash
# strict mode http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

export NODE_ENV=production

docker pull rethinkdb
if [[ -n $(docker ps -af 'name=rethinkdb' -q) ]]; then
  sudo docker rm -f rethinkdb
else
  sudo docker run --name rethinkdb -v "/srv/rethinkdb:/data" -d rethinkdb
fi

bash start.sh
