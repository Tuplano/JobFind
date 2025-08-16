import { ChangeEvent } from "react";
import { Upload, Check } from "lucide-react";

type LogoUploadProps = {
  logo: File | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function LogoUpload({ logo, onChange }: LogoUploadProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="logo-upload"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> your company logo
          </p>
          <p className="text-xs text-gray-500">PNG, JPG or SVG (MAX. 5MB)</p>
          {logo && (
            <p className="mt-2 text-sm text-green-600 flex items-center">
              <Check size={16} className="mr-1" />
              {logo.name}
            </p>
          )}
        </div>
        <input
          id="logo-upload"
          type="file"
          className="hidden"
          accept="image/png,image/jpg,image/jpeg,image/svg+xml"
          onChange={onChange}
        />
      </label>
    </div>
  );
}
