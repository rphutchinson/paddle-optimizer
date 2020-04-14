import logger from './logger'
import { getWeather } from './data/weather'
import { Route, Weather } from './models'
import { getTide } from './data/tide'

const testRoute: Route = {
  name: 'Shem Creek',
  direction: 'NorthEast',
  latitude: 32.79329,
  longitude: -79.876702
}

async function getData () {
  const weather: Weather[] = await getWeather(testRoute)
  const tide = await getTide(testRoute)
  logger.info(weather)
  logger.info(tide)
}

getData()
