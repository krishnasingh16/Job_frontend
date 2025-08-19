import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const FOoter = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-10 border-t text-2xl font-bold">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-3 md:mb-0">
          <h1 className="font-bold text-lg">Dream <span className="text-[#F83002]">Job</span></h1>
        </div>

        {/* Right Side - Copyright */}
        <div>© {new Date().getFullYear()} Dream <span className="text-[#F83002]">Job</span>. All rights reserved.</div>

        {/* Center - Social Icons */}
        <div className="flex space-x-4 mb-3 md:mb-0 text-lg">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FOoter;
