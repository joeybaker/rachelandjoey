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
`npm run server` the JS in live reload mode, it's not the full server
`npm run dev -- component/dir` can run just a single component
`npm start` boots the server
