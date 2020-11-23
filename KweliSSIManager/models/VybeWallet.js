var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vybeWalletSchema = new Schema({
  vybemeta: {
    type: Map,
    of: Schema.Types.Mixed
  },
  config: {
    id: String,
    storage_type: String,
    storage_config: Object
  },
  path: String, 
  credentials: {
    key: String,
    storage_credentials: Object,
    key_derivation_method: String
  },
  handle: Number,
  dids: {
    type: Map,
    of: String
  },
  verkeys: {
    type: Map,
    of: String
  },
  thedata: {
    type: Map,
    of: Schema.Types.Mixed
  }
});

var VybeWallet = mongoose.model('VybeWallet', vybeWalletSchema);
module.exports = VybeWallet;