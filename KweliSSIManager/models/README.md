# Models for DB Interface

This folder contains one applicable model, VybeWallet.js.
The other files will be used as references for models to be added.

A design decision is to use a noSQL DB to store data.

## VybeWallet model

``` VybeWallet
vybemeta  {map of different types of metadata}
config {id (String name of wallet), storage_type (String), storage_config (Object)]}
credentials {key (String - password), storage_credentials (object), key_derivation_method (String)}
path (String - directory location of wallet)
handle (number - assigned when wallet is opened)
thedata (map of different data types)
```
