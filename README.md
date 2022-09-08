# Swiss Games Garden

The list of Swiss video games is, although you might think it is not, massive. This website is here to make the most exhaustive list of all the creations from our country. It is mainly intended for journalists, searchers and all the people in the game development world. It can also be used at your discretion to shut up people saying "we don't make video games in Switzerland, you suck". Those degenerates.

## 🐳 Docker Install

### Project setup

```bash
cp docker-compose.override-example.yml docker-compose.override.yml
```

Update any values as needed, example when you already use the 8083 port:

```yml
services:
  # Next app server
  next_app:
    hostname: next_app
    ports:
      - "8083:3000"
```

```bash
cp .env.example .env
```

Update any values as needed to point on proper backend endpoints:

```.env
NEXT_PUBLIC_ELASTICSEARCH=http://localhost:8080/search
NEXT_PUBLIC_SERVER_ELASTICSEARCH=http://localhost:8080/search
NEXT_PUBLIC_JSONAPI=http://localhost:8080/G70VW4Y9sP/jsonapi
NEXT_PUBLIC_SERVER_JSONAPI=http://localhost:8080/G70VW4Y9sP/jsonapi
NEXT_PUBLIC_AUTOCOMPLETE=http://localhost:8080/autocomplete
:NEXT_PUBLIC_ENV=production
```

**Don't forget to set `NEXT_PUBLIC_ENV`, which will allow the site to be indexed when set to `production`.**

### Project bootstrap

```bash
docker-compose build --pull
docker-compose up --build -d
```

### Project setup

## 🚛 *(optional)* Local Install

The website is built with [NextJS](http://nextjs.org/) and is linked to a Drupal website with Elasticsearch.

Install all dependencies:

```bash
yarn
```

Start the NextJS server:

```bash
yarn dev
```

Start the Storybook server:

```bash
yarn storybook
```

## 🚀 Deploy

### First time

```bash
# You need to have ruby & bundler installed
$ bundle install
```

### Each time

We use Capistrano to deploy:

```bash
bundle exec cap -T
bundle exec cap staging deploy
```

## 🤷 Authors

👨‍💻 **Toni Fisler**

* Twitter: [@tonifisler](https://twitter.com/tonifisler)
* Github: [@tonifisler](https://github.com/tonifisler)

👨‍💻 **Kevin Wenger**

* Twitter: [@wengerk](https://twitter.com/wengerk)
* Github: [@wengerk](https://github.com/wengerk)

👩‍💻 **Camille Létang**

* Github: [@CamilleLetang](https://github.com/CamilleLetang)

👨‍💻 **Pierre Georges**

* Github: [@pierre-georges](https://github.com/pierre-georges)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/Games-of-Switzerland/swissgamesgarden/issues).

