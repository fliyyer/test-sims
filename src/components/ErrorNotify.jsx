import React from 'react';

const ErrorNotify = ({ message, onClose, show }) => {
    if (!show) return null;
    return (
        <div className="fixed bottom-4 right-8 z-50 p-2 px-4 bg-red-100 border border-red-400  text-primary text-sm rounded-md shadow-lg transition-transform transform">
            <div className="flex justify-between items-center">
                <p>{message}</p>
                <button
                    onClick={onClose}
                    className="ml-4 text-primary text-base"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ErrorNotify;
