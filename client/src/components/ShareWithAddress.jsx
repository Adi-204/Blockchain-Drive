import { useState, useEffect } from "react";
import { ArrowPathIcon, ClipboardIcon, ExclamationCircleIcon, PaperAirplaneIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SelectFile from "./SelectFile";

const ShareWithAddress = ({ contract, account }) => {
  const [sharedAddresses, setSharedAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showFileSelection, setShowFileSelection] = useState(false);

  // Load all currently shared addresses when component mounts
  useEffect(() => {
    if (contract && account) {
      loadSharedAccesses();
    }
  }, [contract, account]);

  // Load all addresses that have been given access
  const loadSharedAccesses = async () => {
    if (!contract || !account) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const accessList = await contract.shareAccess();
      setSharedAddresses(accessList);
    } catch (error) {
      console.error("Error loading shared accesses:", error);
      setError("Failed to load shared addresses");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file selection change
  const handleFileSelect = (files) => {
    setSelectedFiles(files);
  };

  // Share access with a new address
  const shareWithAddress = async (e) => {
    e.preventDefault();
    if (!contract || !account || !newAddress) return;
    
    // Basic validation
    if (!newAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError("Please enter a valid Ethereum address");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    
    try {
      // Call the contract method to grant access
      const tx = await contract.allow(newAddress);
      await tx.wait();
      
      setSuccessMessage(`Successfully shared access with ${newAddress.substring(0, 6)}...${newAddress.substring(38)}`);
      setNewAddress("");
      
      // Reload the shared addresses list
      await loadSharedAccesses();
      
      // Reset file selection and hide the file selector
      setSelectedFiles([]);
      setShowFileSelection(false);
    } catch (error) {
      console.error("Error sharing access:", error);
      setError("Failed to share access. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove access for an address
  const removeAccess = async (addressToRemove) => {
    if (!contract || !account) return;
    
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    
    try {
      // Call the contract method to revoke access
      const tx = await contract.disallow(addressToRemove);
      await tx.wait();
      
      setSuccessMessage(`Access revoked for ${addressToRemove.substring(0, 6)}...${addressToRemove.substring(38)}`);
      
      // Reload the shared addresses list
      await loadSharedAccesses();
    } catch (error) {
      console.error("Error revoking access:", error);
      setError("Failed to revoke access. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format an address for display
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(38)}`;
  };

  // Copy address to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccessMessage("Address copied to clipboard");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-700 pb-4 mb-6">
        <h2 className="text-xl font-bold text-white">Share with Specific Addresses</h2>
        <p className="text-gray-400 mt-1">Grant access to your files for specific wallet addresses</p>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-md text-red-400 flex items-start">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {/* Success message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-md text-green-400 flex items-start">
          <UserPlusIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{successMessage}</p>
        </div>
      )}
      
      {/* Share form */}
      <form onSubmit={shareWithAddress} className="mb-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Enter wallet address (0x...)"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/60 text-white placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isLoading || !account}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !newAddress || !account}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                  Share Access
                </>
              )}
            </button>
          </div>
          
          {/* Toggleable file selector */}
          <div>  
            {showFileSelection && (
              <div className="mt-4 p-4 bg-gray-800/40 rounded-lg border border-gray-700">
                <SelectFile 
                  contract={contract} 
                  account={account} 
                  onFileSelect={handleFileSelect}
                />
              </div>
            )}
          </div>
        </div>
      </form>
      
      {/* Shared addresses list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Shared With</h3>
          <button
            onClick={loadSharedAccesses}
            disabled={isLoading}
            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-indigo-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isLoading ? (
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowPathIcon className="h-4 w-4" />
            )}
            <span className="ml-1">Refresh</span>
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <ArrowPathIcon className="h-8 w-8 text-gray-500 animate-spin" />
          </div>
        ) : (
          <>
            {sharedAddresses.length === 0 ? (
              <div className="text-center py-6 bg-gray-800/40 rounded-md">
                <p className="text-gray-400">You haven't shared access with anyone yet</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-700">
                {sharedAddresses.map((addressData, index) => (
                  addressData[1] && (
                    <li key={index} className="py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full bg-gray-800 p-2">
                          <UserPlusIcon className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">{formatAddress(addressData[0])}</p>
                          <p className="text-xs text-gray-400">Has access to your files</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyToClipboard(addressData[0])}
                          className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                          title="Copy address"
                        >
                          <ClipboardIcon className="h-5 w-5" />
                        </button>
                        
                        <button
                          onClick={() => removeAccess(addressData[0])}
                          className="p-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-900/30"
                          title="Remove access"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  )
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      
      {!account && (
        <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-md text-yellow-400 flex items-start">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">Please connect your wallet to manage file sharing</p>
        </div>
      )}
    </div>
  );
};

export default ShareWithAddress; 