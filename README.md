<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [rachelandjoey.com](#rachelandjoeycom)
  - [Running](#running)
    - [Server setup](#server-setup)
  - [Tests](#tests)
  - [Developing](#developing)
    - [Adding ENV tokens](#adding-env-tokens)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# rachelandjoey.com


## Running
```bash
sudo docker build -t joeybaker/rachelandjoey .
sudo docker rm -f rachelandjoey
sudo docker run -d --name rachelandjoey joeybaker/rachelandjoey
```

```bash
sudo docker rm -f bud
sudo docker run -d -v /srv/bud:/data -p 443:443 --name bud --link rachelandjoey:backend joeybaker/bud-tls
```

```bash
sudo docker rm -f redirector
sudo docker run -d --restart=always -p 80:80 --name redirector getable/https-redirect
```

### Server setup
* use docker
* ensure you have env tokens set:
    * `LOGGLY_TOKEN`
    * `LOGGLY_SUBDOMAIN`
* run `start.sh`

## Tests
Tests are [tape](https://github.com/substack/tape). They can be run with `npm test`.

## Developing
`npm run dev` the JS in live reload mode, it's not the full server
`npm run component -- component/dir` can run just a single component
`npm start` boots the server

### Adding ENV tokens
* export from `~/.zprofile` for the root user on the server
* add to the docker run command in `start.sh`
* use in the app via `server.app.config`
