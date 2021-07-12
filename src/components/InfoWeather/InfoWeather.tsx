import React, { memo } from 'react'
import { useRem } from 'responsive-native'

import {
  Container,
  Description,
  WeatherImage,
  DegreesCelsius,
  RowContainer,
  WaterIcon,
  WindIcon,
  LittleText
} from './styles'
import { CurrentInterface } from '../../interfaces/WeatherInterface'
import endPoints from '../../services/endPoints'
import useStore from '../../store'

type Props = {
  currentWeatherData: CurrentInterface
}

const InfoWeather = ({ currentWeatherData }: Props) => {
  // Store
  const dailyData = useStore(state => state.dailyData)

  // Variáveis relacionado ao clima ATUAL para melhor nomeclatura
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

  // Verificações
  const dailyWeatherExists = dailyData?.weather // verifica se o clima do clima selecionado pelo usuário existe
  const dailyTemperature = dailyData?.temp // pega a temperatura do dia selecionado pelo usuário
  const dailyWindSpeed = dailyData?.wind_speed // pega a velocidade do vento do dia selecionado pelo usuário
  const dailyHumidity = dailyData?.humidity // pega a umidade do dia selecionado pelo usuário
  let dailyWeatherDescription = dailyWeatherExists ? dailyData?.weather[0].description : '' // se o clima foi selecionado pelo usuário use a descrição do dia selecionado

  dailyWeatherDescription = firstLetterToUppercase(dailyWeatherDescription)

  // Url da imagem relacionada ao clima atual ou se o usuário clicar pra detalhar um dia específico, incluirá o ícone do dia em específico
  const dailyIcon = dailyWeatherExists ? dailyData.weather[0].icon : ''
  const weatherImageUrl = endPoints.openWeather.urlImage(dailyWeatherExists ? dailyIcon : currentWeatherImage)

  return (
    <Container
      animation="bounceInRight"
      duration={2000}
      useNativeDriver
    >
      <WeatherImage source={{ uri: weatherImageUrl || '' }} />
      <Description>{dailyWeatherDescription || currentWeatherDescription || ''}</Description>
      {dailyTemperature?.min && <LittleText style={{ color: '#fff' }}>min<DegreesCelsius>{dailyTemperature?.min}°</DegreesCelsius></LittleText>}
      {dailyTemperature?.min && <LittleText style={{ color: '#fff' }}>max<DegreesCelsius>{dailyTemperature?.max}°</DegreesCelsius></LittleText>}
      {!dailyTemperature?.min && <LittleText>atual<DegreesCelsius fontSize={4} >{currentTemperature || ''}°</DegreesCelsius></LittleText>}
      <RowContainer>
        <RowContainer
          marginRight={rem(1)}
        >
          <WindIcon
            name="wind"
            size={rem(1.2)}
          />
          <Description>{dailyWindSpeed || currentWindSpeed || ''} km/h</Description>
        </RowContainer>

        <RowContainer>
          <WaterIcon
            name="water-outline"
            size={rem(1.2)}
          />
          <Description>{dailyHumidity || currentHumidity || ''} %</Description>
        </RowContainer>
      </RowContainer>
    </Container>
  )
}

export default memo(InfoWeather)
