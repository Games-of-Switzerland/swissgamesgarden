# Swiss Games Garden

The list of Swiss video games is, although you might think it is not, massive. This website is here to make the most exhaustive list of all the creations from our country. It is mainly intended for journalists, searchers and all the people in the game development world. It can also be used at your discretion to shut up people saying "we don't make video games in Switzerland, you suck". Those degenerates.

## Install

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

## ENV

Don't forget to set the env variables, especially `NEXT_PUBLIC_ENV`, which will allow the site to be indexed when set to `production`.

## Contribute

Don't hesitate to do so, PRs are open.


