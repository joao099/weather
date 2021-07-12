/* eslint-disable import/no-named-default */
import styled from 'styled-components/native'
import { default as IonIcons } from 'react-native-vector-icons/Ionicons'
import { default as FeatherIcons } from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable'

export const Container = styled(Animatable.View)`
  align-items: center;
`

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
`

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1)}px;
  color: ${({ theme }) => theme.colors.white};
`

export const DegreesCelsius = styled.Text`
  font-size: ${({ theme, fontSize }) => fontSize ? theme.screen.rem(fontSize) : theme.screen.rem(2.5)}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
`

export const LittleText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
`

export const WeatherImage = styled.Image`
  height: ${({ theme }) => theme.screen.rem(13)}px;
  width: ${({ theme }) => theme.screen.rem(13)}px;
`

export const WaterIcon = styled(IonIcons)`
  height: 20px;
  width: 20px;
  color: ${({ theme }) => theme.colors.white};
  margin: 0 ${({ theme }) => theme.screen.rem(0.5)}px 0 0;
`

export const WindIcon = styled(FeatherIcons)`
  height: 20px;
  width: 20px;
  color: ${({ theme }) => theme.colors.white};
  margin: 0 ${({ theme }) => theme.screen.rem(0.5)}px 0 0;
`
