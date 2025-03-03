import { Paperclip, X } from "lucide-react";

const FileUpload = ({ uploadedFile, setUploadedFile }) => {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleRemove = () => {
    setUploadedFile(null);
  };

  return (
    <div className="w-full">
      <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 transition">
        <input type="file" className="hidden" onChange={handleFileChange} />
        <Paperclip className="text-gray-400 mb-2" size={24} />
        <span className="text-gray-400 text-sm">{uploadedFile?.name || "Click to upload a file"}</span>
      </label>

      {uploadedFile && (
        <div className="mt-3 flex items-center justify-between bg-gray-800 text-gray-300 px-3 py-2 rounded-lg">
          <span className="text-sm truncate">{uploadedFile?.name}</span>
          <button onClick={handleRemove} className="text-gray-400 hover:text-red-500 transition">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;