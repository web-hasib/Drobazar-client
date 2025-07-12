// src/Components/Modals/RejectModal.jsx
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

const RejectModal = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onSubmit(reason);
    setReason('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" /> {/* ✅ Updated overlay */}

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-base-300 rounded-xl shadow-lg w-full max-w-md p-6 z-50">
          <Dialog.Title className="text-lg font-bold mb-2">Reject Product</Dialog.Title>
          <p className="mb-2 text-sm text-base-content">Please provide a reason for rejection:</p>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Write rejection reason..."
          ></textarea>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="btn btn-sm btn-ghost">Cancel</button>
            <button onClick={handleConfirm} className="btn btn-sm btn-error">Reject</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RejectModal;
