import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, rgba(175,196,200) 0%, rgba(181,214,220) 100%)',
      },
      // p: {
      //   color: '#e2e2e4',
      // },
      // styles for the `a`
      // a: {
      //   color: 'teal.500',
      //   _hover: {
      //     textDecoration: 'underline',
      //   },
      // },
    },
  },
  colors: {
    second: '#969696',
    brand: '#B6EEF5',
    blackBorder: 'rgba(0, 0, 0, 0.4)',
    border: '#fff',
    bg: 'rgba(182, 238, 245, 0.2)',
    cardBg: 'rgba(172,218,226,1)',
    tagBg: '#B6EEF5',
    cellBg: '#ffffff',
  },
})
