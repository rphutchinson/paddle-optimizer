import axios from 'axios'
import { Location, Tide } from '../models'
import logger from '../logger'
import { mockResponse } from '../testData/tideData'

const apiKey = process.env.WORLD_TIDES_API_KEY as string
export const baseUri = 'https://www.worldtides.info/api'

export async function getTide ({
  longitude,
  latitude
}: Location): Promise<Tide[]> {
  const params = {
    extremes: true,
    key: apiKey,
    lat: latitude,
    lon: longitude
  }

  const result = await axios.get(baseUri, { params })
  logger.info(result)
  const {
    data: { extremes }
  } = result
  logger.info(extremes)

  return extremes.map((extreme: any) => ({
    height: extreme.height,
    type: extreme.type,
    date: extreme.dt
  }))
}
