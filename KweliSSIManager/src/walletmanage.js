/******************************************************************************
 * General note: 
 *   When using the [express] library res.json is a return function.
 ******************************************************************************/

const log        = console.log;
const indy       = require('indy-sdk')
const util       = require('../config/util');
const config     = require('../config/local.env.json');
const colors     = require('../config/colors');
const indyerr    = require('../config/indyerr.js');
const VybeWallet = require('../models/VybeWallet');

let loggedIn     = false;
let poolHandle   = null;
let endorserWallet = {};


function logValue() {
  log(colors.CYAN, ...arguments, colors.NONE)
}

/**
 * 
 * @param {*} resp 
 */
function handleIndyCreatePLC(resp) {
  log('\t a. Created Pool Ledger Config');
}

/**
 * 
 */
function handleIndyCreateWallet() {
  log('\t a. Wallet created')
}

function handleIndySetPV(resp) {
  log( "Protocol version set --> " + resp);
  return new Promise(function(resolve, reject) {
    if ( resp == null ) {
      reject(new Error("not good"))
    } else {
      resolve(resp);
    }
  });
}

function handleIndyError(err) {
  log('[handleIndyError]')
  let msg = ""
  if ( err.indyCode == indyerr.PoolLedgerConfigAlreadyExistsError ) {
    log("    a. [Jive sucka] The pool ledger configuration already exists, moving on.");
  } else if ( err.indyCode == indyerr.WalletAlreadyExistsError ) {
    msg = "    a. [Jive sucka] The wallet already exists, moving on." 
    log('\t' + msg);
    //res.json({message: msg});
  } else if ( err.indyCode == indyerr.PoolLedgerNotCreatedError ) {
    log("\ta. [Turkey snip] The code could not create the pool ledger.")
  } else if ( err.message == indyerr.WalletItemNotFound ) {
    log('\tIn the elseif ' + JSON.stringify(err) + ' description: Wallet item not found')
  } else {
    log('\t' + JSON.stringify(err))
    //log('\t[' + err.indyName + '-' + err.indyCode +  '] ==> ' + err.indyMessage);
  }
}

/**
 * This function should only be called once we are sure the wallet exists.
 * @param {*} req 
 * @param {*} res 
 */
async function openIndyWallet(req, res) {
  console.log("[openIndyWallet] Inside of the function");
  let [vybeCfg, config, creds] = extractWalletInfoFromRequest(req);
  const walletHandle = await indy.openWallet(config, creds)
  // The wallet hanlde should hook to the DB and update the wallets record
  //upsertWallet(vybeCfg, config, creds, handle);
  console.log("[openIndyWallet] Exiting the function");
  res.json({message:"Wallet opened"});
}

/**
 * This function closes a wallet. nd should not be called unless said wallet exists.
 * @param {*} req - should contain the config with wallet name and credentials with password
 * @param {*} res 
 */
async function closeIndyWallet(req, res) {
  console.log("[closeIndyWallet] Begin");
  // This should also test for the wallet in MongoDB
  if ( req.body["handle"] != null ) {
    // Pull data from request
    let handle = parseInt(req.body["handle"])
    await indy.closeWallet(handle);
    res.json({message: 'Wallet with handle ' + handle + ' closed.'});
  } else {
    res.json({message: "Wallet not closed"});
  }
  console.log("[closeIndyWallet] End");
}

async function loginToIndyWallet(req, res) {
  const fName = "[loginToIndyWallet]"
  log(fName)
  let [vybeCfg, config, creds] = extractWalletInfoFromRequest(req);
  log('\t' + JSON.stringify(endorserWallet))
  if ( endorserWallet.config.id == config.id && endorserWallet.credentials.key == creds.key ) {
    res.json({message: 'Wallet manager logged in', value: endorserWallet.handle})
    loggedIn = true
  } else {
    res.json({message: 'Login not allowed', value: 0})
  }
}

async function getUserWalletList(req, res) {
  const fName = "[getUserWalletList]"
  log(fName)
  let response = await getWalletList('Company');
  if ( response.length > 0 ) {
    let msg = '\tNumber of user wallets found: ' + response.length
    res.json({message: msg, wallets: response});
  } else if ( response.length == 0 ) {
    res.json({message: 'No wallets found.'})
  } else {
    res.json({err: response})
  }

}

async function getWalletList(userType) {
  let query = { vybemeta: { data_type: 'Vybe', wallet_type: userType } };
  let result = await VybeWallet.find(query).exec();
  log('[getWalletList] ' + JSON.stringify(result));
  return result;
}

async function getAllWallets() {
  let result = await VybeWallet.find().exec();
  log('[getAllWallets] ' + JSON.stringify(result));
  return result;
}


// Define functions for ledger pools
async function getPoolList(res) {
  var pools = await indy.listPools()
  //var poolList = pools.forEach(listValues);
  res.json(pools);
}

async function createInitialPool(req, res) {
  if (req.body['pass'] == 'Shabes') {
    await indy.setProtocolVersion(2);
    log('0. Set Indy protocol version to 2 to work with Indy Node 1.4');
    
    log('1. Creates a new local pool ledger configuration that is used later when connecting to ledger.')
    const poolName = 'pool'
    const genesisFilePath = await util.getPoolGenesisTxnPath(poolName)
    const poolConfig = {'genesis_txn': genesisFilePath}
    await indy.createPoolLedgerConfig(poolName, poolConfig).then(handleIndyCreatePLC).catch(handleIndyError)
    res.json({message: 'Pool created with name: <' + poolName + '>'});
  } else {
    res.json({message: 'You have no authority here'});
  }
}

function getStewardWallet() {
  return endorserWallet;
}

/**
 * 
 * @param {*} vybeCfg 
 * @param {*} res 
 * @param {*} handle 
 * @param {*} wConfig 
 * @param {*} wCreds 
 * @param {*} dids 
 * @param {*} verKeys 
 */
async function upsertCreateWallet( vybeCfg, res, handle, wConfig, wCreds, dids, verKeys, pData ) {
  log('[upsertCreateWallet]');
  const filter = { config: wConfig };
  const update = { config: wConfig, handle: handle, credentials: wCreds, vybemeta: vybeCfg, dids: dids, verkeys: verKeys, thedata: pData }

  const theWallet = await VybeWallet.findOneAndUpdate( filter, update, {
    new: true, upsert: true, rawResult: true
  });
  if ( theWallet.value instanceof VybeWallet ) {
    log('\n\t' + JSON.stringify(theWallet));
  } else {
    log('\n\t' + JSON.stringify(theWallet));
  }
}

async function upsertPersonalData( res, wConfig, pData ) {
  const filter = { config: wConfig };
  const update = { thedata: pData };

  log('[upsertPersonalData]');
  const theWallet = await VybeWallet.findOneAndUpdate( filter, update, {
    new: true, upsert: true, rawResult: true
  });
  if ( theWallet.value instanceof VybeWallet ) {
    log('\n\t' + JSON.stringify(theWallet));
    res.json({message: 'Wallet updated', value: theWallet.value}); 
  } else {
    log('\n\t' + JSON.stringify(theWallet));
    res.json({message: JSON.stringify(theWallet)});
  }
}

/**
 * 
 * @param {*} req 
 */
function extractWalletInfoFromRequest(req) {
  let vybeCfg = {};
  vybeCfg.data_type = "Vybe";
  let config = extractConfigFromRequest(req);
  config.id = req.body["id"];
  let creds = {};
  creds.key = req.body["key"]
  return [vybeCfg, config, creds]
}

function extractConfigFromRequest(req) {
  let config = {};
  config.id = req.body["id"];
  return config;
}

/**
 * Checks the DB to see if the wallet exists.
 * @param {*} req 
 * @param {*} res 
 */
async function walletExists(req, res) {
  const fName = "walletExists"
  //let result = false;
  //console.log( '[' + fName  +']' + 'Received data: ' + JSON.stringify(req.body));
  let [vybeCfg, wConfig, wCreds] = extractWalletInfoFromRequest(req);
  if ( util.isEmptyOrSpaces(wConfig["id"]) ) {
    res.json({message: "Use something other than whitespace or null", value: 2});
  } else {
    const filter = {config: wConfig}
    const wallets = await VybeWallet.find(filter);
    if ( wallets.length > 0 ) { 
      //result = true; 
      res.json({message: "Wallet exists", value: 1});
    } else {
      res.json({message: "Wallet does not exist", value: 0});
    }
  }
  // return result;
}

async function userExists(uConfig) {
  let result = {"exists": false};
  const filter = {config: uConfig}
  const user = await VybeWallet.find(filter);
  if ( user.length > 0 ) {
    // the find function returns a list, what we need is the 1st index
    result = {"exists": true, "wallet": user[0]};
  } 
  return result;
}

async function createIndyWallet(req, res) {
  const fName = "[createIndyWallet]";
  log(fName);
  if ( loggedIn ) {
    let [vybeCfg, config, creds] = extractWalletInfoFromRequest(req);
    vybeCfg["wallet_type"] = 'Company';
    await indy.createWallet(config, creds).then(handleIndyCreateWallet).catch(handleIndyError)
    const walletHandle = await indy.openWallet(config, creds)
    log('\twallet created with handle ' + walletHandle);
    const [userDid, userVerkey] = await indy.createAndStoreMyDid(walletHandle, "{}")
    let dids = {'basic': userDid} 
    let verKeys = {'basic': userVerkey}
    log('\t' + JSON.stringify(dids) +  '\n\t' + JSON.stringify(verKeys))
    let endorserDid = endorserWallet.dids.get('steward')
    log('\tEndorser Did -> ' + endorserDid)
    let nymReq = await indy.buildNymRequest(endorserDid, userDid, userVerkey, undefined, null)
    log('\tGot past nym request ' + JSON.stringify(nymReq))
    // indy.signAndSubmitRequest(pool_handle, wallet_handle, submitter_did, request_json)
    let reqRes = await indy.signAndSubmitRequest(poolHandle, endorserWallet.handle, endorserDid, nymReq).catch(handleIndyError)
    //upsertWallet( vybeCfg, res, handle, wConfig, wCreds, dids, verKeys ) {
    upsertCreateWallet( vybeCfg, res, walletHandle, config, creds, dids, verKeys, null);
    res.json({message: 'Is there a requestResponse? ' + JSON.stringify(reqRes)});
  } else {
    log('\tPermission not granted, login value is ' + loggedIn)
    res.json({message: 'Permission not granted'})
  }
}

async function updateIndyWallet(req, res) {
  const fName = "[updateIndyWallet]";
  log(fName);
  if (loggedIn) {
    let config = extractConfigFromRequest(req);
    upsertPersonalData( res, config, JSON.parse(req.body['pdata']) );
  } else {
    let config = extractConfigFromRequest(req);
    let personalData = {};
    personalData = JSON.parse(req.body["pdata"]);
    log('\t' + JSON.stringify(config) + '\t' + JSON.stringify(personalData));
    log('\t' + personalData["incorporationdate"] )
    log('\tPermission not granted, you are not logged in')
    res.json({message: 'Permission not granted'})
  }
}

async function setupStewardEndorser() {
  // Init
  await indy.setProtocolVersion(2);
  log('0. Set Indy protocol version to 2 to work with Indy Node 1.4');
 
  // 1. 
  log('1. Creates a new local pool ledger configuration that is used later when connecting to ledger.')
  const poolName = 'pool';
  const genesisFilePath = await util.getPoolGenesisTxnPath(poolName)
  const poolConfig = {'genesis_txn': genesisFilePath}
  await indy.createPoolLedgerConfig(poolName, poolConfig).then(handleIndyCreatePLC).catch(handleIndyError)
  log('\ta. Pool ledger config has been created.');

  // 2.
  log('2. Open pool ledger and get handle from libindy')
  poolHandle = await indy.openPoolLedger(poolName, undefined)
  log('  2.1 Pool handle is ' + poolHandle)

  // 3.
  log('3. Creating new secure wallet')
  const walletName = {"id": "kweli-wallet"}
  const walletCredentials = {"key": "keytruth"}
  let endorserCandidate = await userExists(walletName);
  log('[Is endorser wallet in db? ] ' + endorserCandidate["exists"]);
  if ( !endorserCandidate["exists"] ) {
    await indy.createWallet(walletName, walletCredentials).then(handleIndyCreateWallet).catch(handleIndyError)
    // 4.
    log('4. Open wallet and get handle from libindy')
    const walletHandle = await indy.openWallet(walletName, walletCredentials)

    // 4.1 save info to database
    let vybeCfg = {}
    //vybeCfg.data_type = "Vybranium Wallet Kweli version 0.1";
    vybeCfg.data_type = "Vybe";//ranium Wallet Kweli version 0.1";
    vybeCfg.wallet_type = "Admin";
    upsertCreateWallet(vybeCfg, null, walletHandle, walletName, walletCredentials, null, null, {})
  
    // 5.
    log('5. Generating and storing steward DID and verkey')
    const stewardSeed = '000000000000000000000000Steward1'
    const did = {'seed': stewardSeed}
    const [stewardDid, stewardVerkey] = await indy.createAndStoreMyDid(walletHandle, did)
    logValue('Steward DID: ', stewardDid)
    logValue('Steward Verkey: ', stewardVerkey)
    let dids = {'steward': stewardDid}
    let verKeys = {'steward': stewardVerkey}
    upsertCreateWallet(vybeCfg, null, walletHandle, walletName, walletCredentials, dids, verKeys, {})

    // Now, create a new DID and verkey for a trust anchor, and store it in our wallet as well. Don't use a seed;
    // this DID and its keys are secure and random. Again, we're not writing to the ledger yet.

    // 6.
    log('6. Generating and storing trust anchor DID and verkey')
    const [trustAnchorDid, trustAnchorVerkey] = await indy.createAndStoreMyDid(walletHandle, "{}")
    logValue('Trust anchor DID: ', trustAnchorDid)
    logValue('Trust anchor Verkey: ', trustAnchorVerkey)
    dids['Endorser'] = trustAnchorDid
    verKeys['Endorser'] = trustAnchorVerkey
    theData = { "CTO": "Professor S", "CEO": "Eddie Joseph Kago"};
    upsertCreateWallet(vybeCfg, null, walletHandle, walletName, walletCredentials, dids, verKeys, theData)

    // Step 4 code goes here.
    // 7.
    log('7. Building NYM request to add Trust Anchor to the ledger')
    //indy.buildNymRequest( submitter_did, target_did, ver_key, alias, role 'TRUST_ANCHOR')
    const nymRequest = await indy.buildNymRequest(stewardDid, trustAnchorDid, trustAnchorVerkey, undefined, 'TRUST_ANCHOR')
    // 8.
    log('8. Sending NYM request to the ledger')
    // indy.signAndSubmitRequest(pool_handle, wallet_handle, submitter_did, request_json)
    await indy.signAndSubmitRequest(poolHandle, walletHandle, stewardDid, nymRequest)

    endorserWallet = { 
      config: walletName, 
      handle: walletHandle, 
      credentials: walletCredentials, 
      vybemeta: vybeCfg, 
      dids: dids, 
      verkeys: verKeys
    }
  } 
  else {
    // set to endorser wallet
    endorserWallet = endorserCandidate["wallet"];
    log('\t[setupStewardWallet] Wallet exists \n' + endorserWallet);
    log('\t\t' + endorserWallet.dids.get('Endorser') );
  }
}

module.exports = {
  getStewardWallet,
  extractWalletInfoFromRequest, 
  walletExists, 
  createIndyWallet,
  updateIndyWallet,
  setupStewardEndorser,
  openIndyWallet,
  closeIndyWallet,
  getWalletList,
  getAllWallets,
  getUserWalletList,
  loginToIndyWallet
};