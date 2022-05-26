import { Box, ChakraProvider, Divider, Heading, Text } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box m={16} height="80vh" width="100%">
        <Box mb={4}>
          <Heading>Hypertext</Heading>
          <Text>A text forward Lyra interface</Text>
        </Box>
        <Divider mb={4} width={500} />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}
