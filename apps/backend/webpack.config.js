const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin')
const { join } = require('path')
const isProd = process.env['NODE_ENV'] === 'production'
const isBuildOrmDs = process.env['NX_OPTS_TYPEORM_DATASOURCE_BUILD'] === 'true'

const outputDir = isBuildOrmDs ? 'typeorm-datasource' : 'apps'
const entryFile = isBuildOrmDs ? 'ormconfig.ts' : 'main.ts'

module.exports = {
  output: {
    path: join(__dirname, `../../dist/${outputDir}/backend`),
    libraryTarget: 'commonjs',
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: `./src/${entryFile}`,
      tsConfig: './tsconfig.app.json',
      optimization: false,
      outputHashing: 'none',
      ...(isProd
        ? {
            generatePackageJson: true,
          }
        : {}),

      transformers: [
        {
          name: '@nestjs/swagger/plugin',
          options: {
            dtoFileNameSuffix: ['.dto.ts', '.response.ts'],
          },
        },
      ],
    }),
  ],
}
