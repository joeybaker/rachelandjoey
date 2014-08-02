# rachelandjoey.com


## Running
```bash
sudo docker build -t joeybaker/rachelandjoey .
sudo docker run -d  -p 8000:80 joeybaker/rachelandjoey
```

## Tests
Tests are [prova](https://github.com/azer/prova), based on [tape](https://github.com/substack/tape). They can be run with `npm test`.

## Developing
To publish, run `gulp publish --bump=patch`

## Changelog
### 1.0.0
Initial Release
