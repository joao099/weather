import React from 'react'

import { Container, Search } from './styles'

const Header: React.FC = () => {
  return (
    <Container>
      <Search value="" placeholder="Pesquise um local" />
    </Container>
  )
}

export default Header
