import React from 'react'

import { Container } from './styles'
import Header from '../../components/Header'

const Home: React.FC = () => {
  return (
    <Container>
      <Header />

      {/* <WhiteContainer>
        <Title></Title>
        <Description></Description>
        <WeatherImage />
      </WhiteContainer>

      <ContentContainer>
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
