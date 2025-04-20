

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Smart Contract                                 ||
// ! ||--------------------------------------------------------------------------------||

import abi from './upload.json'
export const  contractAddress= '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const contractAbi = abi;


// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Pinata IPFS                                  ||
// ! ||--------------------------------------------------------------------------------||

export const API_Key =  import.meta.env.VITE_API_KEY;
export const API_Secret=  import.meta.env.VITE_API_SECRET;
export const JWT= import.meta.env.VITE_JWT;

console.log(API_Key, API_Secret, JWT);
