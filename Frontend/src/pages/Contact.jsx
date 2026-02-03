import { motion } from "framer-motion";

function Contact() {
  const contacts = [
    {
      iconClass: "fa-solid fa-location-dot px-4",
      contact: "Our Location",
      location: "4952 Hilltop Dr, Anytown, CA 90210",
    },
    {
      iconClass: "fa-regular fa-envelope-open",
      contact: "Email Us",
      location: "info@example.com",
    },
    {
      iconClass: "fa-solid fa-phone",
      contact: "Call Us",
      location: "+1 (555) 123-4567",
    },
    {
      iconClass: "fa-regular fa-clock",
      contact: "Working Hours",
      location: "Monday-Saturday: 9AM - 7PM",
    },
  ];

  const icons = [
    "fa-brands fa-facebook",
    "fa-brands fa-x-twitter",
    "fa-brands fa-instagram",
    "fa-brands fa-linkedin",
    "fa-brands fa-youtube",
  ];

  return (
    <div className="m-2">
      <div className="absolute left-0 top-0 w-full h-full bg-white pt-50 dark:bg-gray-900 -z-10"></div>

      <h2 className="text-center text-cyprus text-5xl font-bold dark:text-cloud-white">
        Contact
      </h2>

      <p className="text-black opacity-65 dark:text-white text-lg text-center my-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis, <br className="hidden sm:inline-block" />{" "}
        pulvinar dapibus leo.
      </p>

      <div className="w-full flex flex-col sm:flex-row my-15 gap-8 pt-10 items-start">
        <div className="flex flex-col w-full sm:w-2/5 sm:ml-10 bg-linear-to-r from-teal-800 to-cyprus dark:bg-linear-to-r dark:from-gray-800/75 dark:to-gray-900 shadow-sm dark:shadow-gray-200/20 shadow-gray-900/20 p-10 rounded-3xl">
          <h2 className="text-cloud-white sm:text-4xl sm:font-bold text-3xl">
            Contact Information
          </h2>

          <p className="text-cloud-white text-sm my-5">
            Dignissimos deleniti accusamus rerum voluptate. Dignissimos rerum
            sit maiores reiciendis voluptate inventore ut.
          </p>

          <div>
            {contacts.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-linear-to-r from-cyprus/20 to-teal-800/20 dark:bg-linear-to-r dark:from-gray-900/20 dark:to-gray-800/20 text-cloud-white rounded-xl p-5 my-8 hover:-translate-y-2 hover:brightness-125 transition-all ease-in-out duration-300"
              >
                <i
                  className={`text-center p-3 rounded-full bg-teal-600 mr-4 text-2xl ${item.iconClass}`}
                ></i>
                <div>
                  <p>{item.contact}</p>
                  <small className="text-sm">{item.location}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-50">
            <h2 className="text-cloud-white text-[18px] font-medium dark:text-teal-600">
              Follow Us
            </h2>

            <motion.div
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
              className="my-3"
            >
              {icons.map((icons) => (
                <i
                  key={icons}
                  className={`${icons} text-cloud-white text-center p-3 rounded-full bg-teal-600 mr-3 text-lg hover:-translate-y-1 hover:brightness-125 transition-all ease-in-out duration-300`}
                ></i>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-8 sm:w-3/5 w-full">
          <motion.iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13270134.526079647!2d-138.58675957604154!3d35.70705722834142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sng!4v1764780010974!5m2!1sen!2sng"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            variants={{
              hidden: { opacity: 0, y: 150 },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-2xl w-full max-w-[800px] h-[300px]"
          ></motion.iframe>

          <form
            action=""
            className="bg-cloud-white dark:bg-gray-950/5 p-10 dark:shadow-md dark:shadow-gray-800/20 shadow-sm shadow-gray-900/20 rounded-2xl"
          >
            <h2 className="text-cyprus text-[28px] font-medium dark:text-cloud-white">
              Send Us a Message
            </h2>

            <p className="text-gray-800/20 dark:text-cloud-white text-sm my-5">
              Lorem ipsum dolor sit amet consectetur adipiscing elit mauris
              hendrerit faucibus imperdiet nec eget felis.
            </p>

            <div className="relative my-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                className="border dark:border-white border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl text-cloud-white focus:outline-none
                 focus:border-teal-700 peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20"
              />
              <label
                htmlFor="name"
                className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Full Name
              </label>
            </div>

            <div className="relative my-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="border dark:border-white border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl text-cloud-white focus:outline-none
                 focus:border-teal-700 peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20"
              />
              <label
                htmlFor="email"
                className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email Address
              </label>
            </div>

            <div className="relative my-4">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                className="border dark:border-white border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl text-cloud-white focus:outline-none
                 focus:border-teal-700 peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20"
              />
              <label
                htmlFor="subject"
                className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Subject
              </label>
            </div>

            <div className="relative my-4">
              <textarea
                name="area"
                id="area"
                placeholder="Your Message"
                className="border dark:border-white border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl text-cloud-white focus:outline-none
                 focus:border-teal-700 peer placeholder-transparent h-48 focus:shadow-md focus:shadow-teal-700/20"
              ></textarea>
              <label
                htmlFor="area"
                className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Your Message
              </label>
            </div>

            <button className="w-full bg-teal-700 text-cloud-white font-bold text-lg group hover:shadow-lg hover:shadow-teal-700/20 p-3 rounded-xl transition-all ease-in-out duration-300">
              Send Message{" "}
              <i className="fa-solid fa-paper-plane group-hover:translate-x-1 transition-all ease-in-out duration-300"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
