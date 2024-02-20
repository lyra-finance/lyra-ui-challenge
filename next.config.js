module.exports = {
  reactStrictMode: true,
  async rewrites() {
    // TODO: @earthtojake remove when CORS is setup in orderbook
    return {
      beforeFiles: [
        {
          source: '/api/orderbook/:path*',
          destination: `https://api.lyra.finance/:path*`,
        },
      ],
    }
  },
}
