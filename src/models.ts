export type Direction =
  | 'North'
  | 'NorthEast'
  | 'NorthWest'
  | 'South'
  | 'SouthEast'
  | 'SouthWest'
  | 'East'
  | 'West'

export enum TemperatureUnit {
  Farenheit = 'F',
  Celsius = 'C'
}

export interface Weather {
  temperature: number
  temperatureUnit: TemperatureUnit
  startTime: string
  endTime: string
  windSpeed: number
  windDirection: Direction
  description: string
}

export interface Route {
  name: string
  direction: Direction
  latitude: number
  longitude: number
  rating?: number
}
