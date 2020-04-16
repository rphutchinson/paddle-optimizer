import { Route, TideType } from '../models'

export const shemCreekUpstream: Route = {
  name: 'Shem Creek Upstream',
  direction: 'NorthEast',
  latitude: 32.79329,
  longitude: -79.876702,
  tideRatings: {
    low: 50,
    high: 100,
    rising: 80,
    falling: 70
  }
}
