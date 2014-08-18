# rachelandjoey.com


## Running
```bash
sudo docker build -t joeybaker/rachelandjoey .
sudo docker rm -f rachelandjoey
sudo docker run -d  -p 80:8000 --name rachelandjoey joeybaker/rachelandjoey
```

```bash
sudo docker run -d -v /srv/bud:/data -p 443:443 --name bud --link rachelandjoey:backend joeybaker/bud-tls
```

## Tests
Tests are [prova](https://github.com/azer/prova), based on [tape](https://github.com/substack/tape). They can be run with `npm test`.

## Developing
To publish, run `gulp publish --bump=patch`

## Changelog
### 1.0.0
Initial Release

## Deploy
```bash
npm version patch
npm pack
```
* hit a hawk endpoint with the tarball /deploy/{projectname}/{version}
* on the server…
* untars
* docker build etc…
