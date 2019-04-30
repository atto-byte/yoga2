// Borrowed from vue-cli
import chalk from 'chalk'
import readline from 'readline'
let logLevel = 0

export function setLogLevel(level: number){
  logLevel=level
}

function format(label: string, msg: string) {
  return msg
    .split('\n')
    .map((line, i) => {
      return i === 0
        ? `${label} ${line}`
        : String.prototype.padStart(chalk.reset(label).length, line)
    })
    .join('\n')
}

function chalkTag(msg: string) {
  return chalk.bgBlackBright.white.dim(` ${msg} `)
}

export function log(msg: string = '', tag?: string, level: number = 3) {
  if(level > logLevel) return
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg)
}

export function info(msg: string, tag?: string, level: number = 2) {
  if(level > logLevel) return
  console.log(
    format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg),
  )
}

export function done(msg: string, tag?: string, level: number = 2) {
  if(level > logLevel) return
  console.log(
    format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg),
  )
}

export function warn(msg: string, tag?: string, level: number = 1) {
  if(level > logLevel) return
  console.warn(
    format(
      chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''),
      chalk.yellow(msg),
    ),
  )
}

export function error(msg: string, tag?: string, level: number = 0) {
  if(level > logLevel) return
  console.error(
    format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), msg),
  )
}

export function clearConsole(title?: string) {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows || 0)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    if (title) {
      console.log(title)
    }
  }
}
