import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { DetectiveButton } from '../base/DetectiveButton';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning',
}) => {
  const typeColors = {
    danger: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" showCloseButton={false}>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${type === 'danger' ? 'bg-red-500/10' : type === 'warning' ? 'bg-yellow-500/10' : 'bg-blue-500/10'}`}>
            <AlertTriangle className={`w-6 h-6 ${typeColors[type]}`} />
          </div>
          <p className="text-detective-text flex-1">{message}</p>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-700">
          <DetectiveButton variant="secondary" onClick={onClose}>
            {cancelText}
          </DetectiveButton>
          <DetectiveButton
            variant="primary"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </DetectiveButton>
        </div>
      </div>
    </Modal>
  );
};
