const EventEmmiter = require("events");

class Logger extends EventEmmiter {
  log(message) {
    console.log(message);

    this.emit("messagelogged", {id: 1, message, url: 'http://'});
  }
}

module.exports = Logger;
