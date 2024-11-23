// components/Footer.js

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#261C4A] text-white py-4 ">
      <div className="container mx-auto px-6 text-center">
        {/* Team Members */}
        <div className="mb-4">
          <h5 className="text-lg font-semibold text-[#6A48E3] mb-2">Team-2 Members:</h5>
          <p className="text-sm text-[#F8B400] mb-1">Hristo Baldzhiyski, Anastasiia Sariohlo ,Stefan Moser</p>
        </div>


        {/* Copyright */}
        <p className="text-xs text-[#F8B400]">
          &copy; {new Date().getFullYear()} Recipe App. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
