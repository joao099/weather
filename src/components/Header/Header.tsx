import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useRem } from 'responsive-native'
import { ThemeContext } from 'styled-components'

import { Container, LocationText, ContainerContent } from './styles'

type HeaderProps = {
  titleHeader: string
}

const Header = ({ titleHeader }: HeaderProps) => {
  const { colors } = useContext(ThemeContext)

  const rem = useRem()

  return (
    <Container>
      <ContainerContent>
        <Icon
          name="location-sharp"
          size={rem(1.5)}
          color={colors.darkBlue}
        />
        <LocationText>{titleHeader}</LocationText>
      </ContainerContent>
    </Container>
  )
}

export default Header
