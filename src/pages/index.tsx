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
import { BigNumber, utils } from 'ethers'
import React, { useEffect, useState } from 'react'

import fetchAllCurrencies from '@/api/fetchAllCurrencies'
import fetchInstruments from '@/api/fetchInstruments'
import { CurrencyResponseSchema } from '@/api/types/public.get_all_currencies'
import { InstrumentPublicResponseSchema } from '@/api/types/public.get_instruments'

const CURRENCY = 'ETH'

export default function Home() {
  const [currencies, setCurrencies] = useState<CurrencyResponseSchema[]>([])
  const ethCurrency = currencies.find(c => c.currency === CURRENCY)
  const [instruments, setInstruments] = useState<InstrumentPublicResponseSchema[]>([])
  useEffect(() => {
    fetchAllCurrencies().then(c => setCurrencies(c.result))
    // Fetch ETH instruments from Lyra API
    fetchInstruments({ currency: CURRENCY, expired: false, instrument_type: 'option' }).then(r =>
      setInstruments(r.result)
    )
  }, [])

  const strikePrice: number | null = null
  const expiryTimestamp: number | null = null
  const spotPrice = ethCurrency ? +ethCurrency.spot_price : null

  const isCall = strikePrice && spotPrice ? strikePrice > spotPrice : false

  if (!ethCurrency || !spotPrice) {
    return <Spinner size="xl" />
  }

  const premium: number | null = null

  return (
    <>
      <Text mb={2}>
        {CURRENCY} is currently worth&nbsp;
        {formatUSD(spotPrice)}
      </Text>
      <Flex mb={4}>
        <Text>
          I think {CURRENCY} is going {isCall ? `up` : `down`} to&nbsp;
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
          Buy {CURRENCY} {strikePrice ? formatUSD(strikePrice) : '?'}&nbsp;
          {isCall ? `Call` : `Put`}
        </StatLabel>
        <StatNumber>Premium: {premium ? formatUSD(premium) : '?'}</StatNumber>
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

// Converts a BigNumber to number (for rendering)
const fromBigNumber = (bn: BigNumber): number => parseFloat(utils.formatUnits(bn.toString(), 18))
