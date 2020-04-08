import axios from 'axios'
import logger from '../logger'
import { Route, Weather, TemperatureUnit, Direction } from '../models'

const baseUrl = 'https://api.weather.gov'

interface Period {
  temperature: number
  temperatureUnit: string
  startTime: string
  endTime: string
  windSpeed: string
  windDirection: string
  shortForecast: string
}

interface WeatherApiResponse {
  properties: {
    periods: Period[]
  }
}

/*todo: this CANT be the best way to handle this in TypeScript. I just want to map one constrained
set of strings to another. Once I've learned the best way here will also handle the temperatureUnit
similarly*/
const directionMap = new Map<string, Direction>([
  ['N', 'North'],
  ['NE', 'NorthEast'],
  ['NW', 'NorthWest'],
  ['S', 'South'],
  ['SE', 'SouthEast'],
  ['SW', 'SouthWest'],
  ['E', 'East'],
  ['W', 'West']
])

/**
 * Data mapping between external Weather API model and internal model
 * @param destructured fields of a Period - part of Weather API response
 */
function mapWeatherApiResponseToWeather ({
  temperature,
  temperatureUnit,
  startTime,
  endTime,
  windSpeed,
  windDirection,
  shortForecast
}: Period): Weather {
  return {
    temperature,
    temperatureUnit: TemperatureUnit.Farenheit,
    startTime,
    endTime,
    windSpeed: Number.parseInt(windSpeed.replace(' mph', '')),
    windDirection: directionMap.get(windDirection) as Direction,
    description: shortForecast
  }
}

export async function getWeather ({
  latitude,
  longitude
}: Route): Promise<Weather[]> {
  const initialResponse = await axios
    .get(`${baseUrl}/points/${latitude},${longitude}`)
    .catch(err => logger.error(err))

  logger.debug(initialResponse)

  if (!initialResponse) {
    return Promise.reject(null)
  }

  const weatherResponse = await axios
    .get<WeatherApiResponse>(initialResponse.data.properties.forecastHourly)
    .catch(err => {
      logger.error(err)
      return null
    })

  if (!weatherResponse) {
    return Promise.reject(null)
  }

  return weatherResponse.data.properties.periods.map(
    mapWeatherApiResponseToWeather
  )
}
