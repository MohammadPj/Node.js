const lion = require("lion-lib-21996");
const fs = require('fs'); 
const os = require('os'); 
const http = require('http')

// OS
console.log('Total Memory',Number(os.totalmem()).toLocaleString() );
console.log('Free Memory',Number(os.freemem()).toLocaleString());


// FS
// const files = fs.readdirSync('./')
// console.log(files);
fs.readdir('./', (err, files) => {
  if(err) console.log('Error', err);
  else console.log('Files', files);
})


// EventEmmiter
const Logger = require ('./logger')
const logger = new Logger()
logger.on('messagelogged', (arg) => {
  console.log('Listener Called', arg);
})
logger.log('salam')

const sum = lion.add(10,20)
console.log("sum", sum)