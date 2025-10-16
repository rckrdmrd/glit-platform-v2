import React, { useState, useRef, useCallback } from 'react';
import { Crop, RotateCw, ZoomIn, ZoomOut, Check, X } from 'lucide-react';

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
  aspectRatio?: number; // e.g., 16/9, 1, 4/3
  className?: string;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  onCropComplete,
  onCancel,
  aspectRatio = 1,
  className = '',
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleCrop = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on aspect ratio
    const targetWidth = 800;
    const targetHeight = targetWidth / aspectRatio;
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, targetWidth, targetHeight);

    // Apply transformations
    ctx.save();
    ctx.translate(targetWidth / 2, targetHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Draw image centered
    ctx.drawImage(
      image,
      -image.width / 2,
      -image.height / 2,
      image.width,
      image.height
    );

    ctx.restore();

    // Get cropped image as data URL
    const croppedImageUrl = canvas.toDataURL('image/png');
    onCropComplete(croppedImageUrl);
  }, [zoom, rotation, aspectRatio, onCropComplete]);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className={`bg-white rounded-detective shadow-lg p-6 ${className}`}>
      <h3 className="text-detective-text font-bold text-lg mb-4">Crop Image</h3>

      <div className="mb-4">
        <div className="relative bg-gray-100 rounded-detective overflow-hidden flex items-center justify-center"
             style={{ aspectRatio: aspectRatio }}>
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Crop preview"
            className="max-w-full max-h-full"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transition: 'transform 0.2s ease',
            }}
            crossOrigin="anonymous"
          />
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="space-y-4">
        {/* Zoom Control */}
        <div>
          <label className="flex items-center gap-2 text-detective-text font-medium mb-2">
            <ZoomIn className="w-4 h-4" />
            Zoom: {zoom.toFixed(1)}x
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-detective-orange"
            />
            <button
              onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rotation Control */}
        <div>
          <label className="flex items-center gap-2 text-detective-text font-medium mb-2">
            <RotateCw className="w-4 h-4" />
            Rotation: {rotation}°
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRotate}
              className="px-4 py-2 bg-detective-blue text-white rounded-detective hover:bg-detective-blue/90 transition-colors font-medium"
            >
              Rotate 90°
            </button>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="flex-1 accent-detective-orange"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={handleCrop}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-detective-orange text-white rounded-detective hover:bg-detective-orange-dark transition-colors font-medium"
          >
            <Check className="w-5 h-5" />
            Apply Crop
          </button>
          <button
            onClick={onCancel}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-detective-text rounded-detective hover:bg-gray-300 transition-colors font-medium"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
