//todo: look into https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types for maybe a better way to define this
export type Direction =
  | 'North'
  | 'NorthEast'
  | 'NorthWest'
  | 'South'
  | 'SouthEast'
  | 'SouthWest'
  | 'East'
  | 'West'

export type TideType = 'High' | 'Low'

export enum TemperatureUnit {
  Farenheit = 'F',
  Celsius = 'C'
}

export interface Weather {
  temperature: number
  temperatureUnit: TemperatureUnit
  startTime: string
  endTime: string
  // todo: do I need to average the times to get to a specific point in time?
  windSpeed: number
  windDirection: Direction
  description: string
}

export interface Tide {
  height: number
  type: TideType
  time: string
}

export interface Location {
  latitude: number
  longitude: number
}

export interface Route extends Location {
  name: string
  direction: Direction
  rating?: number
  tideRatings: {
    [index: string]: number
  }
}
