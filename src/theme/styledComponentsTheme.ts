import { Dimensions } from 'react-native'

export const colors = {
  base: {
    white: '#FFFFFF',
    black: '#000000',
  },
  gray: '#A8A8A9',
  red: '#F83758'
  
}

export const windowWidth = Dimensions.get('window').width

const defaultSpace = 4

const theme = {
  colors,
  windowWidth,
  spaces: (space: number) => `${space * defaultSpace}px`,
}

export default theme
