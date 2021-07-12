import styled from 'styled-components/native'

export const Container = styled.View`
  height: 10%;
  align-items: flex-end;
  flex-direction: row;
  padding: 0 ${({ theme }) => theme.screen.rem(0.5)}px;
`

export const ContainerContent = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const LocationText = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1.2)}px;
  margin-left: ${({ theme }) => theme.screen.rem(1)}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
`
