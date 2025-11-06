import { useState } from "react";

function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");

  const links = ["Home", "About", "Services", "Contact"];

  return (
    <div className="flex justify-center mb-50">
      <div className="bg-cloud-white w-5/6 rounded-full flex justify-between items-center fixed m-5 py-2 px-8 z-20 shadow-xl">
        <div>
          <a href="/" className="text-cyprus text-2xl flex">
            <i class="fa-regular fa-hospital p-1"></i>
            <p className="font-semibold italic font-logo py-0.5">Oncura</p>
          </a>
        </div>

        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className={`relative nav-link ${activeLink === link ? "active text-cyprus font-bold" : "hover:text-cyprus"}`}
              onClick={() => setActiveLink(link)}
            >
              {link}
            </a>
          ))}
        </div>

        <div>
          <a
            href="#_"
            className="relative inline-block overflow-hidden bg-cyprus rounded-full py-2 px-4 text-cloud-white group"
          >
            <span className="absolute z-0 w-64 h-64 mt-12 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-teal-800 left-0 top-0"></span>
            <span className="relative z-10">Appointment</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

// https://bootstrapmade.com/demo/MediTrust/
