import React from 'react';
import type { ImageEditResult } from '../types';

interface ResultDisplayProps {
  result: ImageEditResult | null;
  error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, error }) => {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold">An Error Occurred</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (result?.imageUrl) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-200">Generated Image:</h3>
        <img src={result.imageUrl} alt="Generated result" className="max-h-64 md:max-h-80 w-auto object-contain rounded-lg shadow-lg" />
        {result.text && (
            <p className="text-sm text-gray-400 italic text-center p-2 bg-gray-800/50 rounded-md max-w-sm">"{result.text}"</p>
        )}
        <a
          href={result.imageUrl}
          download="gemini-edited-image.png"
          className="inline-flex items-center justify-center px-4 py-2 font-medium text-white transition-all duration-200 bg-purple-600 border border-transparent rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
          aria-label="Download generated image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </a>
      </div>
    );
  }

  return (
    <div className="text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      <p className="mt-2 text-sm font-semibold">Your edited image will appear here</p>
      <p className="text-xs">Provide an image and a prompt, then click "Apply Magic".</p>
    </div>
  );
};
