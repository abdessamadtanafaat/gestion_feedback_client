import { useContext } from 'react';
import { FileInput, Label } from 'flowbite-react';
import BusinessContext from '../../../../context/BusinessContext';

function DragNDrop() {
  const { setFile, selectedImage, setSelectedImage } = useContext(BusinessContext);
  

  const handleFileChange = (event) => {
    event.preventDefault(); // Prevent default behavior
    const selectedFile = event.target.files[0];
    processSelectedFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior
  };

  const handleDrop = (event) => {
    event.preventDefault(); // Prevent default behavior
    const selectedFile = event.dataTransfer.files[0];
    processSelectedFile(selectedFile);
  };

  const processSelectedFile = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setFile(null); // Clear the file from context if needed
  };

  return (
    <div className="flex w-full flex-col items-center justify-center" onDragOver={handleDragOver} onDrop={handleDrop}>
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          {selectedImage ? (
            <>
              <img
                src={selectedImage}
                alt="Selected"
                className="rounded-lg object-cover  "
              />
              
            </>
          ) : (
            <>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </>
          )}
        </div>
        <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} />
      </Label>
      {(selectedImage && <button onClick={handleDeleteImage} className="mt-4 px-4 py-1 bg-red-500 text-white rounded-md focus:outline-none">Delete Image</button>)}

    </div>
  );
}

export default DragNDrop;
