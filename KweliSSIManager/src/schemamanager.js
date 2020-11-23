const indy       = require('indy-sdk');
const log        = console.log;
const config     = require('../config/local.env.json');
const util       = require('../config/util');
const colors     = require('../config/colors');
const indyerr    = require('../config/indyerr.js');

let schemaDSCert = {
  'name': 'Data Science Certificate @iLabAfrica 2020',
  'version': '0.1',
  'attributes': '["name", "startdate", "enddate", "grade", "teacher", "director"]'
}

async function createTestSchema(sWallet, req, res) {
  log('[schemamanager-createTestSchema]');
  //log(sWallet);
  //log(sWallet.dids.get('steward')); // When using a map, you must use the "get" method

  if ( sWallet == null ) {
    res.json({message: 'test', value: 0});
  } else {
    res.json({message: 'test', value: 1});
  }
  const [issuer_schema_id, issuer_schema_json] = await indy.issuerCreateSchema(
    sWallet.dids.get('steward'),
    schemaDSCert['name'],
    schemaDSCert['version'],
    schemaDSCert['attributes']
  )

  log('Issuer schema id -> ' + issuer_schema_id)
  log('Issuer schema json \n\t')
  log(issuer_schema_json)
  /**/
}


module.exports = {
  createTestSchema
};