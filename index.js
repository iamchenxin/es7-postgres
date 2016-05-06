
const pg = require('./lib/pg.js');
const literals = require('tagged-literals');
module.exports = {
  pgWrapper:pg.pgWrapper,
  SQL:literals.SQL,
  inst:literals.inst
};
