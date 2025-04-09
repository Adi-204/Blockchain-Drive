import { useState, useEffect } from "react";
import { ArrowPathIcon, DocumentArrowDownIcon, DocumentTextIcon, ExclamationCircleIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function Files({ contract, account, shared, title }) {
  const [allFiles, setAllFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [otherAddress, setOtherAddress] = useState("");
  const [error, setError] = useState("");

  // Auto-load files when component mounts if not shared view
  useEffect(() => {
    if (contract && account && !shared) {
      loadFiles();
    }
  }, [contract, account]);

  const loadFiles = async () => {
    if (!contract || !account) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      if (shared) {
        if (!otherAddress) {
          setError("Please enter an address to view shared files");
          setIsLoading(false);
          return;
        }
        
        const files = await contract.display(otherAddress);
        setAllFiles(files);
      } else {
        const files = await contract.display(account);
        setAllFiles(files);
      }
    } catch (error) {
      console.error("Error loading files:", error);
      setError("Failed to load files. You might not have access.");
      setAllFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format file names from URLs
  const formatFileName = (url) => {
    if (!url) return "Unknown";
    
    // Extract the filename portion from IPFS URL
    const parts = url.split('/');
    const hash = parts[parts.length - 1];
    
    // Shorten it if too long
    return hash.length > 20 ? `${hash.substring(0, 15)}...` : hash;
  };

  // Icon based on file type (simple determination based on URL)
  const getFileTypeIcon = (url) => {
    return <DocumentTextIcon className="h-6 w-6" />;
  };
  
  // Format the date
  const getFormattedDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      {/* Search and filters */}
      <div className="mb-6">
        {shared ? (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Enter wallet address to view shared files"
                value={otherAddress}
                onChange={(e) => setOtherAddress(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/60 text-white placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={loadFiles}
              disabled={isLoading || !otherAddress}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  Load Files
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={loadFiles}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <ArrowPathIcon className="h-4 w-4 mr-2" />
                    Refresh Files
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-md text-red-400 flex items-start">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-700 h-14 w-14 flex items-center justify-center mb-4">
              <ArrowPathIcon className="h-8 w-8 text-gray-500 animate-spin" />
            </div>
            <p className="text-gray-400">Loading files...</p>
          </div>
        </div>
      )}

      {/* Files grid */}
      {!isLoading && (
        <>
          {allFiles.length === 0 ? (
            <div className="text-center py-10">
              <DocumentTextIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white">No files found</h3>
              <p className="mt-2 text-sm text-gray-400">
                {shared 
                  ? "No files have been shared with this address" 
                  : "Upload a file to see it here"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allFiles.map((file, index) => (
                <div 
                  key={index} 
                  className="group relative bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 border border-gray-700"
                >
                  <div className="h-40 bg-gradient-to-tr from-indigo-900/30 via-purple-800/20 to-gray-800 overflow-hidden">
                    <img 
                      src={file} 
                      alt="File preview" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/600x400/1f2937/ffffff?text=No+Preview';
                      }}
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate-text group-hover:text-indigo-400 transition-colors duration-200">
                          {formatFileName(file)}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Added {getFormattedDate()}
                        </p>
                      </div>
                      <span className="bg-indigo-900/60 rounded-md p-1.5 inline-flex items-center justify-center text-indigo-400">
                        {getFileTypeIcon(file)}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <a 
                        href={file} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200 flex items-center"
                      >
                        <span className="truncate max-w-[120px]">View File</span>
                        <EyeIcon className="ml-1 h-4 w-4" />
                      </a>
                      
                      <button 
                        type="button"
                        onClick={() => navigator.clipboard.writeText(file)}
                        className="text-xs text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700/70 rounded-md px-2 py-1"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}


 