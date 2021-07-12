import React, { useCallback, memo } from 'react'
import { format } from 'date-fns'

import { Container, Day, MiniIcon, Temperature } from './styles'
import { DailyInterface } from '../../interfaces/WeatherInterface'
import endPoints from '../../services/endPoints'
import useStore from '../../store'

type CardWeatherProps = {
  item: DailyInterface
}

const CardWeather = ({ item }: CardWeatherProps) => {
  const setDailyData = useStore(useCallback(state => state.setDailyData, []))
  const removeAllDailyData = useStore(useCallback(state => state.removeAllDailyData, []))

  const { urlImage } = endPoints.openWeather

  // Data Formatada
  const dateFormated = format(new Date(item.dt * 1000), 'dd/MM')
  const currentDate = format(new Date(), 'dd/MM')
  const isCurrentDate = currentDate === dateFormated

  const imageUrl = urlImage(item.weather[0].icon)
  return (
    <Container
      onPress={isCurrentDate ? removeAllDailyData : () => setDailyData(item)} // se o usuário clicar no card da data atual será removido todas as informações do dayliData afetando o comportamento de renderização das informações no componente InfoWeather
    >
      <Day>{isCurrentDate ? 'Hoje' : dateFormated}</Day>
      <MiniIcon
        source={{ uri: imageUrl }}
      />
      <Temperature>{item.temp.min}°</Temperature>
      <Temperature>-</Temperature>
      <Temperature>{item.temp.max}°</Temperature>
    </Container>
  )
}

export default memo(CardWeather)
