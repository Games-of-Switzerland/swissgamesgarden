// @ts-check

export default {
  jsonapi: {
    version: '1.0',
    meta: {
      links: {
        self: {
          href: 'http://jsonapi.org/format/1.0/',
        },
      },
    },
  },
  data: [
    {
      type: 'node--game',
      id: '9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd',
      links: {
        self: {
          href:
            'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd?resourceVersion=id%3A41',
        },
      },
      attributes: {
        title: "Don't kill Her",
        body: {
          value:
            '<h3 id="what_intro">An oddly cute indie game featuring a seemingly dead woman, and you, playing her murderer.</h3>\r\n\r\n<p>Whether it be woods carved in the memories of olden days or great steppes shaped by the darkness above, the areas you are about to explore are the fruit of Her very own creation. A world conceived especially for you,&nbsp;<strong>it’s sole purpose being for you to find the answers to the questions it raises.</strong><br />\r\n<br />\r\nDon\'t judge a game by its cover.&nbsp;<em>Don’t Kill Her</em>&nbsp;is not your average kind of game. Its deviant aesthetics, storytelling, gameplay and music, all of these peculiar elements fit into a great design… The true challenge lies in unraveling the mystery surrounding the game itself.<br />\r\n<br />\r\nI wish I could tell you more, but She won’t let me.</p>\r\n',
          format: 'basic_html',
          processed:
            '<h3 id="what_intro">An oddly cute indie game featuring a seemingly dead woman, and you, playing her murderer.</h3>\n\n<p>Whether it be woods carved in the memories of olden days or great steppes shaped by the darkness above, the areas you are about to explore are the fruit of Her very own creation. A world conceived especially for you, <strong>it’s sole purpose being for you to find the answers to the questions it raises.</strong><br /><br />\nDon\'t judge a game by its cover. <em>Don’t Kill Her</em> is not your average kind of game. Its deviant aesthetics, storytelling, gameplay and music, all of these peculiar elements fit into a great design… The true challenge lies in unraveling the mystery surrounding the game itself.<br /><br />\nI wish I could tell you more, but She won’t let me.</p>',
          summary: '',
        },
        field_path: '/games/dont-kill-her',
      },
      relationships: {
        releases: {
          data: [
            {
              type: 'taxonomy_term--platform',
              id: '9e1f8365-4bf3-4189-bf33-c9ac6862dca7',
              meta: {
                date_value: '2020-04-14T02:00:00+02:00',
              },
            },
            {
              type: 'taxonomy_term--platform',
              id: 'fake-id',
              meta: {
                date_value: '2020-04-14T22:00:00+02:00',
              },
            },
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd/releases?resourceVersion=id%3A41',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd/relationships/releases?resourceVersion=id%3A41',
            },
          },
        },
      },
    },
  ],
  included: [
    {
      type: 'node--studio',
      id: 'b7e315a4-65a1-4a34-b989-e2a5a96e1f22',
      links: {
        self: {
          href:
            'http://localhost:8082/G70VW4Y9sP/jsonapi/node/studio/b7e315a4-65a1-4a34-b989-e2a5a96e1f22?resourceVersion=id%3A35',
        },
      },
      attributes: {
        title: 'Klakmioch',
      },
    },
    {
      type: 'taxonomy_term--genre',
      id: 'bd393d21-9d32-430d-9561-f39ae4239aa4',
      links: {
        self: {
          href:
            'http://localhost:8082/G70VW4Y9sP/jsonapi/taxonomy_term/genre/bd393d21-9d32-430d-9561-f39ae4239aa4',
        },
      },
      attributes: {
        drupal_internal__tid: 15,
        langcode: 'en',
        name: 'simulator',
        description: null,
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/taxonomy_term/genre/bd393d21-9d32-430d-9561-f39ae4239aa4/relationships/vid',
            },
          },
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--genre',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href:
                      'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        "Usage and meaning of the 'virtual' resource identifier.",
                    },
                  },
                },
              },
            },
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/taxonomy_term/genre/bd393d21-9d32-430d-9561-f39ae4239aa4/parent',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/taxonomy_term/genre/bd393d21-9d32-430d-9561-f39ae4239aa4/relationships/parent',
            },
          },
        },
      },
    },
    {
      type: 'taxonomy_term--platform',
      id: '9e1f8365-4bf3-4189-bf33-c9ac6862dca7',
      links: {
        self: {
          href:
            'http://localhost:8082/G70VW4Y9sP/jsonapi/taxonomy_term/platform/9e1f8365-4bf3-4189-bf33-c9ac6862dca7',
        },
      },
      attributes: {
        name: 'Mac',
      },
    },
    {
      type: 'taxonomy_term--platform',
      id: 'fake-id',
      links: {
        self: {
          href:
            'http://localhost:8082/G70VW4Y9sP/jsonapi/taxonomy_term/platform/fake-id',
        },
      },
      attributes: {
        name: 'PC',
      },
    },
  ],
  links: {
    self: {
      href:
        'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game?fields%5Bnode--game%5D=title%2Cbody%2Cfield_path%2Creleases&fields%5Bnode--studio%5D=title&fields%5Btaxonomy_term--platform%5D=name&filter%5Bfield_path%5D=/games/dont-kill-her&include=studios%2Cgenres%2Creleases',
    },
  },
};

export const normalizedGameTestData = {
  id: '9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd',
  title: "Don't kill Her",
  body:
    '\u003Ch3 id=\u0022what_intro\u0022\u003EAn oddly cute indie game featuring a seemingly dead woman, and you, playing her murderer.\u003C/h3\u003E\n\n\u003Cp\u003EWhether it be woods carved in the memories of olden days or great steppes shaped by the darkness above, the areas you are about to explore are the fruit of Her very own creation. A world conceived especially for you,\u00a0\u003Cstrong\u003Eit\u2019s sole purpose being for you to find the answers to the questions it raises.\u003C/strong\u003E\u003Cbr /\u003E\u003Cbr /\u003E\nDon\u0027t judge a game by its cover.\u00a0\u003Cem\u003EDon\u2019t Kill Her\u003C/em\u003E\u00a0is not your average kind of game. Its deviant aesthetics, storytelling, gameplay and music, all of these peculiar elements fit into a great design\u2026 The true challenge lies in unraveling the mystery surrounding the game itself.\u003Cbr /\u003E\u003Cbr /\u003E\nI wish I could tell you more, but She won\u2019t let me.\u003C/p\u003E',
  path: '/games/dont-kill-her',
  studios: [
    {
      id: 'b7e315a4-65a1-4a34-b989-e2a5a96e1f22',
      title: 'Klakmioch',
    },
  ],
  releases: [
    {
      date: '2020-04-14T02:00:00+02:00',
      id: '9e1f8365-4bf3-4189-bf33-c9ac6862dca7',
      platform: 'Mac',
      year: 2020,
    },
    {
      date: '2020-04-14T22:00:00+02:00',
      id: 'fake-id',
      platform: 'PC',
      year: 2020,
    },
  ],
  genres: [{id: 'bd393d21-9d32-430d-9561-f39ae4239aa4', name: 'simulator'}],
};
