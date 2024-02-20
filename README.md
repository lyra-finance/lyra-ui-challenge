# Instructions

This task involves building a simple text UI to help people buy calls and puts on Lyra.

Ask us any questions about the expected final product, and how options or Lyra's API works. We prefer thoughtful questions, planning and correctness over completeness.

<a href="https://imgur.com/HIiZFaS"><img src="https://i.imgur.com/HIiZFaS.gif" title="source: imgur.com" /></a>

## Dependencies

1. [React](https://reactjs.org/): A library for building user interfaces
2. [Chakra](https://chakra-ui.com/docs/components/overview): A simple component library
3. [Next.js](https://nextjs.org/): A simple framework for spinning up apps

## Important Notes

1. If the strike price is greater than the spot price (current ETH value), we expect the price to go up and should buy a call. If the strike is lower than spot, we expect the price to go down and should buy a put.

   The first videos of this [Khan Academy course](https://www.khanacademy.org/economics-finance-domain/core-finance/derivative-securities/put-call-options/v/american-call-options) provide a more detailed example.

2. Markets have many expiries, and expiries have many strikes.

# Setup

1. Clone and install the application

```
git clone https://github.com/lyra-finance/lyra-frontend-challenge.git
yarn install
```

2. Run the application

```
yarn dev
```

3. Complete the challenge. Edit `src/pages/index.ts` to complete the challenge, and watch `http://localhost:3000` for realtime updates.

# Lyra API Reference

We have included functions to call the necessary Lyra API endpoints to complete the challenge. These are wrapped as:

```
fetchAllCurrencies()
```

- Gets all active currencies on Lyra with their spot price

```
fetchInstruments(params)
```

- Gets all active instruments for a given `currency` and `type`

You can access the [API documentation](https://docs.lyra.finance/reference/overview) for more details on the request parameters and respective response body.
