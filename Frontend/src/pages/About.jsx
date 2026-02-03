import { Button, ButtonB } from "../components/Button.jsx";
import { motion } from "framer-motion";
import Theater from "../assets/Theater.jfif";
import Female from "../assets/Female.jfif";
import Bangalore from "../assets/Bangalore.jfif";
import Counter from "../components/Counter";
import Heart from "../assets/heartlogo.png";
import Design from "../assets/WoncraftDesign.png";
import Vector from "../assets/Vector.png";
import Premium from "../assets/Premium.png";
import Health from "../assets/Health.png";
import designs from "../assets/99designs.png";
import Butterfly from "../assets/Butterfly.png";
import Check from "../assets/Check.png";
import digi from "../assets/digi.png";
import Drug from "../assets/Drug.png";
import Hub from "../assets/Hub.png";
import HVector from "../assets/HVector.png";
import inspiration from "../assets/inspiration.png";
import Letter from "../assets/Letter.png";
import Looka from "../assets/Looka.png";
import mental from "../assets/mental.png";
import negocio from "../assets/negocio.png";
import Pikbest from "../assets/Pikbest.png";
import Provider from "../assets/Provider.png";
import Saputra from "../assets/Saputra.png";
import Shield from "../assets/shield.png";
import Template from "../assets/Template.png";
import Vital from "../assets/Vital.png";

function About() {
  const logos = [
    {
      src: Butterfly,
      alt: "Butterfly",
    },
    {
      src: mental,
      alt: "mental",
    },
    {
      src: negocio,
      alt: "negocio",
    },
    {
      src: Template,
      alt: "Template",
    },
    {
      src: Saputra,
      alt: "Saputra",
    },
    {
      src: Letter,
      alt: "Letter",
    },
    {
      src: Provider,
      alt: "Provider",
    },
    {
      src: Design,
      alt: "CareHub",
    },
    {
      src: Vector,
      alt: "Heart Health",
    },
    {
      src: Health,
      alt: "MediCare",
    },
    {
      src: Vital,
      alt: "Vital",
    },
    {
      src: Drug,
      alt: "Drug",
    },
    {
      src: Premium,
      alt: "Pharmacy",
    },
    {
      src: Hub,
      alt: "Hub",
    },
    {
      src: designs,
      alt: "designs",
    },
    {
      src: Check,
      alt: "Check",
    },
    {
      src: Shield,
      alt: "Shield",
    },
    {
      src: inspiration,
      alt: "inspiration",
    },
    {
      src: digi,
      alt: "digi",
    },
    {
      src: HVector,
      alt: "HVector",
    },
    {
      src: Looka,
      alt: "Looka",
    },
    {
      src: Pikbest,
      alt: "Pikbest",
    },
  ];

  return (
    <div>
      <div className="absolute left-0 top-0 w-full h-full bg-white pt-50 dark:bg-gray-900 -z-10"></div>

      <h2 className="text-center text-cyprus text-5xl font-bold dark:text-cloud-white">
        About
      </h2>

      <p className="text-black opacity-65 dark:text-white text-lg text-center my-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis, <br className="hidden sm:inline-block" /> pulvinar dapibus leo.
      </p>

      <div className="flex flex-col-reverse sm:flex-row mx-auto w-9/10 sm:w-5/6 gap-10 mt-20 m-5 overflow-hidden">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -150, y: 50 },
            show: {
              opacity: 1,
              x: 0,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="sm:w-1/2 w-full"
        >
          <h2 className="text-cyprus text-4xl font-bold dark:text-cloud-white leading-tight">
            Committed to Excellence in Healthcare
          </h2>

          <p className="text-black opacity-65 dark:text-white text-lg my-6 leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <p className="text-black opacity-65 dark:text-white text-lg my-6 leading-7">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum sed ut perspiciatis.
          </p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 150 },
              show: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="p-4 rounded-xl h-40 shadow-sm shadow-gray-600 dark:shadow-gray-200/20 flex justify-around items-center"
          >
            <h1 className="text-4xl dark:text-cloud-white text-cyprus text-center font-bold">
              <Counter end={25} />+
              <p className="text-black opacity-65 dark:text-white my-3 text-lg">
                Years of Experience
              </p>
            </h1>

            <h1 className="text-4xl dark:text-cloud-white text-cyprus text-center font-bold">
              <Counter end={50000} />+
              <p className="text-black opacity-65 dark:text-white my-3 text-lg">
                Patients Treated
              </p>
            </h1>
          </motion.div>

          <div className="my-9 hidden sm:flex gap-5">
            <Button
              text="Meet Our Doctors"
              to="/"
              className="py-4 px-7 inline-block font-bold hover:-translate-y-1 transition-all ease-in-out duration-200"
            />

            <ButtonB
              text="View Our Services"
              to="/services"
              className="inline-block text-cyprus hover:text-cloud-white hover:border-teal-800 dark:text-cloud-white dark:border-teal-700 hover:-translate-y-1 transition-all ease-in-out duration-200"
            />
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: 150, y: 50 },
            show: { opacity: 1, x: 0, y: 0 },
          }}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="sm:w-1/2 w-full flex flex-col gap-5"
        >
          <img
            loading="lazy"
            src={Female}
            alt="State of the Art"
            className="aspect-[3/2] w-full object-cover rounded-2xl"
          />

          <div className="grid grid-cols-2 gap-4">
            <img
              loading="lazy"
              src={Theater}
              alt="facility"
              className="aspect-[4/3] w-full object-cover rounded-2xl"
            />
            <img
              loading="lazy"
              src={Bangalore}
              alt="facility"
              className="aspect-[4/3] w-full object-cover rounded-2xl"
            />
          </div>
        </motion.div>
      </div>

      <motion.hr
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
        className="text-gray-200 dark:text-gray-800 my-8 mx-auto w-9/10 sm:w-5/6"
      />

      <motion.h2
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
        className="text-center text-cyprus text-4xl dark:text-cloud-white"
      >
        Accreditations & Certifications
      </motion.h2>

      <motion.p
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
        className="text-black opacity-65 dark:text-white text-lg text-center my-4"
      >
        We are proud to be accredited by leading healthcare organizations
      </motion.p>

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
        className="scroll-container overflow-x-hidden w-full my-15"
      >
        <div
          className="scroll-content flex gap-8 p-8"
          style={{
            animation: "scrollX 120s linear infinite",
            width: "max-content",
          }}
        >
          {[...logos, ...logos].map((item, index) => (
            <div
              key={index}
              className="group flex items-center justify-center rounded-xl w-40 h-24 p-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-200"
            >
              <img
                loading="lazy"
                src={item.src}
                alt={item.alt}
                className="size-40 rounded-full object-contain filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default About;
