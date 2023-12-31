// components/Loading.js
import React from 'react';

const Loading = ( {loading} ) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="rounded-full h-12 w-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-bounce"></div>
          <div className="rounded-full h-12 w-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-bounce"></div>
          <div className="rounded-full h-12 w-12 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-bounce"></div>
        </div>
        <h2 className="text-2xl font-semibold mt-4">Loading<span className="ml-2 animate-pulse">...</span></h2>
      </div>
    </div>
  );
};

export default Loading;
