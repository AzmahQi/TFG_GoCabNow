import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useRef, cloneElement } from 'react';


//modal
export function Modal({ triggerElement, modalContent, buttonText }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleTriggerClick = () => {
    openModal();
  };

  return (
    <>
      {cloneElement(triggerElement, { onClick: handleTriggerClick})}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={closeModal}>
        <div className="flex items-center justify-center min-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="fixed inset-0 bg-black/70" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="fixed inset-0 flex items-center justify-center">
                <div className="p-6 rounded-2xl w-full max-w-md text-left shadow-xl">
                  {modalContent}

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
//buttons
export function Button({  children, onClick, className, size, color, disabled  }){
// Define size classes based on the size prop
const sizeClasses =
size === 'small'
  ? 'text-sm px-3 py-1'
  : size === 'large'
  ? 'text-lg px-6 py-3'
  : 'text-base px-4 py-2'; // Medium is the default size

// Define color classes based on the color prop
const colorClasses = (() => {
switch (color) {
  case 'primary':
    return 'bg-blue-500 hover:bg-blue-600 focus:border-blue-300';
  case 'secondary':
    return 'bg-gray-500 hover:bg-gray-600 focus:border-gray-300';
  case 'success':
    return 'bg-green-500 hover:bg-green-600 focus:border-green-300';
  case 'danger':
    return 'bg-red-500 hover:bg-red-600 focus:border-red-300';
  case 'disabled':
    return 'bg-gray-300 text-gray-500 cursor-not-allowed';
  default:
    return 'bg-blue-500 hover:bg-blue-600 focus:border-blue-300';
}
})();
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${sizeClasses} ${colorClasses} ${className}`}
    >
      {children}
    </button>
  );
};



