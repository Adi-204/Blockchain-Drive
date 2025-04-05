# Blockchain Drive: Securing Data on the Ethereum & IPFS

Welcome to Blockchain Drive, a decentralized data storage solution that leverages the power of Ethereum and IPFS to securely store and manage your data.

## Features

- **MetaMask Integration**: Seamlessly connect your MetaMask wallet to the Blockchain Drive application.

- **File Upload to IPFS**: Select and upload your files, which are securely stored on IPFS via Pinata.

- **Ethereum Link Storage**: After a successful file upload, the link to your data is stored on the Ethereum blockchain for added security and permanence.

- **Share and Access Control**: Share access to your stored files with other Ethereum accounts. You can also revoke access as needed.

## Smart Contract

- **Solidity Version**: ^0.8.0
- **Deployment Network**: Sepolia test net
- **Deployment Tool**: Hardhat

## Client Application

- **Built with React.js**: Our user-friendly web application is developed using React.js.

- **Styled with Tailwind CSS**: A beautiful and responsive UI is achieved with Tailwind CSS.

- **Ethereum Integration**: We use the ethers library (version 5.5.1) for Ethereum integration to provide a smooth user experience.

## Getting Started

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Adi-204/Blockchain-Drive.git
```

2. Deploy Smart contract :

```bash
    /smart_contract/contracts/Upload.sol
```

3. Replace ABI :

```bash
    /client/src/utils/upload.json
```

4. Replace Deployed Contract address :

```bash
    /client/src/utils/constants.js
```

5. Replace Pinata access :

```bash
    /client/src/utils/constants.js
```
