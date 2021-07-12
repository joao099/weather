/* eslint-disable camelcase */
export interface DailyInterface {
  dt: number,
  sunrise: number,
  sunset: number,
  moonrise: number,
  moonset: number,
  moon_phase: number,
  temp: {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
  },
  feels_like: {
    day: number,
    night: number,
    eve: number,
    morn: number
  },
  pressure: number,
  humidity: number,
  dew_point: number,
  wind_speed: number,
  wind_deg: number,
  wind_gust: number,
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  clouds: number,
  pop: number,
  uvi: number
}

export interface CurrentInterface {
  dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: 0,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: [
      {
        id: number,
        main: string,
        description: string,
        icon: string
      }
    ]
}

export interface WeatherInterface {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: CurrentInterface,
  daily: DailyInterface[]
}
