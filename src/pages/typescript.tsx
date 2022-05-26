import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react'
// Lyra.js - you will need Market, Board, Strike types for this task
import Lyra, { Deployment, Market } from '@lyrafinance/lyra-js'
import { BigNumber, utils } from 'ethers'
import React, { useEffect, useState } from 'react'

// Format $USD into a string
const formatUSD = (usd: number): string => (isNaN(usd) ? `?` : `$${usd.toFixed(2)}`)

// Format an epoch timestamp into a string
const formatDate = (ts: number): string => {
  const date = new Date(ts * 1000)
  return date.toLocaleString(`default`, { month: `long`, day: `2-digit` })
}

// Converts a BigNumber to number (for rendering)
const fromBigNumber = (bn: BigNumber): number => parseFloat(utils.formatUnits(bn.toString(), 18))

// Converts a number to BigNumber (for SDK arguments)
const toBigNumber = (val: number): BigNumber => utils.parseEther(val.toString())

const lyra = new Lyra(Deployment.Kovan)

const MARKET_NAME = `ETH`

export default function Home() {
  const [market, setMarket] = useState<Market | null>(null)

  useEffect(() => {
    // Fetch the Market entity from Lyra.js
    lyra.market(MARKET_NAME).then(market => {
      setMarket(market)
    })
  }, [])

  const strikePrice: number | null = null
  const expiryTimestamp: number | null = null
  const spotPrice = market ? fromBigNumber(market.spotPrice) : null

  const isCall = strikePrice && spotPrice ? strikePrice > spotPrice : false

  if (!market || !spotPrice) {
    return <Spinner size="xl" />
  }

  const premium: number | null = null

  return (
    <>
      <Text mb={2}>
        {MARKET_NAME} is currently worth&nbsp;
        {formatUSD(spotPrice)}
      </Text>
      <Flex mb={4}>
        <Text>
          I think {MARKET_NAME} is going {isCall ? `up` : `down`} to&nbsp;
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
          Buy {MARKET_NAME} {strikePrice ? formatUSD(strikePrice) : '?'}&nbsp;
          {isCall ? `Call` : `Put`}
        </StatLabel>
        <StatNumber>{premium ? formatUSD(premium) : '?'}</StatNumber>
        <StatHelpText>Exp. {expiryTimestamp ? formatDate(expiryTimestamp) : '?'}</StatHelpText>
      </Stat>
    </>
  )
}
