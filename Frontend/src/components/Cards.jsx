import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ButtonC } from "./Button.jsx";

const childVariant = {
  hidden: { opacity: 0, y: 150 },
  show: { opacity: 1, y: 0 },
};

export function FieldCards({ image, alt, iconClass, title, description }) {
  return (
    <motion.div
      variants={childVariant}
      className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200 dark:inset-shadow-2xs dark:shadow-white dark:inset-shadow-white dark:shadow-sm dark:hover:shadow-md"
    >
      <div className="overflow-hidden rounded-t-xl">
        <img
          loading="lazy"
          src={image}
          alt={alt}
          className="object-cover w-full h-50 group-hover/card:scale-[1.05] transition-all ease-in duration-200"
        />
      </div>

      <div className="px-7 pb-9 pt-18 flex flex-col relative">
        <i
          className={`${iconClass} text-3xl text-cloud-white bg-cyprus p-3 rounded-full absolute -top-7 left-7 shadow-teal-800 shadow-lg`}
        ></i>

        <p className="font-semibold text-2xl text-cyprus">{title}</p>

        <small className="text-sm text-black opacity-65 my-7 leading-6">
          {description}
        </small>

        <Link
          to="/"
          className="text-cyprus font-semibold group/link hover:text-teal-600 transition-all ease-in duration-200 w-28"
        >
          Learn More{" "}
          <i className="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-1 transition-all ease-in duration-200"></i>
        </Link>
      </div>
    </motion.div>
  );
}

export function FeaturedCards({ iconClass, features, description, items }) {
  return (
    <motion.div
      variants={childVariant}
      className="bg-white border-t-4 border-cyprus rounded-3xl flex flex-col p-5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all ease-in duration-200"
    >
      <div className="py-5">
        <i
          className={`${iconClass} text-5xl text-cyprus bg-teal-100 p-4 rounded-full`}
        ></i>
      </div>

      <p className="font-semibold text-2xl text-cyprus">{features}</p>

      <small className="text-sm text-black opacity-65 my-7 leading-6">
        {description}
      </small>

      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="text-sm text-gray-700 leading-8 flex items-center"
          >
            <i className="fa-solid fa-circle-check text-cyprus pr-2"></i>
            {item}
          </li>
        ))}
      </ul>

      <Link
        to="/"
        className="text-teal-600 font-semibold group/link hover:text-cyprus transition-all ease-in duration-200 w-28 my-4"
      >
        Learn More{" "}
        <i className="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-2 transition-all ease-in duration-200"></i>
      </Link>
    </motion.div>
  );
}

export function DoctorsCards({
  image,
  alt,
  name,
  role,
  experience,
  status,
  ratings,
}) {
  const getStatusStyles = () => {
    if (!status || status.toLowerCase() === "available") {
      return {
        text: "AVAILABLE",
        bg: "bg-green-600",
      };
    }

    if (status.toLowerCase() === "in surgery") {
      return {
        text: "IN SURGERY",
        bg: "bg-amber-300",
      };
    }

    return {
      text: status.toUpperCase(),
      bg: "bg-gray-700/75",
    };
  };

  const badge = getStatusStyles();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;

    let hasHalfStar = false;
    let totalFull = fullStars;

    if (decimal >= 0.25 && decimal <= 0.75) {
      hasHalfStar = true;
    } else if (decimal > 0.75) {
      totalFull += 1;
    }

    for (let i = 0; i < totalFull; i++) {
      stars.push(
        <i
          key={`full-${i}`}
          className="fa-solid fa-star text-amber-300 text-sm"
        ></i>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <i
          key="half"
          className="fa-solid fa-star-half-stroke text-amber-300 text-sm"
        ></i>
      );
    }

    const empty = 5 - (totalFull + (hasHalfStar ? 1 : 0));
    for (let i = 0; i < empty; i++) {
      stars.push(
        <i
          key={`empty-${i}`}
          className="fa-regular fa-star text-amber-300 text-sm"
        ></i>
      );
    }

    return stars;
  };

  return (
    <motion.div
      variants={childVariant}
      className="bg-white rounded-xl group/card hover:shadow-md hover:-translate-y-1 transition-all ease-in duration-200 dark:shadow-white"
    >
      <div className="overflow-hidden rounded-t-xl relative">
        <img
          loading="lazy"
          src={image}
          alt={alt}
          className="object-cover object-top rounded-t-xl w-full h-70 group-hover/card:scale-[1.05] transition-all ease-in duration-200"
        />

        <p
          className={`text-cloud-white text-xs font-bold px-4 py-1 rounded-full absolute top-4 right-4 ${badge.bg}`}
        >
          {badge.text}
        </p>
      </div>

      <div className="px-7 py-5 flex flex-col">
        <p className="font-normal text-xl text-cyprus my-3">{name}</p>

        <p className="font-[600] text-md text-teal-800">{role}</p>

        <small className="text-sm text-black opacity-65">{experience}</small>

        <div className="my-5 flex items-center">
          {renderStars(ratings)}
          <small className="text-sm text-black opacity-65 px-2">
            ({ratings})
          </small>
        </div>

        <ButtonC text="Book Appointment" to="/login" className="rounded-xl" />
      </div>
    </motion.div>
  );
}

export function ServicesCards({
  iconClass,
  title,
  description,
  to = "/",
  link,
}) {
  return (
    <motion.div
      variants={childVariant}
      className="bg-white shadow-lg flex flex-col items-center rounded-xl p-5 group/cad hover:shadow-2xl hover:-translate-y-2 transition-all ease-in duration-300 dark:shadow-white dark:shadow-sm dark:hover:shadow-md"
    >
      <div className="py-5">
        <i
          class={`${iconClass} fa-solid fa-heart-pulse text-4xl text-cyprus group-hover/cad:bg-cyprus group-hover/cad:text-cloud-white transition-all ease-in duration-300 bg-teal-100 p-5 rounded-full`}
        ></i>
      </div>

      <p className="text-cyprus font-mono text-xl py-2 font-medium">{title}</p>

      <small className="text-[16px] text-center text-black opacity-75 py-2">
        {description}
      </small>

      <Link
        to={to}
        className="text-teal-600 font-semibold group/link hover:text-cyprus transition-all ease-in duration-200 my-4"
      >
        {link}{" "}
        <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-2 transition-all ease-in duration-200"></i>
      </Link>
    </motion.div>
  );
}

export function HelpCards({
  iconClass,
  title,
  call,
  location,
  open,
  className = "",
}) {
  return (
    <motion.div
      variants={childVariant}
      className={`${className} bg-white inset-shadow-2xs shadow-lg border-l-4 border-l-cyprus flex flex-col items-center rounded-xl p-5 hover:shadow-2xl hover:-translate-y-1 transition-all ease-in duration-300`}
    >
      <div className="py-5">
        <i className={`${iconClass} text-4xl text-cyprus`}></i>
      </div>

      <p className="text-cyprus text-2xl py-2 font-medium">{title}</p>

      <small className="font-[550] text-center text-cyprus py-2">
        <i class="fa-solid fa-phone px-2"></i> {call}
      </small>

      <small className="text-[15px] text-center text-teal-800 py-2">
        <i class="fa-solid fa-location-dot px-2 text-cyprus"></i>
        {location}
      </small>

      <small className="text-sm font-[550] text-center text-cyprus/60 py-2">
        {open}
      </small>

      <a
        href={`tel:${call}`}
        className="inline-block bg-teal-800 rounded-full py-2 px-4 my-2 text-cloud-white hover:-translate-y-1 hover:bg-cyprus transition-all ease-in-out duration-300"
      >
        Call Now
      </a>
    </motion.div>
  );
}

export function ServiceCards({
  iconClass,
  features,
  description,
  items,
  to = "/services",
  className = "",
}) {
  return (
    <Link to={to}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100 },
          show: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`bg-white dark:bg-gray-900 border-0 hover:border hover:border-cyprus rounded-3xl flex flex-col p-5 shadow-sm group/cad dark:shadow-gray-200/20 hover:shadow-lg hover:-translate-y-3 transition-all ease-in-out duration-200 ${className}`}
      >
        <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-teal-100 p-10 my-5">
          <span
            className="
      absolute inset-0 rounded-xl bg-cyprus 
      scale-0 group-hover/cad:scale-100 
      transition-all duration-300 ease-in-out
    "
          ></span>

          <i
            className={`relative z-10 text-3xl text-cyprus group-hover/cad:text-cloud-white ${iconClass}`}
          ></i>
        </div>

        <p className="font-semibold text-2xl text-cyprus dark:text-teal-700">
          {features}
        </p>

        <small className="text-sm text-black opacity-65 my-7 leading-6 dark:text-white">
          {description}
        </small>

        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              className="text-sm text-gray-700 leading-8 flex items-center dark:text-cloud-white"
            >
              <i className="fa-solid fa-circle-check text-cyprus pr-2 dark:text-teal-700"></i>
              {item}
            </li>
          ))}
        </ul>

        <span className="text-teal-600 font-semibold hover:text-cyprus dark:hover:text-teal-700 transition-all ease-in duration-200 w-28 my-4">
          Learn More{" "}
          <i className="fa-solid fa-arrow-right fa-sm group-hover/cad:translate-x-2 transition-all ease-in duration-200"></i>
        </span>
      </motion.div>
    </Link>
  );
}

export function EmergencyCards({
  iconClass,
  features,
  description,
  items,
  to = "/contact",
}) {
  return (
    <Link to={to}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 300 },
          show: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full sm:w-5/6 mx-auto items-center text-center p-3 sm:p-10 bg-white dark:bg-gray-900 border-2 border-cyprus rounded-3xl flex flex-col shadow-sm group/cad dark:shadow-gray-200/20 hover:shadow-lg hover:-translate-y-3 transition-all ease-in-out duration-200 mb-15"
      >
        <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-teal-100 p-10 my-5">
          <span
            className="
      absolute inset-0 rounded-xl bg-cyprus 
      scale-0 group-hover/cad:scale-100 
      transition-all duration-300 ease-in-out
    "
          ></span>

          <i
            className={`relative z-10 text-3xl text-cyprus group-hover/cad:text-cloud-white ${iconClass}`}
          ></i>
        </div>

        <p className="font-semibold text-2xl text-cyprus dark:text-teal-700 font-mono">
          {features}
        </p>

        <small className="text-base text-black opacity-65 my-7 leading-6 dark:text-white">
          {description}
        </small>

        <div className="w-full">
          <ul className="text-left">
            {items.map((item, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 leading-8 flex items-center dark:text-cloud-white"
              >
                <i className="fa-solid fa-circle-check text-cyprus pr-2 dark:text-teal-700"></i>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-5 mt-5">
          <Link to="/contact">
            <button className="font-bold inline-block bg-red-600 hover:bg-red-700 hover:-translate-y-2 transition-all ease-in-out duration-300 rounded-full py-4 px-7 text-cloud-white cursor-pointer">
              <i class="fa-solid fa-phone px-2 text-cloud-white"></i> Call
              Emergency
            </button>
          </Link>

          <Link to="/contact">
            <button className="font-bold inline-block border-2 border-cyprus hover:text-cloud-white group/button hover:bg-cyprus hover:-translate-y-2 transition-all ease-in-out duration-300 rounded-full py-4 px-7 text-cyprus cursor-pointer">
              <i class="fa-solid fa-location-dot px-2 text-cyprus group-hover/button:text-cloud-white"></i>{" "}
              Get Directions
            </button>
          </Link>
        </div>
      </motion.div>
    </Link>
  );
}

export function ScheduleCards() {
  return (
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
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="sm:w-1/2 w-full mx-auto shadow-sm dark:shadow-gray-200/20 shadow-gray-900/20 flex flex-col items-center justify-center text-center my-15 p-10 rounded-3xl bg-cloud-white dark:bg-gray-900"
    >
      <i className="fa-solid fa-calendar-check text-cyprus dark:text-teal-700 text-5xl py-5"></i>

      <p className="font-semibold text-3xl text-cyprus dark:text-teal-700 font-mono">
        Ready to Schedule Your Appointment?
      </p>

      <small className="text-base text-black opacity-65 my-5 leading-6 dark:text-white">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non
        proident.
      </small>

      <div className="flex gap-5 mt-5">
        <Link to="/login">
          <button className="font-bold inline-block bg-cyprus hover:bg-transparent border-2 border-cyprus hover:text-cyprus hover:-translate-y-1 transition-all ease-in-out duration-300 rounded-full py-4 px-7 text-cloud-white cursor-pointer">
            Book Now
          </button>
        </Link>

        <Link to="/contact">
          <button className="font-bold inline-block border-2 border-gray-700/20 hover:border-gray-800 hover:text-cloud-white group/button hover:bg-gray-800 hover:-translate-y-1 transition-all ease-in-out duration-300 rounded-full py-4 px-7 text-cyprus cursor-pointer">
            Contact Us
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
