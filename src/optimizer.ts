// simple weighted sum model

//temp + wind + weather_desc + tide

interface PaddleOpportunity {
  temperature: number
  wind: number
  description: number
  tide: number
}

const weights: { [index: string]: number } = {
  temperature: 1,
  wind: 1,
  description: 1,
  tide: 1
}

export function calculate (opportunity: PaddleOpportunity): number {
  return Object.entries(opportunity).reduce(
    (score, [key, value]) => score + value * weights[key],
    0
  )
}
