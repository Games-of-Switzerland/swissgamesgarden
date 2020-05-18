export default {
  jsonapi: {
    version: '1.0',
    meta: {links: {self: {href: 'http://jsonapi.org/format/1.0/'}}},
  },
  data: [
    {
      type: 'node--game',
      id: '08952aa6-e079-496a-8efa-cbb8465d9315',
      links: {
        self: {
          href:
            'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315?resourceVersion=id%3A32',
        },
      },
      attributes: {
        drupal_internal__nid: 12,
        langcode: 'en',
        status: true,
        title: 'Farming Simulator 19',
        promote: false,
        sticky: false,
        path: {alias: null, pid: null, langcode: 'en'},
        body: {
          value:
            '\u003Cp\u003EFarming Simulator is a series of farming simulation games set in an open world environment and played from a third-person perspective and also a first-person perspective.\u003C/p\u003E\r\n',
          format: 'basic_html',
          processed:
            '\u003Cp\u003EFarming Simulator is a series of farming simulation games set in an open world environment and played from a third-person perspective and also a first-person perspective.\u003C/p\u003E',
          summary: '',
        },
        field_path: '/games/farming-simulator-19',
      },
      relationships: {
        genres: {
          data: [],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315/genres?resourceVersion=id%3A32',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315/relationships/genres?resourceVersion=id%3A32',
            },
          },
        },
        images: {
          data: [
            {
              type: 'file--file',
              id: '33f76e5f-d434-42c5-95a2-0e99fc561d3f',
              meta: {
                alt: 'Consectetuer nunc obruo sed te vindico.',
                title: 'Ad appellatio nunc obruo torqueo.',
                width: 220,
                height: 100,
                imageDerivatives: {
                  links: {
                    large: {
                      href:
                        'http://localhost:8082/sites/default/files/styles/large/public/games/2020-05/generateImage_s6F8Hr.gif?itok=RuIylcLF',
                      meta: {
                        rel: [
                          'drupal://jsonapi/extensions/consumer_image_styles/links/relation-types/#derivative',
                        ],
                      },
                    },
                    medium: {
                      href:
                        'http://localhost:8082/sites/default/files/styles/medium/public/games/2020-05/generateImage_s6F8Hr.gif?itok=eoUOVg6Q',
                      meta: {
                        rel: [
                          'drupal://jsonapi/extensions/consumer_image_styles/links/relation-types/#derivative',
                        ],
                      },
                    },
                    thumbnail: {
                      href:
                        'http://localhost:8082/sites/default/files/styles/thumbnail/public/games/2020-05/generateImage_s6F8Hr.gif?itok=cJ2TKBMl',
                      meta: {
                        rel: [
                          'drupal://jsonapi/extensions/consumer_image_styles/links/relation-types/#derivative',
                        ],
                      },
                    },
                  },
                },
              },
            },
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315/images?resourceVersion=id%3A32',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315/relationships/images?resourceVersion=id%3A32',
            },
          },
        },
        members: {
          data: [],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315/members?resourceVersion=id%3A32',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315/relationships/members?resourceVersion=id%3A32',
            },
          },
        },
        releases: {
          data: [
            {
              type: 'taxonomy_term--platform',
              id: '304a43fe-3c4d-4587-93e6-a84959d39bf7',
              meta: {date_value: '2018-11-20T01:00:00+01:00'},
            },
            {
              type: 'taxonomy_term--platform',
              id: '9e1f8365-4bf3-4189-bf33-c9ac6862dca7',
              meta: {date_value: '2018-11-20T01:00:00+01:00'},
            },
            {
              type: 'taxonomy_term--platform',
              id: 'e5b2685e-39a7-4726-ad90-d7e3b44c2850',
              meta: {date_value: '2018-11-20T01:00:00+01:00'},
            },
            {
              type: 'taxonomy_term--platform',
              id: '03db2f32-1f7c-4d35-a2c9-42f951ae0bd8',
              meta: {date_value: '2018-11-20T01:00:00+01:00'},
            },
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315/releases?resourceVersion=id%3A32',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315/relationships/releases?resourceVersion=id%3A32',
            },
          },
        },
        studios: {
          data: [
            {type: 'node--studio', id: 'b7e315a4-65a1-4a34-b989-e2a5a96e1f22'},
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315/studios?resourceVersion=id%3A32',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/08952aa6-e079-496a-8efa-cbb8465d9315/relationships/studios?resourceVersion=id%3A32',
            },
          },
        },
      },
    },
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
        drupal_internal__nid: 9,
        langcode: 'en',
        status: true,
        title: 'Don\u0027t kill Her',
        promote: false,
        sticky: false,
        path: {alias: null, pid: null, langcode: 'en'},
        body: {
          value:
            '\u003Ch3 id=\u0022what_intro\u0022\u003EAn oddly cute indie game featuring a seemingly dead woman, and you, playing her murderer.\u003C/h3\u003E\r\n\r\n\u003Cp\u003EWhether it be woods carved in the memories of olden days or great steppes shaped by the darkness above, the areas you are about to explore are the fruit of Her very own creation. A world conceived especially for you,\u0026nbsp;\u003Cstrong\u003Eit\u2019s sole purpose being for you to find the answers to the questions it raises.\u003C/strong\u003E\u003Cbr /\u003E\r\n\u003Cbr /\u003E\r\nDon\u0027t judge a game by its cover.\u0026nbsp;\u003Cem\u003EDon\u2019t Kill Her\u003C/em\u003E\u0026nbsp;is not your average kind of game. Its deviant aesthetics, storytelling, gameplay and music, all of these peculiar elements fit into a great design\u2026 The true challenge lies in unraveling the mystery surrounding the game itself.\u003Cbr /\u003E\r\n\u003Cbr /\u003E\r\nI wish I could tell you more, but She won\u2019t let me.\u003C/p\u003E\r\n',
          format: 'basic_html',
          processed:
            '\u003Ch3 id=\u0022what_intro\u0022\u003EAn oddly cute indie game featuring a seemingly dead woman, and you, playing her murderer.\u003C/h3\u003E\n\n\u003Cp\u003EWhether it be woods carved in the memories of olden days or great steppes shaped by the darkness above, the areas you are about to explore are the fruit of Her very own creation. A world conceived especially for you,\u00a0\u003Cstrong\u003Eit\u2019s sole purpose being for you to find the answers to the questions it raises.\u003C/strong\u003E\u003Cbr /\u003E\u003Cbr /\u003E\nDon\u0027t judge a game by its cover.\u00a0\u003Cem\u003EDon\u2019t Kill Her\u003C/em\u003E\u00a0is not your average kind of game. Its deviant aesthetics, storytelling, gameplay and music, all of these peculiar elements fit into a great design\u2026 The true challenge lies in unraveling the mystery surrounding the game itself.\u003Cbr /\u003E\u003Cbr /\u003E\nI wish I could tell you more, but She won\u2019t let me.\u003C/p\u003E',
          summary: '',
        },
        field_path: '/games/dont-kill-her',
      },
      relationships: {
        genres: {
          data: [
            {
              type: 'taxonomy_term--genre',
              id: 'bd393d21-9d32-430d-9561-f39ae4239aa4',
            },
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd/genres?resourceVersion=id%3A41',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd/relationships/genres?resourceVersion=id%3A41',
            },
          },
        },
        images: {
          data: [
            {
              type: 'file--file',
              id: '3e5ee491-93ee-4e1d-9e39-e3bd7999eb13',
              meta: {
                alt: '',
                title: '',
                width: 415,
                height: 181,
                imageDerivatives: {
                  links: {
                    large: {
                      href:
                        'http://localhost:8082/sites/default/files/styles/large/public/games/2020-05/generateImage_NeExaZ.jpg?itok=yilVgneJ',
                      meta: {
                        rel: [
                          'drupal://jsonapi/extensions/consumer_image_styles/links/relation-types/#derivative',
                        ],
                      },
                    },
                    medium: {
                      href:
                        'http://localhost:8082/sites/default/files/styles/medium/public/games/2020-05/generateImage_NeExaZ.jpg?itok=Yk0A0tMR',
                      meta: {
                        rel: [
                          'drupal://jsonapi/extensions/consumer_image_styles/links/relation-types/#derivative',
                        ],
                      },
                    },
                    thumbnail: {
                      href:
                        'http://localhost:8082/sites/default/files/styles/thumbnail/public/games/2020-05/generateImage_NeExaZ.jpg?itok=EEKBfNQ4',
                      meta: {
                        rel: [
                          'drupal://jsonapi/extensions/consumer_image_styles/links/relation-types/#derivative',
                        ],
                      },
                    },
                  },
                },
              },
            },
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd/images?resourceVersion=id%3A41',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd/relationships/images?resourceVersion=id%3A41',
            },
          },
        },
        members: {
          data: [
            {
              type: 'node--people',
              id: 'c2c1d560-d9f4-4878-8105-7f63ec09e7ef',
              meta: {role: 'Game Designer'},
            },
            {
              type: 'node--people',
              id: '26409ead-3bf9-43b3-b245-8b0aa3a2ba9c',
              meta: {role: 'Technical Magician'},
            },
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd/members?resourceVersion=id%3A41',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd/relationships/members?resourceVersion=id%3A41',
            },
          },
        },
        releases: {
          data: [
            {
              type: 'taxonomy_term--platform',
              id: '9e1f8365-4bf3-4189-bf33-c9ac6862dca7',
              meta: {date_value: '2020-04-14T02:00:00+02:00'},
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
        studios: {
          data: [],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd/studios?resourceVersion=id%3A41',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/9bb9538f-5b75-4dc0-99b1-ff11d4e2abdd/relationships/studios?resourceVersion=id%3A41',
            },
          },
        },
      },
    },
    {
      type: 'node--game',
      id: 'a0b7c853-c891-487f-84f9-74dfbce9fa63',
      links: {
        self: {
          href:
            'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63?resourceVersion=id%3A42',
        },
      },
      attributes: {
        drupal_internal__nid: 11,
        langcode: 'en',
        status: true,
        title: 'Farming Simulator 18',
        promote: false,
        sticky: false,
        path: {alias: null, pid: null, langcode: 'en'},
        body: {
          value:
            '\u003Cp\u003EFarming Simulator is a series of farming simulation games set in an open world environment and played from a third-person perspective and also a first-person perspective.\u003C/p\u003E\r\n',
          format: 'basic_html',
          processed:
            '\u003Cp\u003EFarming Simulator is a series of farming simulation games set in an open world environment and played from a third-person perspective and also a first-person perspective.\u003C/p\u003E',
          summary: '',
        },
        field_path: '/games/farming-simulator-18',
      },
      relationships: {
        genres: {
          data: [
            {
              type: 'taxonomy_term--genre',
              id: 'bd393d21-9d32-430d-9561-f39ae4239aa4',
              meta: {arity: 0},
            },
            {
              type: 'taxonomy_term--genre',
              id: 'bd393d21-9d32-430d-9561-f39ae4239aa4',
              meta: {arity: 1},
            },
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63/genres?resourceVersion=id%3A42',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63/relationships/genres?resourceVersion=id%3A42',
            },
          },
        },
        images: {
          data: [
            {
              type: 'file--file',
              id: '81610ba2-e6ad-453b-894a-94ca274beb43',
              meta: {
                alt: '',
                title: '',
                width: 285,
                height: 533,
                imageDerivatives: {
                  links: {
                    large: {
                      href:
                        'http://localhost:8082/sites/default/files/styles/large/public/games/2020-05/generateImage_DZACoX.png?itok=0TqIm1vZ',
                      meta: {
                        rel: [
                          'drupal://jsonapi/extensions/consumer_image_styles/links/relation-types/#derivative',
                        ],
                      },
                    },
                    medium: {
                      href:
                        'http://localhost:8082/sites/default/files/styles/medium/public/games/2020-05/generateImage_DZACoX.png?itok=x8g-qHGG',
                      meta: {
                        rel: [
                          'drupal://jsonapi/extensions/consumer_image_styles/links/relation-types/#derivative',
                        ],
                      },
                    },
                    thumbnail: {
                      href:
                        'http://localhost:8082/sites/default/files/styles/thumbnail/public/games/2020-05/generateImage_DZACoX.png?itok=iHDeC5sV',
                      meta: {
                        rel: [
                          'drupal://jsonapi/extensions/consumer_image_styles/links/relation-types/#derivative',
                        ],
                      },
                    },
                  },
                },
              },
            },
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63/images?resourceVersion=id%3A42',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63/relationships/images?resourceVersion=id%3A42',
            },
          },
        },
        members: {
          data: [],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63/members?resourceVersion=id%3A42',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63/relationships/members?resourceVersion=id%3A42',
            },
          },
        },
        releases: {
          data: [
            {
              type: 'taxonomy_term--platform',
              id: '304a43fe-3c4d-4587-93e6-a84959d39bf7',
              meta: {date_value: '2017-06-06T02:00:00+02:00'},
            },
            {
              type: 'taxonomy_term--platform',
              id: '9e1f8365-4bf3-4189-bf33-c9ac6862dca7',
              meta: {date_value: '2017-06-06T02:00:00+02:00'},
            },
            {
              type: 'taxonomy_term--platform',
              id: '6ea716ae-e50f-4a59-ace5-603c353ae20a',
              meta: {date_value: '2018-02-15T01:00:00+01:00'},
            },
            {
              type: 'taxonomy_term--platform',
              id: '8728c551-6d66-4ebd-a264-6af0ceeb96f1',
              meta: {date_value: '2018-02-15T01:00:00+01:00'},
            },
            {
              type: 'taxonomy_term--platform',
              id: '81a726a3-72c0-478c-af74-601c72e88cdc',
              meta: {date_value: '2017-06-06T02:00:00+02:00'},
            },
            {
              type: 'taxonomy_term--platform',
              id: '7705472b-c32e-4939-82e6-7f73ec1ab339',
              meta: {date_value: '2017-06-06T02:00:00+02:00'},
            },
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63/releases?resourceVersion=id%3A42',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63/relationships/releases?resourceVersion=id%3A42',
            },
          },
        },
        studios: {
          data: [
            {type: 'node--studio', id: 'b7e315a4-65a1-4a34-b989-e2a5a96e1f22'},
          ],
          links: {
            related: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63/studios?resourceVersion=id%3A42',
            },
            self: {
              href:
                'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/a0b7c853-c891-487f-84f9-74dfbce9fa63/relationships/studios?resourceVersion=id%3A42',
            },
          },
        },
      },
    },
  ],
  meta: {
    omitted: {
      detail:
        'Some resources have been omitted because of insufficient authorization.',
      links: {
        help: {
          href:
            'https://www.drupal.org/docs/8/modules/json-api/filtering#filters-access-control',
        },
        'item--Qu5G4La': {
          href:
            'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game/12b7a617-4c66-4fb1-adf0-0ad70b775b9c',
          meta: {
            rel: 'item',
            detail:
              'The current user is not allowed to GET the selected resource.',
          },
        },
      },
    },
  },
  links: {self: {href: 'http://localhost:8082/G70VW4Y9sP/jsonapi/node/game'}},
};
