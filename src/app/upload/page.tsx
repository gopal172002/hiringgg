"use client";

import { useState } from 'react';

export default function UploadPage() {
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0 || !company || !description) {
      setMessage('Please fill all fields and upload at least one photo.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      // Convert the photos to base64
      const photoBase64Promises = photos.map((file) => convertToBase64(file));
      const base64Photos = await Promise.all(photoBase64Promises);

      // Send form data including the base64-encoded photos
      const res = await fetch('/api/secretapiname/upload-photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company,
          description,
          photos: base64Photos, // Send base64 data
        }),
      });

      const data = await res.json();
// console.log(data);
      if (res.ok) {
        setMessage('Photos uploaded successfully!');
        setCompany('');
        setDescription('');
        setPhotos([]); // Clear the photos
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  // Convert image to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to Array
      setPhotos(selectedFiles);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Upload Company Photos</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Company Name:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Photos:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border rounded w-full py-2 px-3 text-gray-700"
            multiple // Allow multiple file selection
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Photos'}
        </button>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </form>

      {photos.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Selected Photos:</h3>
          <ul>
            {photos.map((photo, index) => (
              <li key={index} className="text-gray-600">
                {photo.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
