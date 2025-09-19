
import React, { useRef } from 'react';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  inputImageUrl: string | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, inputImageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageChange(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0] || null;
    onImageChange(file);
    if (fileInputRef.current) {
        fileInputRef.current.files = event.dataTransfer.files;
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="w-full">
      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">
        1. Upload an Image
      </label>
      <div 
        onClick={triggerFileSelect}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="mt-1 flex justify-center items-center w-full h-64 px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md cursor-pointer hover:border-purple-400 transition-colors duration-300"
      >
        {inputImageUrl ? (
          <img src={inputImageUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
        ) : (
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8L36 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M12 32h24a4 4 0 004-4V12a4 4 0 00-4-4H16a4 4 0 00-4 4v16a4 4 0 004 4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-purple-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" />
      </div>
    </div>
  );
};
