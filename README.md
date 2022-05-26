# Instructions

This challenge involves building a simple text UI to quote buying ETH calls and puts on Lyra.

## Dependencies
1. [React](https://reactjs.org/): A library for building user interfaces
2. [Lyra.js](https://www.npmjs.com/package/@lyrafinance/lyra-js): An SDK to interact with Lyra's smart contracts on our test network 
3. [Chakra](https://chakra-ui.com/docs/components/overview): A simple component library
4. [Next.js](https://nextjs.org/): A simple framework for spinning up apps

## Notes
1. You can ask us any questions about how options or the Lyra SDK works.
2. You'll need `lyra.market` to get market data (which includes strike and expiry information) and `lyra.quote` to quote option prices from the SDK.
3. You'll need `Text` and `Menu*` components from Chakra.
4. It's better to plan and provide a thoughtful implementation than to complete the entire task. 

## Lyra.js

This line initializes our SDK with a connection to Kovan, Ethereum's test network
```
const lyra = new Lyra(Deployment.Kovan)
```

To fetch a market, you can make an async request by market name (e.g. "ETH")
```
const market = lyra.market('ETH')
```

To get expiries (boards) for a market, use the boards edge from market
```
const boards = market.boards()
```

To get strikes for a board, use the strikes edge from board
```
const strikes = board.strikes()
```

To quote an option premium, use the quote edge from strike
```
const isCall = true // or false
const isBuy = true // always true for this exercise
const size = toBigNumber(1.0) // our SDK uses BigNumber format
const quote = strike.quote(isCall, isBuy, size)
```


# Setup

Clone and install the application

```
git clone https://github.com/lyra-finance/lyra-frontend-challenge.git
yarn install
yarn dev
```

## For JavaScript

Open `src/pages/javascript`

Watch `http://localhost:3000/javascript`

## For TypeScript

Open `src/pages/typescript`

Watch `http://localhost:3000/typescript`

## 
