import React from 'react'
import { FlatList } from 'react-native'

import CardWeather from '../CardWeather'
import { DailyInterface } from '../../interfaces/WeatherInterface'

type ListWeatherProps = {
  data: DailyInterface[]
}

const ListWeather = ({ data }: ListWeatherProps) => {
  // Se data não existe, não faça nada
  if (!data) return null

  const renderItem = ({ item }) => <CardWeather item={item} />

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item?.dt.toString()}
    />
  )
}

export default ListWeather
