import React from 'react'
import { FlatList } from 'react-native'
import * as Animatable from 'react-native-animatable'

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
    <Animatable.View
      animation="bounceInUp"
      useNativeDriver
      duration={2000}
    >
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item?.dt.toString()}
      />
    </Animatable.View>
  )
}

export default ListWeather
