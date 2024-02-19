import React from 'react';
import './Input.css';

const ImageViewer = ({ imageUrl, onClose }) => {
  return (
    <div className="image-viewer-overlay" onClick={onClose}>
      <div className="image-viewer-content">
        <img src={imageUrl} alt="Full size" />
      </div>
    </div>
  );
};

export default ImageViewer;
