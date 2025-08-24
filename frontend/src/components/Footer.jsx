import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">AqilLabs</h2>
          <p className="text-gray-400">
            Custom Software Solutions Built for Your Business
          </p>
          <div className="flex gap-3 mt-3">
            <a href="#" className="hover:text-white">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/aqillabs-ra/posts/?feedView=all" className="hover:text-white">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Services</h3>
          <ul className="space-y-1">
            <li><p href="#" >Web Development</p></li>
            <li><p href="#" >Mobile Apps</p></li>
            <li><p href="#" >UI/UX Design</p></li>
            <li><p href="#" >Digital Marketing</p></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
          <ul className="space-y-1">
            <li><p href="/about" >About</p></li>
            <li><p href="#" >Team</p></li>
            <li><p href="#" >Careers</p></li>
            <li><p href="#" >Contact</p></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Legal</h3>
          <ul className="space-y-1">
            <li><p href="#" >Privacy Policy</p></li>
            <li><p href="#" >Terms of Service</p></li>
            <li><p href="#" >Cookie Policy</p></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-xm">
        © {new Date().getFullYear()} AqilLabs. All rights reserved.
      </div>
    </footer>
  );
}
