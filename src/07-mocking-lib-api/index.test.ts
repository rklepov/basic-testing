import { expect, jest, test } from '@jest/globals';
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

jest.mock('axios');

function mockAxiosCreate(data: unknown = []) {
  const get = jest.fn<typeof axios.get>().mockResolvedValue({ data });
  (axios.create as jest.Mock).mockReturnValue({
    get,
  });
  return get;
}

describe('throttledGetDataFromApi', () => {
  const relativePath = '/users';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    mockAxiosCreate();

    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const get = mockAxiosCreate();

    await throttledGetDataFromApi(relativePath);
    expect(get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const data = [{ user: 'user1' }, { user: 'user2' }];

    mockAxiosCreate(data);

    const response = await throttledGetDataFromApi(relativePath);
    expect(response).toBe(data);
  });
});
