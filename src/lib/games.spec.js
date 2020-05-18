import {getGame, getGames, getSimpleReleases} from './games';
import gamesTestData from '../../tests/gamesTestData';
import gameTestData, {normalizedGameTestData} from '../../tests/gameTestData';

beforeEach(() => fetch.resetMocks());

describe('games lib', () => {
  it('gets all games', async () => {
    fetch.mockResponseOnce(JSON.stringify(gamesTestData));
    expect(await getGames()).toEqual(gamesTestData);
  });

  it('does not crash if it cannot get games', async () => {
    const originalError = console.error;

    fetch.mockReject(new Error('fake error message'));
    expect(await getGames()).toEqual(null);

    // tear down
    console.error = originalError;
  });

  it('gets one game normalized data', async () => {
    fetch.mockResponseOnce(JSON.stringify(gameTestData));
    const game = await getGame('dont-kill-her');
    expect(game).toEqual(normalizedGameTestData);
  });

  it('returns nothing when getting an error', async () => {
    fetch.mockReject(new Error());
    const game = await getGame('dont-kill-her');
    expect(game).toEqual(null);
  });

  it('simplifies the releases entry', () => {
    const expected = [
      [
        {
          year: 2020,
          date: '2020-04-14T02:00:00+02:00',
          id: '9e1f8365-4bf3-4189-bf33-c9ac6862dca7',
          platform: 'Mac',
        },
        {
          year: 2020,
          date: '2020-04-14T22:00:00+02:00',
          id: 'fake-id',
          platform: 'PC',
        },
      ],
    ];

    expect(getSimpleReleases(normalizedGameTestData.releases)).toEqual(
      expected
    );
  });
});
