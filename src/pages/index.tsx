import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stat,
  StatHelpText,
  StatLabel,
  Text,
} from '@chakra-ui/react'
import React from 'react'

export default function Home() {
  const currency: string | null = null
  const strikePrice: number | null = null
  const expiryTimestamp: number | null = null
  const spotPrice: number | null = null
  const isCall = false

  return (
    <>
      <Text mb={2}>
        <Menu>
          <MenuButton as={Button}>{currency ?? '?'}</MenuButton>
          <MenuList>
            <MenuItem>A</MenuItem>
            <MenuItem>B</MenuItem>
          </MenuList>
        </Menu>
        &nbsp;is currently worth&nbsp;
        {spotPrice ? formatUSD(spotPrice) : '?'}
      </Text>
      <Flex mb={4}>
        <Text>
          I think {currency ?? '?'} is going {isCall ? `up` : `down`} to&nbsp;
          <Menu>
            <MenuButton as={Button}>{strikePrice ? formatUSD(strikePrice) : `?`}</MenuButton>
            <MenuList>
              <MenuItem>A</MenuItem>
              <MenuItem>B</MenuItem>
              <MenuItem>C</MenuItem>
            </MenuList>
          </Menu>
          &nbsp;...
        </Text>
      </Flex>
      <Divider mb={4} width={500} />
      <Stat sx={{ border: `1px solid lightgray`, borderRadius: `16px`, width: 250 }} p={4}>
        <StatLabel>
          Buy {currency ?? '?'} {strikePrice ? formatUSD(strikePrice) : '?'}&nbsp;
          {isCall ? `Call` : `Put`}
        </StatLabel>
        <StatHelpText>Expires {expiryTimestamp ? formatDate(expiryTimestamp) : '?'}</StatHelpText>
      </Stat>
    </>
  )
}

// Format $USD into a string
const formatUSD = (usd: number): string => (isNaN(usd) ? `?` : `$${usd.toFixed(2)}`)

// Format an epoch timestamp into a string
const formatDate = (ts: number): string => {
  const date = new Date(ts * 1000)
  return date.toLocaleString(`default`, { month: `long`, day: `2-digit` })
}
