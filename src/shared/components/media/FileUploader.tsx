import React, { useState, useCallback } from 'react';
import { Upload, X, FileImage, FileVideo, FileAudio, File } from 'lucide-react';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  file: File;
}

interface FileUploaderProps {
  acceptedTypes?: string[];
  maxSizeMB?: number;
  onUpload: (files: UploadedFile[]) => void;
  multiple?: boolean;
  className?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  acceptedTypes = ['image/*', 'video/*', 'audio/*'],
  maxSizeMB = 50,
  onUpload,
  multiple = false,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      setError(`File ${file.name} exceeds ${maxSizeMB}MB limit`);
      return false;
    }

    const fileType = file.type;
    const isAccepted = acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        const baseType = type.split('/')[0];
        return fileType.startsWith(baseType);
      }
      return fileType === type;
    });

    if (!isAccepted) {
      setError(`File type ${fileType} is not accepted`);
      return false;
    }

    return true;
  };

  const processFiles = useCallback((files: FileList) => {
    setError(null);
    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        const uploadedFile: UploadedFile = {
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
          file,
        };
        newFiles.push(uploadedFile);
      }
    });

    if (newFiles.length > 0) {
      const updatedFiles = multiple ? [...uploadedFiles, ...newFiles] : newFiles;
      setUploadedFiles(updatedFiles);
      onUpload(updatedFiles);
    }
  }, [uploadedFiles, multiple, onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  const removeFile = useCallback((id: string) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== id);
    setUploadedFiles(updatedFiles);
    onUpload(updatedFiles);
  }, [uploadedFiles, onUpload]);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="w-8 h-8 text-detective-orange" />;
    if (type.startsWith('video/')) return <FileVideo className="w-8 h-8 text-detective-blue" />;
    if (type.startsWith('audio/')) return <FileAudio className="w-8 h-8 text-detective-gold" />;
    return <File className="w-8 h-8 text-detective-text-secondary" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-detective p-8 text-center transition-all ${
          isDragging
            ? 'border-detective-orange bg-detective-bg-secondary'
            : 'border-detective-text-secondary hover:border-detective-orange'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept={acceptedTypes.join(',')}
          multiple={multiple}
          onChange={handleFileSelect}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 mx-auto mb-4 text-detective-orange" />
          <p className="text-detective-text mb-2 font-medium">
            {isDragging ? 'Drop files here' : 'Drag & drop files or click to select'}
          </p>
          <p className="text-detective-text-secondary text-sm">
            Accepted: {acceptedTypes.join(', ')} (Max {maxSizeMB}MB)
          </p>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-detective">
          {error}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-detective-text">Uploaded Files:</h4>
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 bg-white rounded-detective shadow-card border border-gray-200"
            >
              {getFileIcon(file.type)}
              <div className="flex-1 min-w-0">
                <p className="text-detective-text font-medium truncate">{file.name}</p>
                <p className="text-detective-text-secondary text-sm">{formatFileSize(file.size)}</p>
              </div>
              {file.type.startsWith('image/') && (
                <img src={file.url} alt={file.name} className="w-16 h-16 object-cover rounded" />
              )}
              <button
                onClick={() => removeFile(file.id)}
                className="p-2 text-detective-danger hover:bg-red-50 rounded-full transition-colors"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
