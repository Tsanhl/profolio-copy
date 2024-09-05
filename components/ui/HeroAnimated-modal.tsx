"use client";
import React from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./Animated-modal";
import { FaLinkedin } from "react-icons/fa"; // Import the LinkedIn icon from react-icons

export function HeroAnimatedModal() {
  return (
    <Modal>
      <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
        {/* Button with text and icon */}
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
        LinkedIn 
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-black z-20">
        <FaLinkedin size={17.5} />
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <div className="text-center">
            <a
              href="http://www.linkedin.com/in/hoi-lam-tsang-b10329287"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Visit my LinkedIn Profile
            </a>
          </div>
        </ModalContent>
        <ModalFooter className="flex justify-center">
          {/* Close button */}
          <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
            Close
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
