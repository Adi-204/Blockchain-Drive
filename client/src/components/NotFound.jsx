import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <div className="mx-auto h-32 w-32 relative">
            <svg className="absolute inset-0 h-full w-full text-indigo-600 animate-pulse-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.00002 11C8.76144 11 11 8.76142 11 6C11 3.23858 8.76144 1 6.00002 1C3.2386 1 1 3.23858 1 6C1 8.76142 3.2386 11 6.00002 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.9177 22C20.7003 22 23 19.7614 23 17C23 14.2386 20.7003 12 17.9177 12C15.135 12 12.8353 14.2386 12.8353 17C12.8353 19.7614 15.135 22 17.9177 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.5 6H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.5 11L14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.5 12V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 17H7.5L4 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            
            <div className="absolute left-0 top-0 h-full w-full flex items-center justify-center">
              <span className="text-5xl font-bold text-white">404</span>
            </div>
          </div>
          
          <h2 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Page not found
          </h2>
          <p className="mt-4 text-base text-gray-400">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Go back home
          </Link>
          
          <p className="text-sm text-gray-400 mt-4">
            or check out the
            <Link
              to="/#files"
              className="ml-1 text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              file storage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 