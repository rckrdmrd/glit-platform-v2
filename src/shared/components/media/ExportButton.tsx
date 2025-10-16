import React, { useState } from 'react';
import { Download, FileText, FileImage, Share2 } from 'lucide-react';

export type ExportFormat = 'png' | 'jpg' | 'pdf' | 'json' | 'html';

interface ExportButtonProps {
  onExport: (format: ExportFormat) => void;
  availableFormats?: ExportFormat[];
  className?: string;
  label?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  onExport,
  availableFormats = ['png', 'jpg', 'pdf'],
  className = '',
  label = 'Export',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatIcons: Record<ExportFormat, React.ReactNode> = {
    png: <FileImage className="w-4 h-4" />,
    jpg: <FileImage className="w-4 h-4" />,
    pdf: <FileText className="w-4 h-4" />,
    json: <FileText className="w-4 h-4" />,
    html: <FileText className="w-4 h-4" />,
  };

  const formatLabels: Record<ExportFormat, string> = {
    png: 'PNG Image',
    jpg: 'JPG Image',
    pdf: 'PDF Document',
    json: 'JSON Data',
    html: 'HTML File',
  };

  const handleExport = (format: ExportFormat) => {
    onExport(format);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-detective-orange text-white rounded-detective hover:bg-detective-orange-dark transition-colors font-medium"
      >
        <Download className="w-5 h-5" />
        {label}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-detective shadow-lg border border-gray-200 overflow-hidden z-20">
            {availableFormats.map((format) => (
              <button
                key={format}
                onClick={() => handleExport(format)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-detective-bg transition-colors text-left"
              >
                {formatIcons[format]}
                <span className="text-detective-text font-medium">
                  {formatLabels[format]}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
