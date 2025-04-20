import { useEffect, useState } from 'react'
import { ethers } from "ethers";
import { contractAbi, contractAddress } from './utils/constants';
import "./App.css";
import FileUpload from './components/FileUpload'; 
import Display from './components/Display';
import Files from './components/Files';
import ShareWithAddress from './components/ShareWithAddress';
import { 
  ArrowRightIcon, 
  ChevronDownIcon, 
  CloudArrowUpIcon, 
  DocumentIcon, 
  LockClosedIcon, 
  ShieldCheckIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  SparklesIcon,
  UserPlusIcon,
  ServerIcon
} from '@heroicons/react/24/outline';
import { ShareIcon } from './components/Icons';

const features = [
  {
    name: 'Secure Storage',
    description: 'Files are encrypted and stored securely on decentralized cloud infrastructure.',
    icon: LockClosedIcon,
  },
  {
    name: 'Distributed Cloud',
    description: 'No single point of failure, data is distributed across the cloud network.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Privacy Focused',
    description: 'You control who can access your files with advanced access control.',
    icon: ShieldCheckIcon,
  },
];

const benefits = [
  'End-to-end encryption',
  'No third-party data access',
  'Immutable file storage',
  'Protection against data loss',
  'Self-sovereign data control',
  'Transparent access history'
];

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState('');
  const [provider, setProvider] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState('image');

  // Connect to Ethereum provider
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const loadProvider = async () => {
        setIsLoading(true);
        
        if (provider) {
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });

          window.ethereum.on('accountsChanged', () => {
            window.location.reload();
          });

          try {
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            setIsConnected(true);

            const contract = new ethers.Contract(
              contractAddress, contractAbi, signer
            );
            setContract(contract);
            setProvider(provider);
          } catch (error) {
            console.error("Error connecting to MetaMask:", error);
          } finally {
            setIsLoading(false);
          }
        } else {
          console.log("MetaMask is not installed");
          setIsLoading(false);
        }
      };

      provider && loadProvider();
    } else {
      console.warn("Please Install MetaMask");
    }
  }, []);

  // Function to connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      setIsLoading(true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        setAccount(address);
        setIsConnected(true);
        
        const contract = new ethers.Contract(
          contractAddress, contractAbi, signer
        );
        setContract(contract);
        setProvider(provider);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please install MetaMask to use this application");
    }
  };

  // Format account address for display
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>

        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-1 shadow-lg shadow-indigo-600/50">
                  <div className="absolute inset-0 rounded-full bg-indigo-600 blur-md opacity-60"></div>
                  <CloudArrowUpIcon className="h-8 w-8 text-white relative z-10" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                <span className="block">Secure Your Files with</span>
                <span className="mt-2 block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">SecureCloud Drive</span>
              </h1>
              
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Upload, store, and share your files with unbreakable security using decentralized cloud technology 
                <span className="block mt-2">Powered by distributed infrastructure for maximum protection and accessibility.</span>
              </p>
              
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {!isConnected ? (
                  <button
                    onClick={connectWallet}
                    disabled={isLoading}
                    className="group relative rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,255,255,0.6)_0%,transparent_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    </span>
                    <span className="relative flex items-center gap-2 z-10">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Connecting...</span>
                        </>
                      ) : (
                        <>
                          <span>Connect Wallet</span>
                          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                ) : (
                  <div className="relative flex h-10 items-center rounded-full bg-gray-800/70 backdrop-blur-sm px-4 pr-6 text-sm text-gray-300 shadow-inner ring-1 ring-white/10">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></div>
                      <span>Connected: {formatAddress(account)}</span>
                    </div>
                  </div>
                )}
                
                <a href="#files" className="group text-sm font-semibold leading-6 text-white flex items-center gap-1 hover:text-indigo-300 transition-colors duration-300">
                  View my files 
                  <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                </a>
              </div>
            </div>
            
            {/* Animated feature cards */}
            <div className="mt-20 sm:mt-24">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                {features.map((feature) => (
                  <div key={feature.name} className="group relative backdrop-blur-sm bg-gray-900/40 rounded-3xl p-8 shadow-xl ring-1 ring-gray-800 hover:bg-gray-800/50 hover:ring-indigo-500/40 transition-all duration-300 hover:shadow-indigo-500/10">
                    <div className="absolute -inset-px bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-3 shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-110">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      
                      <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-300">
                        {feature.name}
                      </h3>
                      
                      <p className="mt-2 text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Benefits section */}
            <div className="mt-24 lg:mt-32 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="text-3xl font-bold text-white">Why Choose SecureCloud Storage</span>
              </div>
              
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="relative backdrop-blur-sm bg-gray-900/40 rounded-3xl p-8 shadow-xl ring-1 ring-gray-800 overflow-hidden">
                  <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
                  <h3 className="text-xl font-bold text-white">Unmatched Security</h3>
                  <p className="mt-3 text-gray-400">
                    Traditional cloud storage solutions are vulnerable to data breaches and unauthorized access. Our distributed cloud storage system spreads your data across a secure network making it virtually impossible to compromise.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {benefits.slice(0, 3).map((benefit) => (
                      <li key={benefit} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative backdrop-blur-sm bg-gray-900/40 rounded-3xl p-8 shadow-xl ring-1 ring-gray-800 overflow-hidden">
                  <div className="absolute left-0 bottom-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
                  <h3 className="text-xl font-bold text-white">True Ownership</h3>
                  <p className="mt-3 text-gray-400">
                    With our decentralized cloud storage, you retain complete control over your data. No central authority can restrict access or change permissions without your authorization.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {benefits.slice(3).map((benefit) => (
                      <li key={benefit} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* File upload section */}
            {isConnected && (
              <div id="upload-files" className="mt-20 flow-root sm:mt-24 backdrop-blur-sm bg-gray-900/40 rounded-3xl p-8 shadow-xl ring-1 ring-gray-800">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -inset-x-2 -top-2 bottom-0">
                    <svg className="absolute left-0 top-0 h-24 w-24 -translate-x-1/3 -translate-y-1/3 transform fill-indigo-500/20" viewBox="0 0 64 64" aria-hidden="true">
                      <path d="M63.71 30.935a32.003 32.003 0 0 1-45.298 27.02C6.628 52.7 0 41.45 0 29.883 0 13.455 13.286.22 29.714.22c15.977 0 29.068 12.747 29.425 28.724l4.828-.355A1 1 0 0 1 65 29.58v.072a1 1 0 0 1-.93 1.013l-4.353.318a1 1 0 0 0-.934 1.035a1 1 0 0 0 1.002.982l3.925.041z" />
                    </svg>
                    <svg className="absolute right-0 bottom-0 h-24 w-24 translate-x-1/3 translate-y-1/3 transform fill-purple-500/20" viewBox="0 0 64 64" aria-hidden="true">
                      <path d="M62.399 54.71a32.003 32.003 0 0 1-28.924 9.298C21.782 61.325 12.075 52.975 8.035 42.08c-6.405-17.27 2.352-36.308 19.622-42.713C45.203-6.698 63.565 2.779 69.38 19.976l-5.976 2.196a1 1 0 0 1-1.317-.518l-.026-.067a1 1 0 0 1 .546-1.314l4.694-1.714a1 1 0 0 0 .58-1.288a1 1 0 0 0-1.288-.58l-3.67 1.34z" />
                    </svg>
                  </div>
                  
                  <div className="relative w-full max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500/10 mb-4">
                        <SparklesIcon className="h-6 w-6 text-indigo-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Upload Your Files</h2>
                      <p className="mt-2 text-gray-400">Your files will be securely stored on our distributed cloud network</p>
                    </div>
                    
                    <FileUpload
                      account={account}
                      provider={provider}
                      contract={contract}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Files sections with visual separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-800"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="text-3xl font-bold text-white">Your Cloud Storage</span>
        </div>
      </div>
      
      <div id="view-files" className="mx-auto max-w-7xl px-6 lg:px-8 py-12 md:py-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">My Files</h2>
          {isConnected && (
            <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
              Connected
            </span>
          )}
        </div>
        
        <div className="backdrop-blur-sm bg-gray-900/40 rounded-3xl p-6 shadow-xl ring-1 ring-gray-800 overflow-hidden">
          <div className="relative z-10">
            {isConnected ? (
              <Files contract={contract} account={account} title="My Files" />
            ) : (
              <div className="text-center py-12">
                <CloudArrowUpIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white">No files to display</h3>
                <p className="mt-2 text-sm text-gray-400">Connect your wallet to view your files</p>
                <button
                  onClick={connectWallet}
                  className="mt-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:shadow-indigo-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
          <div className="absolute right-0 bottom-0 -mb-16 -mr-16 h-64 w-64 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-8">Shared With Me</h2>
        <div className="backdrop-blur-sm bg-gray-900/40 rounded-3xl p-6 shadow-xl ring-1 ring-gray-800 overflow-hidden relative">
          <div className="relative z-10">
            {isConnected ? (
              <Files contract={contract} account={account} title="Shared With Me" shared='1' />
            ) : (
              <div className="text-center py-12">
                <ShareIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white">No shared files</h3>
                <p className="mt-2 text-sm text-gray-400">Connect your wallet to view files shared with you</p>
                <button
                  onClick={connectWallet}
                  className="mt-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:shadow-indigo-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
          <div className="absolute left-0 bottom-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
        </div>
      </div>
      
      {/* Share with specific wallet addresses section */}
      <div id="share-files" className="mx-auto max-w-7xl px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-8">Share with Specific Addresses</h2>
        <div className="backdrop-blur-sm bg-gray-900/40 rounded-3xl p-6 shadow-xl ring-1 ring-gray-800 overflow-hidden relative">
          <div className="relative z-10">
            {isConnected ? (
              <ShareWithAddress contract={contract} account={account} />
            ) : (
              <div className="text-center py-12">
                <UserPlusIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white">Share Your Files</h3>
                <p className="mt-2 text-sm text-gray-400">Connect your wallet to share files with specific addresses</p>
                <button
                  onClick={connectWallet}
                  className="mt-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:shadow-indigo-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
          <div className="absolute right-0 bottom-0 -mb-16 -mr-16 h-64 w-64 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
