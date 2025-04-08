import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#4A5B58] text-gray-400 py-4 mt-auto">
        <div className=" text-center  text-sm flex justify-center items-center">
           <p> © {currentYear} CallAssistant. All rights reserved.</p>
       
        {/* Optionally add links here */}
        {/* <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-gray-200">Privacy Policy</a>
          <a href="#" className="hover:text-gray-200">Terms of Service</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
