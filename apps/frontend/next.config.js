//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next')
const API_PATH = process.env['API_PATH']
const BACKEND_URL = process.env['BACKEND_URL']

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  rewrites: async () => [
    {
      source: `${API_PATH}/:path*`,
      destination: `${BACKEND_URL}${API_PATH}/:path*`,
    },
  ],

  redirects: async () => [
    {
      source: '/',
      destination: '/home',
      permanent: true,
    },
  ],
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
]

module.exports = composePlugins(...plugins)(nextConfig)
