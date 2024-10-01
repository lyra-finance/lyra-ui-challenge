'use client'

import { Box, ChakraProvider, Divider, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Box m={16} height="80vh" width="100%">
            <Box mb={4}>
              <Heading>Hypertext</Heading>
              <Text>A text forward Lyra interface</Text>
            </Box>
            <Divider mb={4} width={500} />
            {children}
          </Box>
        </ChakraProvider>
      </body>
    </html>
  )
}
