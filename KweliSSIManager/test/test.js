const log        = console.log;
const util       = require('../config/util');
const config     = require('../config/local.env.json');
const VybeWallet = require('../models/VybeWallet');
const assert     = require('chai').assert;
const dbMan      = require('../src/dbmanager');
const walletManager = require('../src/walletmanage');
// For tests
describe('walletManager', function() {
  describe('#getWalletList()', function() {
    it( 'Test notice: should show a listing of Admin wallets', function (done) {
      walletManager.getWalletList('Admin').then(
        function(walletList) {
          log('  [Test notice] Number company wallets is : ' + walletList.length );
          for ( let wallet in walletList ) {
            let wlt = walletList[wallet]
            log('\t[Test notice] Wallet name -> ' + wlt.config );
            if ( wlt.thedata != null )
              util.printMap('\t\t[' + wlt.config.id  + '] ', wlt.thedata)
          }
          assert.isAbove(walletList.length, 0, 'There should be at least one admin user(s) in the database.');
          done();
        }
      );
    });
  });
  describe('#getAllWallets()', function() {
    it( 'Test notice: should show a listing of all wallets', function (done) {
      walletManager.getAllWallets().then(
        function(walletList) {
          log('  [Test notice] Number vybe wallets is : ' + walletList.length );
          for ( let wallet in walletList ) {
            let wlt = walletList[wallet]
            log('\t[Test notice] Wallet name -> ' + wlt.config );
            if ( wlt.thedata != null )
              util.printMap('\t\t[' + wlt.config.id  + '] ', wlt.thedata)
          }
          //assert(walletList.length > 0, 'There should be at least one admin user(s) in the database.');
          assert.lengthOf(walletList, 9, 'There should be at least one admin user(s) in the database.');
          done();
        }
      );
    });
  });
});