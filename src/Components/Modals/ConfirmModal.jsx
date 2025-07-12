import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
    
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn btn-sm">Cancel</button>
          <button onClick={onConfirm} className="btn btn-sm btn-error text-white">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
