const fs = require("fs");
const fsPromises = require('fs').promises
const path = require('path');
const { format } = require('date-fns')
const {v4:uuid} = require('uuid')

const logEvents = async (messege, logFileName) => {
  const dateTime = format(newDate(), 'yyyyMMdd\tHH:mm:ss')
  const logItem = `${dateTime}\t${uuid}\t${messege}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '../', 'logs'))) {
      await fsPromises.mkdir(
        path.join(__dirname, "..", "logs", logFileName),
        logItem
      );
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (e) {
    console.log(e)
  }
}


const logger = (req, res, next) => {

  const { method, path, headers , url } = req
  logEvents(`${method}\t${url}\t${headers.origin}`, 'reqLog.log')
  console.log(`${method}\t${path}`)

  next()
}



module.exports = {logEvents , logger}