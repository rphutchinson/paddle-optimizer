import chalk from 'chalk'

if (process.env.NODE_ENV === 'development') {
  console.log(
    chalk.black.bgGreen.bold(
      '========= Loading Environment from .env =========='
    )
  )
  require('dotenv').config({
    path: require('find-config')('.env', { cwd: __dirname })
  })
}

require('./main')
