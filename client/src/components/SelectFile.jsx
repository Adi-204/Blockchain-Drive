import { useState, useEffect } from "react";
import { ArrowPathIcon, CheckIcon, DocumentTextIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

const SelectFile = ({ contract, account, onFileSelect }) => {
  const [allFiles, setAllFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Load files when component mounts
  useEffect(() => {
    if (contract && account) {
      loadFiles();
    }
  }, [contract, account]);

  const loadFiles = async () => {
    if (!contract || !account) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const files = await contract.display(account);
      setAllFiles(files);
    } catch (error) {
      console.error("Error loading files:", error);
      setError("Failed to load files from cloud storage");
      setAllFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle file selection
  const toggleFileSelection = (fileUrl) => {
    setSelectedFiles(prev => {
      const fileIndex = prev.indexOf(fileUrl);
      if (fileIndex === -1) {
        // File not selected, add it
        const newSelected = [...prev, fileUrl];
        // Notify parent component about selection change
        if (onFileSelect) onFileSelect(newSelected);
        return newSelected;
      } else {
        // File already selected, remove it
        const newSelected = prev.filter(url => url !== fileUrl);
        // Notify parent component about selection change
        if (onFileSelect) onFileSelect(newSelected);
        return newSelected;
      }
    });
  };

  // Format file names from URLs
  const formatFileName = (url) => {
    if (!url) return "Unknown";
    
    // Extract the filename portion from URL
    const parts = url.split('/');
    const hash = parts[parts.length - 1];
    
    // Shorten if too long
    return hash.length > 20 ? `${hash.substring(0, 15)}...` : hash;
  };

  // Get file icon
  const getFileTypeIcon = () => {
    return <DocumentTextIcon className="h-6 w-6" />;
  };

  return (
    <div className="w-full">
      {/* Refresh button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Select Files to Share</h3>
        <button
          onClick={loadFiles}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-md text-red-400 flex items-start">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-6">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-700 h-10 w-10 flex items-center justify-center mb-3">
              <ArrowPathIcon className="h-6 w-6 text-gray-500 animate-spin" />
            </div>
            <p className="text-gray-400 text-sm">Loading files from cloud...</p>
          </div>
        </div>
      )}

      {/* Files selection grid */}
      {!isLoading && (
        <>
          {allFiles.length === 0 ? (
            <div className="text-center py-6 bg-gray-800/40 rounded-md">
              <DocumentTextIcon className="h-10 w-10 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">You don't have any files to share</p>
              <p className="text-xs text-gray-500 mt-1">Upload files to your cloud storage first</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {allFiles.map((file, index) => (
                <div 
                  key={index} 
                  onClick={() => toggleFileSelection(file)}
                  className={`group flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedFiles.includes(file) 
                      ? 'bg-indigo-900/40 ring-1 ring-indigo-500' 
                      : 'bg-gray-800/60 hover:bg-gray-700/40'
                  }`}
                >
                  {/* Selection indicator */}
                  <div className={`flex-shrink-0 h-5 w-5 mr-3 rounded-full flex items-center justify-center ${
                    selectedFiles.includes(file) 
                      ? 'bg-indigo-500' 
                      : 'border border-gray-600 group-hover:border-indigo-400'
                  }`}>
                    {selectedFiles.includes(file) && (
                      <CheckIcon className="h-3 w-3 text-white" />
                    )}
                  </div>
                  
                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      selectedFiles.includes(file) ? 'text-indigo-300' : 'text-white'
                    }`}>
                      {formatFileName(file)}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{file}</p>
                  </div>
                  
                  {/* File type icon */}
                  <div className={`ml-3 flex-shrink-0 ${
                    selectedFiles.includes(file) ? 'text-indigo-400' : 'text-gray-400'
                  }`}>
                    {getFileTypeIcon(file)}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Selection summary */}
          {allFiles.length > 0 && (
            <div className="mt-4 text-sm text-center text-gray-400">
              {selectedFiles.length === 0 
                ? 'No files selected' 
                : `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectFile; 