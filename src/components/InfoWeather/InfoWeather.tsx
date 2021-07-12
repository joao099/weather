import React, { memo } from 'react'
import { useRem } from 'responsive-native'

import {
  Container,
  Description,
  WeatherImage,
  DegreesCelsius,
  RowContainer,
  WaterIcon,
  WindIcon
} from './styles'
import { CurrentInterface } from '../../interfaces/WeatherInterface'

type Props = {
  currentWeatherData: CurrentInterface
}

const InfoWeather = ({ currentWeatherData }: Props) => {
  const currentTemperature = currentWeatherData?.temp
  const currentHumidity = currentWeatherData?.humidity
  const currentWeatherImage = currentWeatherData?.weather[0].icon
  let currentWeatherDescription = currentWeatherData?.weather[0]?.description
  let currentWindSpeed = currentWeatherData?.wind_speed

  const rem = useRem()

  // Tratamentos para transformar a velocidade do vento atual em KM/H
  const windSpeedToKilometersPerHour = (speed: number): number => parseFloat((speed * 3.6).toFixed(2))
  currentWindSpeed = windSpeedToKilometersPerHour(currentWindSpeed)

  // Tratamento para transformar a primeira string da em maísucula
  const firstLetterToUppercase = (value: string): string => value?.charAt(0).toUpperCase() + value?.slice(1)
  currentWeatherDescription = firstLetterToUppercase(currentWeatherDescription)

  // Url da imagem relacionada ao clima atual
  const weatherImageUrl = `http://openweathermap.org/img/wn/${currentWeatherImage}@2x.png`

  return (
    <Container>
      <WeatherImage source={{ uri: weatherImageUrl || '' }} />
      <Description>{currentWeatherDescription || ''}</Description>
      <DegreesCelsius>{currentTemperature || ''}°</DegreesCelsius>

      <RowContainer>
        <RowContainer
          marginRight={rem(1)}
        >
          <WindIcon
            name="wind"
            size={rem(1.2)}
          />
          <Description>{currentWindSpeed || ''} km/h</Description>
        </RowContainer>

        <RowContainer>
          <WaterIcon
            name="water-outline"
            size={rem(1.2)}
          />
          <Description>{currentHumidity || ''} %</Description>
        </RowContainer>
      </RowContainer>
    </Container>
  )
}

export default memo(InfoWeather)
