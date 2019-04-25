import GameSavingLoader from '../src/js/main';
import readGameSaving from '../src/js/readGameSaving';


jest.mock('../src/js/readGameSaving.js');

beforeEach(() => {
  jest.resetAllMocks();
});

test('Загрузка промиса', async () => {
  const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
  const buffer = new ArrayBuffer(data.length * 2);
  const bufferView = new Uint16Array(buffer);
  for (let i = 0; i < data.length; i++) {
    bufferView[i] = data.charCodeAt(i);
  }

  readGameSaving.mockReturnValue(buffer);

  expect.assertions(1);
  const expected = {
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1, name: 'Hitman', level: 10, points: 2000,
    },
  };
  const gameSavingLoader = new GameSavingLoader();
  const load = gameSavingLoader.load();
  const received = await load();
  expect(received).toEqual(expected);
});

test('Ошибка промиса', async () => {
  const data = '{"id":9,created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
  const buffer = new ArrayBuffer(data.length * 2);
  const bufferView = new Uint16Array(buffer);
  for (let i = 0; i < data.length; i++) {
    bufferView[i] = data.charCodeAt(i);
  }
  readGameSaving.mockReturnValue(buffer);
  expect.assertions(1);
  const expected = 'Ошибка';
  const gameSavingLoader = new GameSavingLoader();
  const load = gameSavingLoader.load();
  const received = await load();
  expect(received).toEqual(expected);
});
