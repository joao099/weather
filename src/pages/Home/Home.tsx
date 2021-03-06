import React, { useState, useEffect, useMemo } from 'react'
import { Platform, PermissionsAndroid, ActivityIndicator, RefreshControl } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

import InfoWeather from '../../components/InfoWeather'
import ListWeather from '../../components/ListWeather'
import Header from '../../components/Header'
import endPoints from '../../services/endPoints'
import { Container } from './styles'
import { useFetch } from '../../hooks/useFetch'
import { useSnackBar } from '../../hooks/useSnackBar'
import { GeolocationInterface } from '../../interfaces/GeolocationInterface'
import { WeatherInterface } from '../../interfaces/WeatherInterface'

const Home: React.FC = () => {
  const [currentLongitude, setCurrentLongitude] = useState('')
  const [currentLatitude, setCurrentLatitude] = useState('')
  const [shouldFetch, setShouldFetch] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  let titleHeader: string = ''
  let watchID: number
  let isLoading: boolean = true

  // Requisições a api de geolocalização do google e a openweather
  const { url: baseUrlGeocode } = endPoints.geocode
  const { url: baseUrlWeather } = endPoints.openWeather
  const urlGeolocation = baseUrlGeocode(currentLatitude, currentLongitude)
  const urlWeather = baseUrlWeather(currentLatitude, currentLongitude)
  const { data: adressData, error: adressError } = useFetch<GeolocationInterface>(shouldFetch ? urlGeolocation : null)
  const { data: weatherData, error: weatherError } = useFetch<WeatherInterface>(shouldFetch ? urlWeather : null)

  // Faz a solicitação de permissão de localização ao usuário na primeira renderização
  useEffect(() => {
    requestLocationPermission()
    return () => {
      Geolocation.clearWatch(watchID)
    }
  }, [])

  // Se já tenho a minha longitude e minha latitude, atualize a variável de estado shouldFetch para fazer a requisição
  useEffect(() => {
    if (currentLongitude && currentLatitude) setShouldFetch(true)
  }, [currentLongitude, currentLatitude])

  // Setá o título do Header
  if (adressData) {
    const locationName = `${adressData.results[1].address_components[1].short_name} - ${adressData.results[1].address_components[2].short_name}`
    titleHeader = locationName
  }

  // Se as duas requisições forem verdadeiras o loading recebe falso
  if (adressData && weatherData) {
    isLoading = false
  }

  // eslint-disable-next-line no-unused-vars
  const currentWeatherData = useMemo(() => {
    // Se os dados dos climas existir, a variável currentWeatherData receberá os dados do clima atual
    if (weatherData) {
      return weatherData.current
    }
  }, [weatherData])

  // Se houver erro na requisição de endereço
  if (adressError) {
    useSnackBar({
      title: 'Erro na requisição',
      backgroundColor: 'red'
    })
  }

  // Se houver erro na requisição de climas
  if (weatherError) {
    useSnackBar({
      title: 'Erro na requisição',
      backgroundColor: 'red'
    })
  }

  // Permissão de localização do usuário
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation()
      subscribeLocation()
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Para verificar, se a permissão for concedida
          getOneTimeLocation()
          subscribeLocation()
        } else {
          useSnackBar({
            title: 'Erro na permissão',
            backgroundColor: 'red'
          })
        }
      } catch (err) {
        useSnackBar({
          title: 'Erro na permissão',
          backgroundColor: 'red'
        })
      }
    }
  }

  // Pega a latitude e longitude do usuário
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      // Dará a você a localização atual
      (position) => {
        // obtendo a longitude do local
        const currentLongitude =
          JSON.stringify(position.coords.longitude)

        // obtendo o Latitude do local
        const currentLatitude =
          JSON.stringify(position.coords.latitude)

        // Setando o estado de longitude
        setCurrentLongitude(currentLongitude)

        // Setando o estado de Latitude
        setCurrentLatitude(currentLatitude)

        // Seta o loading do refresh pra falso
        setRefreshing(false)
      },
      (error) => {
        useSnackBar({
          title: 'Erro na permissão' + error,
          backgroundColor: 'red'
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000
      }
    )
  }

  // Adiciona um ouvinte a localização do usuário, caso mude, será atualizado a nova longitute e latitude
  const subscribeLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        // obtendo a longitude do local
        const currentLongitude =
          JSON.stringify(position.coords.longitude)

        // obtendo o Latitude do local
        const currentLatitude =
          JSON.stringify(position.coords.latitude)

        // Setando o estado de longitude
        setCurrentLongitude(currentLongitude)

        // Setando o estado de Latitude
        setCurrentLatitude(currentLatitude)
      },
      (error) => {
        useSnackBar({
          title: 'Erro na permissão' + error,
          backgroundColor: 'red'
        })
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    )
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getOneTimeLocation()
  }, [])

  return (
    <Container
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >

      {isLoading
        ? <ActivityIndicator size="large" color="#ec6e4c" />
        : (
        <>
          <Header titleHeader={titleHeader} />
          <InfoWeather
          currentWeatherData={currentWeatherData}
          />
          <ListWeather data={weatherData?.daily} />
        </>
          )
      }
    </Container>
  )
}

export default Home
