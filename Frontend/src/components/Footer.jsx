import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-teal-50 sm:px-30 flex flex-col px-10">
        <hr className="text-gray-200" />

        <div className="pt-30 sm:grid grid-cols-3 gap-8 flex flex-col">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 150 },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Link
              to="/"
              className="text-cyprus text-2xl flex items-center group w-28"
            >
              <i class="fa-solid fa-user-nurse mr-3 text-2xl text-teal-800 group-hover:text-cyprus transition-all ease-in duration-200"></i>
              <p className="font-semibold italic font-logo py-0.5">Oncura</p>
            </Link>

            <p className="text-cyprus text-sm font-mono mt-5">
              <span className="font-semibold">Address: </span>
              <br />
              A108 Adam Street New York, <br /> NY 535022
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 150 },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col justify-end"
          >
            <p className="leading-8 text-cyprus text-sm font-mono">
              <span className="font-semibold">Phone:</span> +234 5589 55488 55
              <br />
              <span className="font-semibold">Email:</span> info@example.com
              <br />
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 150 },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <i class="fa-brands fa-facebook p-3 mr-2 text-lg text-gray-500 border-1 border-gray-500 hover:text-cyprus hover:border-cyprus hover:scale-110 rounded-full cursor-pointer transition-all ease-in duration-200"></i>
            <i class="fa-brands fa-instagram p-3 mr-2 text-lg text-gray-500 border-1 border-gray-500 hover:text-cyprus hover:border-cyprus hover:scale-110 rounded-full cursor-pointer transition-all ease-in duration-200"></i>
            <i class="fa-brands fa-x-twitter p-3 mr-2 text-lg text-gray-500 border-1 border-gray-500 hover:text-cyprus hover:border-cyprus hover:scale-110 rounded-full cursor-pointer transition-all ease-in duration-200"></i>
            <i class="fa-brands fa-linkedin-in p-3 text-lg text-gray-500 border-1 border-gray-500 hover:text-cyprus hover:border-cyprus hover:scale-110 rounded-full cursor-pointer transition-all ease-in duration-200"></i>
          </motion.div>
        </div>

        <motion.hr
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-200 my-5"
        />

        <motion.div
          variants={{
            hidden: { opacity: 0, y: -150 },
            show: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center text-cyprus py-3"
        >
          <small className="text-base">
            &copy; {currentYear} Oncura Hospital Management System. All Rights
            Reserved.
          </small>
          <br />
          <small>Designed by someone</small>
        </motion.div>
      </footer>
    </>
  );
}

export default Footer;
