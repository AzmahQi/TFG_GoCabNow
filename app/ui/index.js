'use client'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, cloneElement } from 'react';
import Image from "next/image";
import ImageLoader from '@/app/hooks/imageLoader'
import userImage from "/public/img/user.webp"
import Logo from "/public/img/logo.webp"
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
      {cloneElement(triggerElement, { onClick: handleTriggerClick })}
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
              <Dialog.Panel className="fixed flex items-center justify-center">
                <div className="bg-blue-950 p-6 rounded-lg w-full max-w-md text-left relative">
                  <div className="flex p-1 justify-end">
                    {/* Smaller close button */}
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-gray-300 p-1 ring ring-gray-500 rounded-full hover:text-gray-700 focus:ring-gray-700 text-sm"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {modalContent}
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
    return 'bg-blue-500 shadow-lg hover:bg-blue-600 focus:border-blue-900';
  case 'secondary':
    return 'bg-gray-500 hover:bg-gray-600 focus:border-gray-300';
  case 'tertiary':
    return 'tertiary text-white hover:bg-yellow-500 focus:border-gray-300 font-extrabold text-xl decoration-[#50d71e]'
  case 'success':
    return 'bg-green-500 hover:bg-green-600 focus:border-green-300';
  case 'danger':
    return 'bg-red-500 hover:bg-red-600 focus:border-red-300';
  case 'disabled':
    return 'bg-gray-300 text-gray-500 cursor-not-allowed';
  default:
    return 'bg-white text-dark hover:bg-gray-500/30 focus:border-gray-500 font-extrabold text-xl';
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

export function DefaultUserImage (){
  return(
    <Image loader={ImageLoader} src={userImage} width={40} height={40} alt="user"/>
  )
}
export function LogoImage (){
  return(
    <Image loader={ImageLoader} src={Logo} width={60} height={60} className="hover:scale-150 transition-all duration-500 cursor-pointer" alt="logo"/>
  )
}
export function getStatusColors(status) {
  switch (status) {
    case 'PENDING':
      return { text: 'text-yellow-500', bg: 'bg-yellow-100', hoverBg: 'hover:bg-yellow-200' };
    case 'CONFIRMED':
      return { text: 'text-green-500', bg: 'bg-green-100', hoverBg: 'hover:bg-green-200' };
    case 'CANCELLED':
      return { text: 'text-red-500', bg: 'bg-red-100', hoverBg: 'hover:bg-red-200' };
    case 'FULFILLED':
      return { text: 'text-blue-500', bg: 'bg-blue-100', hoverBg: 'hover:bg-blue-200' };
    case 'CLOSED':
      return { text: 'text-gray-500', bg: 'bg-gray-100', hoverBg: 'hover:bg-gray-200' };
    default:
      return { text: '', bg: '', hoverBg: '' };
  }
}

