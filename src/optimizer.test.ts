import { calculate } from './optimizer'
import { AssertionError } from 'assert'

describe('optimizer', () => {
  test('weighted sum calculation', () => {
    const result = calculate({
      temperature: 100,
      description: 100,
      tide: 100,
      wind: 100
    })
    expect(result).toBe(400)
  })
})
