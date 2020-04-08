import logger from './logger'
import { getWeather } from './data/weather'
import { Direction, Route, Weather } from './models'

const testRoute: Route = {
  name: 'Shem Creek',
  direction: 'NorthEast',
  latitude: 32.79329,
  longitude: -79.876702
}

async function getData () {
  const weather: Weather[] = await getWeather(testRoute)
  logger.info(weather)
}

getData()
