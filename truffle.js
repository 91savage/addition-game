// truffle.js config for klaytn. //
const HDWalletProvider = require('truffle-hdwallet-provider-klaytn')
const NETWORK_ID ='1001'
const GASLIMIT = '20000000'
const URL = 'https://api.baobab.klaytn.net:8651'
const PRIVATE_KEY = '0xd25293075580320fdbb666d5ba65f5a2870cef3055cfd8eb4076f4b95766e1d7'

module.exports = { 
    networks: {
      klaytn: {
        provider : new HDWalletProvider(PRIVATE_KEY, URL), 
        network_id : NETWORK_ID,
        gas : GASLIMIT,
        gasPrice : null, 
      }
    },
}
