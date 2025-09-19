
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-12 h-12 border-4 border-t-purple-400 border-r-purple-400 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-semibold text-gray-300">Conjuring your image...</p>
      <p className="text-sm text-gray-500">This can take a moment.</p>
    </div>
  );
};
