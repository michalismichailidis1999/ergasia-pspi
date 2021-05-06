const util = require("util")
const db = require("../config/db")

const getAsyncData = util.promisify(db.query).bind(db);

module.exports = {getAsyncData}