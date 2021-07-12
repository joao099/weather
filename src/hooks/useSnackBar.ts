import Snackbar from 'react-native-snackbar'

type Params = {
  title: string,
  backgroundColor?: string,
  textColor?: string
}

export const useSnackBar = ({ title, backgroundColor, textColor }: Params) => {
  return Snackbar.show({
    text: title || '',
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: backgroundColor || '#000',
    textColor: textColor || '#fff'
  })
}
