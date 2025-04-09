

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Smart Contract                                 ||
// ! ||--------------------------------------------------------------------------------||

import abi from './upload.json'
export const  contractAddress= '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const contractAbi = abi;


// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Pinata IPFS                                  ||
// ! ||--------------------------------------------------------------------------------||

export const API_Key =  process.env.API_Key
export const API_Secret=  process.env.API_Secret
export const JWT= process.env.JWT
