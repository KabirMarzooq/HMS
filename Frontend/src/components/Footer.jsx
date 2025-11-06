function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-teal-50 px-30">
        <hr className="text-gray-200" />

        <div className="pt-30 grid grid-cols-3 gap-8">
          <div>
            <a
              href="/"
              className="text-cyprus text-2xl flex items-center group w-28"
            >
              <i class="fa-solid fa-user-nurse mr-3 text-2xl text-teal-800 group-hover:text-cyprus transition-all ease-in duration-200"></i>
              <p className="font-semibold italic font-logo py-0.5">Oncura</p>
            </a>

            <p className="text-cyprus text-sm font-mono mt-5">
              <span className="font-semibold">Address: </span><br />
               A108 Adam Street New York, <br /> NY 535022
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <p className="leading-8 text-cyprus text-sm font-mono">
              <span className="font-semibold">Phone:</span> +234 5589 55488 55
              <br />
              <span className="font-semibold">Email:</span> info@example.com
              <br />
            </p>
          </div>

          <div>
            <i class="fa-brands fa-facebook p-3 mr-2 text-lg text-gray-500 border-1 border-gray-500 hover:text-cyprus hover:border-cyprus hover:scale-110 rounded-full transition-all ease-in duration-200"></i>
            <i class="fa-brands fa-instagram p-3 mr-2 text-lg text-gray-500 border-1 border-gray-500 hover:text-cyprus hover:border-cyprus hover:scale-110 rounded-full transition-all ease-in duration-200"></i>
            <i class="fa-brands fa-x-twitter p-3 mr-2 text-lg text-gray-500 border-1 border-gray-500 hover:text-cyprus hover:border-cyprus hover:scale-110 rounded-full transition-all ease-in duration-200"></i>
            <i class="fa-brands fa-linkedin-in p-3 text-lg text-gray-500 border-1 border-gray-500 hover:text-cyprus hover:border-cyprus hover:scale-110 rounded-full transition-all ease-in duration-200"></i>
          </div>
        </div>

        <hr className="text-gray-200 my-5" />

        <div className="text-center text-cyprus py-3">
          <small className="text-base">
            &copy; {currentYear} Oncura Hospital Management System. All Rights
            Reserved.
          </small>
          <br />
          <small>Designed by someone</small>
        </div>
      </footer>
    </>
  );
}

export default Footer;
