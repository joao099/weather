import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  width: ${({ theme }) => theme.screen.rem(6)}px;
  background-color: rgba(54, 54, 54, .5);
  padding: 5px 5px 10px 5px;
  margin: ${({ theme }) => theme.screen.rem(3)}px 5px;
  border-radius: 5px;
  align-items: center;
  flex: 1;
`
export const Day = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  flex: 1;
`

export const Temperature = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: ${({ theme }) => theme.screen.rem(1)}px;
  flex: 1;
`

export const MiniIcon = styled.Image`
  height: 100px;
  width: 100px;
  flex: 1;
`
