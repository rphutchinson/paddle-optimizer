import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import logger from '../logger'
import { getTide, baseUri } from './tide'
import { mockResponse } from '../testData/tideData'
import { Route } from '../models'

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3)
})

const testRoute: Route = {
  name: 'Shem Creek',
  direction: 'NorthEast',
  latitude: 32.79329,
  longitude: -79.876702
}

test('happy path call', async () => {
  const mock = new MockAdapter(axios)
  mock.onGet(baseUri).reply(200, mockResponse)
  const result = await getTide(testRoute)
  //logger.info(result)
  expect(result).toBeDefined()
})
