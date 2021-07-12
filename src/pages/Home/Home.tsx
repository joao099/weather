import React, { useState, useEffect } from 'react'
import { Platform, PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

import Header from '../../components/Header'
import endPoints from '../../services/endPoints'
import { Container } from './styles'
import { useFetch } from '../../hooks/useFetch'
import { GeolocationInterface } from '../../interfaces/GeolocationInterface'
// import InfoWeather from '../../components/InfoWeather'

const Home: React.FC = () => {
  const [currentLongitude, setCurrentLongitude] = useState('')
  const [currentLatitude, setCurrentLatitude] = useState('')
  const [shouldFetch, setShouldFetch] = useState(false)

  const { url, apiKey } = endPoints.geocode
  const { data: adressData } = useFetch<GeolocationInterface>(shouldFetch ? `${url}?address=${currentLatitude},${currentLongitude}&key=${apiKey}` : null)

  let titleHeader: string = ''
  let watchID: number

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
          console.log('falhou')
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }

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
      },
      (error) => {
        console.log('entrou erro', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000
      }
    )
  }

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
        console.log('error', error)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    )
  }

  return (
    <Container>
      <Header titleHeader={titleHeader} />
      {/* <InfoWeather /> */}

      {/* <ContentContainer>
        <HorizontalContainer>
          <MoistureContainer>
            <MoistureImage />
            <MoistureDescription></MoistureDescription>
          </MoistureContainer>

          <WeatherDescription></WeatherDescription>

          <WindContainer>
            <WindImage />
            <WindDescription></WindDescription>
          </WindContainer>
        </HorizontalContainer>

        <ListHorizontal>
          <CardsWeather />
        </ListHorizontal>
      </ContentContainer> */}
    </Container>
  )
}

export default Home
