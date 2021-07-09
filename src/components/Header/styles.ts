import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Fontisto'
import { Searchbar } from 'react-native-paper'

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.screen.rem(1.5)}px;
`

export const SearchIcon = styled(Icon)`
  color: #696969;
`

export const Search = styled(Searchbar)`
  width: 100%;
`
