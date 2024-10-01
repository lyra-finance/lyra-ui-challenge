module.exports = {
  reactStrictMode: true,
  async rewrites() {
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
