import { useState, useRef } from 'react';

export default function UploadZone({ onImageSelect }) {
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef(null);

  function handleFile(file) {
    if (!file) return;
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PNG, JPG, or WEBP image.');
      return;
    }
    onImageSelect(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragover(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragover(true);
  }

  return (
    <div
      className={`upload-zone${dragover ? ' dragover' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragover(false)}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <span className="upload-icon">&#9639;</span>
      <p className="upload-text">Drop an ad creative here, or click to upload</p>
      <p className="upload-hint">PNG, JPG, WEBP — any ad platform format</p>
    </div>
  );
}
