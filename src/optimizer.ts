// simple weighted sum model

import { Route, Tide } from './models'

interface PaddleOpportunity {
  temperature: number
  wind: number
  description: number
  tide: number
}

const weights: { [index: string]: number } = {
  temperature: 0.7,
  wind: 1,
  description: 0.6,
  tide: 0.8
}

export const _idealTemp = 80
const _maxTempVariation = 20
/**
 * Normalize temperature in degrees farenheigt based on variance from an "ideal" temperature
 * A temperature of exactly the ideal should receive a score of 100
 * @param temperature {number}
 */
export function _normalizeTemperature (temperature: number) {
  const difference = Math.abs(temperature - _idealTemp)
  return 100 - (100 / _maxTempVariation) * difference
}

const _maxIdealWind = 5
const _maxWindVariation = 10
/**
 * Wind is similar to temperature, but there is a range of relatively low wind speeds that are
 * all equally great. There's no real difference between 0-5mph so treat those all
 * equivalently
 * @param wind {number}
 */
export function _normalizeWind (wind: number) {
  if (wind <= _maxIdealWind) {
    return 100
  }

  const difference = wind - _maxIdealWind
  return 100 - (100 / _maxWindVariation) * difference
}

export function _normalizeDescription (description: string) {
  //need a list of possible descriptions, map each one to a rating
  const descriptionMap: { [index: string]: number } = {
    sunny: 100,
    'partly cloudy': 100,
    rain: 10,
    thunderstorms: -100
  }

  const defaultScore = 50
  return descriptionMap[description.toLowerCase()] || defaultScore
}

/**
 * Tides are route-dependent some tide types are good for some routes and bad for others.
 * Additionally the impact of the tides are variable in that some routes are affected more
 * than others by tidal factors.
 * @param route
 * @param tideType
 */
export function _normalizeTide (
  tideRatings: { [index: string]: number },
  tideType: string
) {
  const defaultScore = 50
  return tideRatings[tideType] || defaultScore
}

export function buildPaddleOpportunity (
  route: Route,
  temperature: number,
  wind: number,
  description: string,
  tide: string
): PaddleOpportunity {
  return {
    temperature: _normalizeTemperature(temperature),
    wind: _normalizeWind(wind),
    description: _normalizeDescription(description),
    tide: _normalizeTide(route.tideRatings, tide)
  }
}

export function calculate (opportunity: PaddleOpportunity): number {
  return Object.entries(opportunity).reduce(
    (score, [key, value]) => score + value * weights[key],
    0
  )
}
