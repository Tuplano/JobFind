"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  file: File | null;                     
  onChange: (file: File | null) => void;
  accept?: string;
}

export default function FileUpload({
  file,
  onChange,
  accept = "image/*",
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    onChange(selectedFile);
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition"
      onClick={() => fileInputRef.current?.click()}
    >
      {file ? (
        <div className="flex flex-col items-center space-y-2">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-lg shadow"
          />
          <p className="text-sm text-gray-600">{file.name}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(null); // remove file
            }}
            className="text-xs text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <Upload size={32} className="text-gray-400" />
          <p className="text-sm text-gray-600">Click to upload</p>
          <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
        </div>
      )}

      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
