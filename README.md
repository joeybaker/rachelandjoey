<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [rachelandjoey.com](#rachelandjoeycom)
  - [Running](#running)
  - [Tests](#tests)
  - [Developing](#developing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# rachelandjoey.com


## Running
```bash
sudo docker build -t joeybaker/rachelandjoey .
sudo docker rm -f rachelandjoey
sudo docker run -d  -p 80:8000 --name rachelandjoey joeybaker/rachelandjoey
```

```bash
sudo docker rm -f bud
sudo docker run -d -v /srv/bud:/data -p 443:443 --name bud --link rachelandjoey:backend joeybaker/bud-tls
```

```bash
sudo docker rm -f redirector
sudo docker run -d --restart=always -p 80:80 --name redirector getable/https-redirect
```

## Tests
Tests are [tape](https://github.com/substack/tape). They can be run with `npm test`.

## Developing
`npm run dev` the JS in live reload mode, it's not the full server
`npm run component -- component/dir` can run just a single component
`npm start` boots the server
