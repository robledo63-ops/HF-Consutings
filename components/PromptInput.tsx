
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  return (
    <div className="w-full">
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
        2. Describe Your Edit
      </label>
      <textarea
        id="prompt"
        name="prompt"
        rows={4}
        className="block w-full bg-gray-900/50 border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-100 placeholder-gray-500 transition-all duration-300"
        placeholder="e.g., 'Add a llama next to my cat' or 'Change the background to a futuristic city'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </div>
  );
};
