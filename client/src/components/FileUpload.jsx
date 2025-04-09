import { useState } from "react";
import axios from "axios";
import { API_Key, API_Secret } from "../utils/constants";
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file && contract) {
      try {
        setIsLoading(true);
        setUploadProgress(10);
        
        const formData = new FormData();
        formData.append("file", file);

        // Simulate incremental progress (this won't be accurate but provides feedback)
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 500);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: API_Key,
            pinata_secret_api_key: API_Secret,
            "Content-Type": "multipart/form-data",
          },
        });

        clearInterval(progressInterval);
        setUploadProgress(95);
        
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account, ImgHash);
        
        setUploadProgress(100);
        
        // Reset after successful upload
        setTimeout(() => {
          setFileName(null);
          setFile(null);
          setUploadProgress(0);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsLoading(false);
        setUploadProgress(0);
      }
    }
  };

  const retrieveFile = (e) => {
    e.preventDefault();
    const data = e.target.files[0];
    if (!data) return;
    
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(data);
    };
    setFileName(data.name);
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const data = e.dataTransfer.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setFile(data);
      };
      setFileName(data.name);
    }
  };

  // Clear selected file
  const clearFile = () => {
    setFile(null);
    setFileName(null);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form 
        className="w-full" 
        onSubmit={handleSubmit}
        onDragEnter={handleDrag}
      >
        {/* File Drop Area */}
        <div 
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            !file 
              ? dragActive 
                ? "border-indigo-500 bg-indigo-50/10" 
                : "border-gray-600 hover:border-indigo-400 hover:bg-gray-800/30"
              : "border-green-500/70 bg-green-900/10"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!file ? (
            // Upload prompt state
            <div className="space-y-4">
              <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400" />
              <div className="flex flex-col items-center text-center">
                <p className="text-lg font-medium text-white">
                  Drag and drop your file here
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  or click to browse from your computer
                </p>
              </div>
              
              <label 
                htmlFor="file-upload" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-colors duration-200 mt-2"
              >
                Select File
              </label>
              
              <input
                disabled={!account || isLoading}
                type="file"
                id="file-upload"
                name="data"
                onChange={retrieveFile}
                className="sr-only"
              />
              
              <p className="text-xs text-gray-500 mt-2">
                Supported file types: PDF, JPG, PNG, and more
              </p>
            </div>
          ) : (
            // File selected state
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-800/60 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <DocumentIcon className="h-8 w-8 text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {fileName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {file && formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearFile}
                  disabled={isLoading}
                  className="ml-4 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <span className="sr-only">Remove file</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              
              {isLoading ? (
                <div className="space-y-2">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400">
                    {uploadProgress < 100 
                      ? `Uploading... ${uploadProgress}%`
                      : 'Upload complete!'
                    }
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!file || !account || isLoading}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <CloudArrowUpIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Upload to Blockchain
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Display connection status */}
        {!account && (
          <p className="text-sm text-yellow-400 mt-2 text-center">
            Please connect your wallet before uploading files
          </p>
        )}
      </form>
    </div>
  );
};

export default FileUpload;