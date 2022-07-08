import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "./modal.css";

const Modal = ({ open, onClose, children }) => {
  const childRef = useRef(null);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={childRef}
        className={`fixed inset-0 z-10 overflow-y-auto`}
        open={open}
        onClose={onClose ? onClose : () => {}}
      >
        <div className={`flex items-center justify-center min-h-screen`}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-70 p-6 md:p-0" />
          </Transition.Child>

          <div ref={childRef}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="rounded-lg my-6 p-4 md:p-6 w-screen-95 md:w-screen-60 modal">{children}</div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
