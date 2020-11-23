module.exports = {
    Success: 0,

    CommonInvalidParam1: 100,
    CommonInvalidParam2: 101,
    CommonInvalidParam3: 102,
    CommonInvalidParam4: 103,
    CommonInvalidParam5: 104,
    CommonInvalidParam6: 105,
    CommonInvalidParam7: 106,
    CommonInvalidParam8: 107,
    CommonInvalidParam9: 108,
    CommonInvalidParam10: 109,
    CommonInvalidParam11: 110,
    CommonInvalidParam12: 111,
    CommonInvalidState: 112,
    CommonInvalidStructure: 113,

    // -----------------------------------------------------------------------
    // IO Error
    // -----------------------------------------------------------------------
    CommonIOError: 114,

    // -----------------------------------------------------------------------
    // Wallet Errors
    // -----------------------------------------------------------------------
    WalletInvalidHandle: 200,
    WalletUnknownTypeError: 201,
    WalletTypeAlreadyRegisteredError: 202,
    WalletAlreadyExistsError: 203,
    // Requested entity id isn't present in wallet
    WalletNotFoundError: 204,
    // Trying to use wallet with pool that has different name
    WalletIncompatiblePoolError: 205,
    // Trying to open wallet that was opened already
    WalletAlreadyOpenedError: 206,
    // Attempt to open encrypted wallet with invalid credentials
    WalletAccessFailed: 207,
    // Input provided to wallet operations is considered not valid
    WalletInputError: 208,
    // Decoding of wallet data during input/output failed
    WalletDecodingError: 209,
    // Storage error occurred during wallet operation
    WalletStorageError: 210,
    // Error during encryption-related operations
    WalletEncryptionError: 211,
    // Requested wallet item not found
    WalletItemNotFound: 212,
    // Returned if wallet's add_record operation is used with record name that already exists
    WalletItemAlreadyExists: 213,
    // Returned if provided wallet query is invalid
    WalletQueryError: 214,

    // -----------------------------------------------------------------------
    // Ledger errors
    // -----------------------------------------------------------------------
    // Trying to open pool ledger that wasn't created before
    PoolLedgerNotCreatedError: 300,
    // Caller passed invalid pool ledger handle
    PoolLedgerInvalidPoolHandle: 301,
    // Pool ledger terminated
    PoolLedgerTerminated: 302,
    // No concensus during ledger operation
    LedgerNoConsensusError: 303,
    // Attempt to parse invalid transaction response
    LedgerInvalidTransaction: 304,
    // Attempt to send transaction without the necessary privileges
    LedgerSecurityError: 305,
    // Attempt to create pool ledger config with name used for another existing pool
    PoolLedgerConfigAlreadyExistsError: 306,
    // Timeout for action
    PoolLedgerTimeout: 307,

    // Attempt to open Pool for witch Genesis Transactions are not compatible with set Protocol version.
    // Call pool.indy_set_protocol_version to set correct Protocol version.
    PoolIncompatibleProtocolVersion: 308,
    // Item not found on ledger.
    LedgerNotFound: 309,

    // -----------------------------------------------------------------------
    // Revocation registry is full and creation of new registry is necessary
    AnoncredsRevocationRegistryFullError: 400,
    AnoncredsInvalidUserRevocId: 401,
    // Attempt to generate master secret with dupplicated name
    AnoncredsMasterSecretDuplicateNameError: 404,
    AnoncredsProofRejected: 405,
    AnoncredsCredentialRevoked: 406,
    // Attempt to create credential definition with duplicated did schema pair
    AnoncredsCredDefAlreadyExistsError: 407,

    // -----------------------------------------------------------------------
    // Crypto errors
    // -----------------------------------------------------------------------
    // Unknown format of DID entity keys
    UnknownCryptoTypeError: 500,

    // -----------------------------------------------------------------------
    // Attempt to create duplicate did
    DidAlreadyExistsError: 600,

    // -----------------------------------------------------------------------
    // Unknown payment method was given
    PaymentUnknownMethodError: 700,
    //No method were scraped from inputs/outputs or more than one were scraped
    PaymentIncompatibleMethodsError: 701,
    // Insufficient funds on inputs
    PaymentInsufficientFundsError: 702,
    // No such source on a ledger
    PaymentSourceDoesNotExistError: 703,
    // Operation is not supported for payment method
    PaymentOperationNotSupportedError: 704,
    // Extra funds on inputs
    PaymentExtraFundsError: 705
}