const EventEmitter = require("node:events");

class Logger extends EventEmitter{
  log = (message) => {
    console.log(message);

    this.emit("messageLogged", { url: "https://", id: 1 });
  };
}

module.exports = Logger;
