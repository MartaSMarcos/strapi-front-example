/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        ref: true,
                        svgo: true,
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {
                                            mergePaths: false,
                                            cleanupIds: false,
                                            collapseGroups: false,
                                        },
                                    },
                                },
                                {
                                    name: 'removeDimensions',
                                    params: {},
                                },
                            ],
                        },
                    },
                },
            ],
        })
        return config
    },
    //Avoiding CORS issues
    async rewrites() {
        return [
            {
                source: '/api/v1/:slug*',
                destination: `${process.env.BACKEND_API_URL}/:slug*`,
            },
        ]
    },
}

module.exports = nextConfig
