import {
  buildPaddleOpportunity,
  calculate,
  _idealTemp,
  _normalizeTemperature,
  _normalizeWind,
  _normalizeTide
} from './optimizer'
import { shemCreekUpstream } from './testData/testRoutes'
import logger from './logger'

describe('optimizer', () => {
  test('end to end', () => {
    const result = calculate(
      buildPaddleOpportunity(shemCreekUpstream, 85, 4, 'Sunny', 'falling')
    )
    expect(result).toBe(268.5)
  })

  test('weighted sum calculation', () => {
    const result = calculate({
      temperature: 100,
      description: 100,
      tide: 100,
      wind: 100
    })
    expect(result).toBe(310)
  })

  describe('build Paddle Opportunity', () => {
    test('build expected opportunity', () => {
      const result = buildPaddleOpportunity(
        shemCreekUpstream,
        85,
        4,
        'Sunny',
        'falling'
      )
      expect(result).toBeDefined()
    })
  })

  describe('temperature calculations', () => {
    test('perfect temperature', () => {
      const result = _normalizeTemperature(_idealTemp)
      expect(result).toBe(100)
    })

    test('terrible temperature', () => {
      const result = _normalizeTemperature(30)
      expect(result).toBeLessThan(0)
    })

    test('reasonable temperature', () => {
      const result = _normalizeTemperature(_idealTemp + 5)
      expect(result).toBeLessThan(100)
      expect(result).toBeGreaterThan(50)
      expect(result).toBe(75)
    })
  })

  describe('wind calculations', () => {
    test('no wind', () => {
      const result = _normalizeWind(0)
      expect(result).toBe(100)
    })

    test('light wind', () => {
      const result = _normalizeWind(3)
      expect(result).toBe(100)
    })

    test('medium wind', () => {
      const result = _normalizeWind(10)
      expect(result).toBe(50)
    })

    test('high wind', () => {
      const result = _normalizeWind(20)
      expect(result).toBeLessThan(0)
    })
  })

  describe('tide calculations', () => {
    const { tideRatings } = shemCreekUpstream
    test('tide rating is defined on the route', () => {
      const result = _normalizeTide(tideRatings, 'high')
      expect(result).toBe(shemCreekUpstream.tideRatings['high'])
    })

    test('tide rating is not defined on the route', () => {
      const result = _normalizeTide(tideRatings, 'junk')
      expect(result).toBe(50)
    })
  })
})
