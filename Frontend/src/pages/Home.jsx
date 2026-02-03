import { Button, ButtonB, ButtonC } from "../components/Button.jsx";
import { motion } from "framer-motion";
import OperationTheatre from "../assets/Operation Theatre.jfif";
import {
  FieldCards,
  FeaturedCards,
  DoctorsCards,
  ServicesCards,
  HelpCards,
} from "../components/Cards.jsx";
import HeartFailure from "../assets/Heart Failure.jfif";
import Brain from "../assets/Brain.jfif";
import Bone from "../assets/Tailored.jfif";
import Child from "../assets/Child.jfif";
import Cancer from "../assets/Can.jfif";
import Ambulance from "../assets/Advanced.jfif";
import Skin from "../assets/PLINEST.jfif";
import Eye from "../assets/eye.jfif";
import Xray from "../assets/X-ray.jfif";
import estetica from "../assets/estética.jfif";
import Doctor from "../assets/Doctor.jfif";
import Facial from "../assets/Facial.jfif";
import love from "../assets/love.jfif";
import Fans from "../assets/Fans.jfif";
import Pagin from "../assets/Pagin.jfif";
import undefin from "../assets/undefin.jfif";
import undefine from "../assets/undefine.jfif";
import undefined from "../assets/undefined.jfif";

const parentVariant = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

function Home() {
  const services = [
    {
      icon: "fa-solid fa-heart-pulse",
      title: "Cardiology",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      icon: "fa-solid fa-lungs",
      title: "Pulmonology",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      icon: "fa-solid fa-capsules",
      title: "Diagnostics",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ];

  return (
    <>
      <div>
        <section className="max-w-screen-xl px-5 sm:w-xl md:mx-20">
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -100, y: 100 },
              show: {
                opacity: 1,
                x: 0,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-cyprus text-cloud-white sm:w-1/2 w-2/5 rounded-full text-center sm:text-sm text-xs py-2 font-[600]"
          >
            Leading Healthcare Specialists
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, x: -100, y: 100 },
              show: {
                opacity: 1,
                x: 0,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-cloud-white text-[min(7vw,55px)] text-balance font-bold my-8 leading-[min(8vw,55px)]"
          >
            Advanced Medical care for Your Family's Health
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, x: -100, y: 100 },
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
            className="text-cloud-white text-[clamp(14px, 2vw, 18px)] text-balance leading-[min(5vw,30px)]"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
            placeat necessitatibus quis, velit quisquam beatae.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: -100, y: 100 },
              show: {
                opacity: 1,
                x: 0,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="my-9 flex gap-5 justify-end sm:justify-normal"
          >
            <Button
              text="Book Appointment"
              to="/login"
              className="py-4 px-7 inline-block"
            />

            <ButtonB text="Explore Services" to="/services" />
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
            className="flex flex-col sm:flex-row gap-6"
          >
            <div className="flex items-center">
              <i class="fa-solid fa-clock text-teal-800 text-3xl p-1"></i>
              <div className="mx-2">
                <p className="text-violet-200 text-sm">Working Hours:</p>
                <p className="text-lg text-cloud-white font-bold">
                  Mon-Fri: 8AM-9PM
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <i class="fa-solid fa-phone text-teal-800 text-3xl p-1"></i>
              <div className="mx-2">
                <p className="text-violet-200 text-sm">Emergency Line:</p>
                <p className="text-lg text-cloud-white font-bold">
                  +234 (555)987-6543
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          variants={parentVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-9/10 sm:w-5/6 bg-black/75 p-10 flex gap-5 sm:gap-16 rounded-3xl m-10 mb-30 flex-col sm:flex-row"
        >
          {services.map((item, index) => (
            <motion.div key={index} variants={childVariant} className="flex">
              <div className="mt-3">
                <i
                  className={`${item.icon} bg-cyprus text-3xl p-3 text-teal-600 rounded-xl`}
                ></i>
              </div>

              <div className="mx-2">
                <p className="text-lg text-white my-1">{item.title}</p>
                <p className="text-violet-200 text-sm text-wrap">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        <section className="bg-white pt-20 overflow-hidden dark:bg-gray-950 dark:text-cloud-white">
          <div className="mx-auto w-9/10 sm:w-5/6">
            <div className="flex items-center gap-10 flex-col-reverse sm:flex-row">
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
                className="relative w-full"
              >
                <img
                  loading="lazy"
                  src={OperationTheatre}
                  alt="State of the Art facilities"
                  className="aspect-[4/3] w-full object-cover rounded-2xl shadow-md shadow-gray-400"
                />
                <div className="text-cloud-white bg-cyprus absolute right-10 -bottom-15 p-5 rounded-xl flex-col justify-center shadow-md shadow-gray-400">
                  <p className="font-bold text-4xl">25+</p>
                  <p>Years of excellence</p>
                </div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 150, y: 50 },
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
                className="w-full"
              >
                <h3 className="text-cyprus text-3xl text-wrap font-bold dark:text-teal-700">
                  Committed to Exceptional Patient <br />
                  Care
                </h3>

                <p className="text-cyprus opacity-70 text-wrap font-bold my-5 dark:text-teal-700">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi iure ab fugit, consequatur sapiente inventore in
                  ducimus earum voluptatem.
                </p>

                <p className="opacity-90 text-wrap">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat minima quam cupiditate dolore velit qui accusamus
                  eveniet sunt vel tenetur, accusantium ad rem deleniti Dolor.
                </p>

                <div className="my-15 flex gap-6 flex-col sm:flex-row">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 150 },
                      show: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    whileInView="show"
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="p-4 inset-shadow-2xs shadow-sm rounded-xl dark:shadow-gray-900 dark:inset-shadow-gray-900 hover:-translate-y-2 transition-all ease-out duration-300 hover:shadow-md"
                  >
                    <i className="fa-solid fa-heart-pulse text-3xl text-cyprus dark:text-teal-700"></i>

                    <p className="text-cyprus leading-12 font-semibold dark:text-teal-700">
                      Compassionate Care
                    </p>

                    <small className="text-sm text-gray-600 dark:text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </small>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 150 },
                      show: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    whileInView="show"
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="p-4 inset-shadow-2xs shadow-sm rounded-xl dark:shadow-gray-900 dark:inset-shadow-gray-900 hover:-translate-y-2 transition-all ease-out duration-300 hover:shadow-md"
                  >
                    <i className="fa-regular fa-star text-3xl text-cyprus dark:text-teal-700"></i>

                    <p className="text-cyprus leading-12 font-semibold dark:text-teal-700">
                      Medical Excellence
                    </p>

                    <small className="text-sm text-gray-600 dark:text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </small>
                  </motion.div>
                </div>

                <div className="mt-15 hidden sm:flex gap-5">
                  <Button
                    text="Learn More About Us"
                    to="/about"
                    className="inline-block rounded-xl py-4 px-7"
                  />

                  <ButtonB
                    text="Meet Our Team"
                    to="/"
                    className="inline-block rounded-xl text-cyprus hover:text-cloud-white hover:border-teal-800 dark:text-teal-700 dark:border-teal-700"
                  />
                </div>
              </motion.div>
            </div>

            <div className="mt-50 flex flex-col">
              <motion.h1
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
                className="text-cyprus text-center text-3xl font-bold headings relative dark:text-teal-700 "
              >
                Featured Departments
              </motion.h1>

              <motion.small
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
                className="text-sm text-black opacity-75 text-center mt-12 dark:text-cloud-white"
              >
                Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
                consectetur velit
              </motion.small>

              <motion.div
                variants={parentVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-7 mt-20"
              >
                <FieldCards
                  image={HeartFailure}
                  alt="Cognitive Heart Failure (CHF)"
                  iconClass="fa-solid fa-heart-pulse"
                  title="Cardiology"
                  description="Comprehensive cardiovascular care with advanced diagnostic
                      techniques and treatment options for heart conditions,
                      ensuring optimal cardiac health for all patients."
                />

                <FieldCards
                  image={Brain}
                  alt="Brain Surgeon Junction"
                  iconClass="fa-solid fa-brain"
                  title="Neurology"
                  description="Expert neurological care specializing in brain and nervous
                      system disorders, providing cutting-edge treatments and
                      compassionate support for neurological conditions."
                />

                <FieldCards
                  image={Bone}
                  alt="Experience Natural Healing Physiotherapy"
                  iconClass="fa-solid fa-bone"
                  title="Orthopedics"
                  description=" Advanced musculoskeletal care focusing on bones, joints,
                      and muscles with innovative surgical and non-surgical
                      treatment approaches for mobility restoration."
                />
              </motion.div>
              <motion.div
                variants={parentVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 my-7"
              >
                <FieldCards
                  image={Child}
                  alt="Child Specialist"
                  iconClass="fa-solid fa-baby"
                  title="Pediatrics"
                  description="  Specialized healthcare for children from infancy through
                      adolescence, offering comprehensive medical care in a
                      child-friendly environment with experienced pediatric
                      specialists."
                />

                <FieldCards
                  image={Cancer}
                  alt="Living Cancer Virus"
                  iconClass="fa-solid fa-ribbon"
                  title="Oncology"
                  description="Comprehensive cancer care with multidisciplinary approach,
                      offering advanced treatment options, clinical trials, and
                      compassionate support throughout the cancer journey."
                />

                <FieldCards
                  image={Ambulance}
                  alt="Advanced Hospital SEO services"
                  iconClass="fa-solid fa-truck-medical"
                  title="Emergency Care"
                  description=" Round-the-clock emergency medical services with rapid
                      response capabilities, state-of-the-art equipment, and
                      experienced emergency physicians for critical care."
                />
              </motion.div>
              <motion.div
                variants={parentVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-20"
              >
                <FieldCards
                  image={Skin}
                  alt="Microneedling Safe Practices"
                  iconClass="fa-solid fa-hand-dots"
                  title="Dermatology"
                  description="Extensive skin care services offering expert diagnosis and
                      treatment of various skin, hair, and nail conditions,
                      using advanced therapies to restore and maintain healthy,
                      radiant skin."
                />

                <FieldCards
                  image={Eye}
                  alt="Ophthalmology Simulation Training - cataract surgery"
                  iconClass="fa-regular fa-eye"
                  title="Optometry"
                  description="Comprehensive eye and vision care with advanced diagnostic
                      equipment and personalized treatment plans, ensuring clear
                      vision, early detection of eye diseases, and long-term
                      ocular health for all patients."
                />

                <FieldCards
                  image={Xray}
                  alt="X-ray review"
                  iconClass="fa-solid fa-x-ray"
                  title="Radiology"
                  description="  Comprehensive Bone care with advanced diagnostic
                      techniques and Xray options for bone conditions, ensuring
                      optimal skeletal health for all patients."
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-teal-50 py-15 px-2 sm:px-30 flex flex-col">
          <motion.h1
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
            className="text-cyprus text-center text-3xl font-bold headings relative"
          >
            Featured Services
          </motion.h1>

          <motion.small
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
            className="text-sm text-black opacity-75 text-center mt-12"
          >
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </motion.small>

          <motion.div
            variants={parentVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-7 mt-20 mb-7"
          >
            <FeaturedCards
              iconClass="fa-solid fa-heart-pulse"
              features="Cardiology Excellence"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation."
              items={[
                "Advanced Heart Surgery",
                "24/7 Emergency Care",
                "Preventive Screenings",
              ]}
            />

            <FeaturedCards
              iconClass="fa-solid fa-brain"
              features="Neurology & Brain Health"
              description="Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse."
              items={[
                "Brain Imaging & Diagnostics",
                "Stroke Treatment Center",
                "Neurological Rehabilitation",
              ]}
            />
          </motion.div>
          <motion.div
            variants={parentVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-20"
          >
            <FeaturedCards
              iconClass="fa-solid fa-bone"
              features="Orthopedic Surgery"
              description="Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error."
              items={[
                "Joint Replacement Surgery",
                "Sports Medicine",
                "Minimally Invasive Procedures",
              ]}
            />

            <FeaturedCards
              iconClass="fa-solid fa-truck-medical"
              features="Emergency & Trauma Care"
              description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt."
              items={[
                "24/7 Emergency Department",
                "24/7 Level 1 Trauma Center",
                "Critical Care Units",
              ]}
            />
          </motion.div>
        </section>

        <section className="bg-white py-15 px-2 sm:px-30 overflow-hidden dark:bg-gray-950 dark:text-cloud-white flex flex-col">
          <motion.h1
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
            className="text-cyprus text-center text-3xl font-bold headings relative dark:text-teal-700"
          >
            Find A Doctor
          </motion.h1>

          <motion.small
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
            className="text-sm text-black opacity-75 text-center mt-12 dark:text-cloud-white"
          >
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </motion.small>

          <motion.div
            variants={parentVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-7 mt-20"
          >
            <DoctorsCards
              image={estetica}
              alt="Dr. Rauscher Preguntas"
              name="Dr. Rauscher Preguntas"
              role="Cardiologist"
              experience="22+ years experience"
              status="In Surgery"
              ratings={4.9}
            />

            <DoctorsCards
              image={Fans}
              alt="Dr. Sarah Mitchel"
              name="Dr. Sarah Mitchel"
              role="Neurologist"
              experience="5+ years experience"
              status="Available"
              ratings={3.5}
            />

            <DoctorsCards
              image={Pagin}
              alt="Dr. Shaun Murphy"
              name="Dr. Shaun Murphy"
              role="General Surgeon"
              experience="15+ years experience"
              status="Available"
              ratings={4.9}
            />
          </motion.div>

          <motion.div
            variants={parentVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-7 my-7"
          >
            <DoctorsCards
              image={Doctor}
              alt="Dr. Jin Woo"
              name="Dr. Jin Woo"
              role="Oncologist"
              experience="33+ years experience"
              status="NEXT-TOMMOROW: 9AM"
              ratings={3.79}
            />

            <DoctorsCards
              image={undefin}
              alt="Dr. Isaiah Washington"
              name="Dr. Isaiah Washington"
              role="Pediatrician"
              experience="18+ years experience"
              status="In Surgery"
              ratings={4.5}
            />

            <DoctorsCards
              image={love}
              alt="Dr. Robert Kim"
              name="Dr. Robert Kim"
              role="Orthopedic Surgeon"
              experience="11+ years experience"
              status="Available"
              ratings={4.85}
            />
          </motion.div>

          <motion.div
            variants={parentVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-7 mb-20"
          >
            <DoctorsCards
              image={undefined}
              alt="Dr. Emily Chen"
              name="Dr. Emily Chen"
              role="Dermatologist"
              experience="3+ years experience"
              status="Available"
              ratings={2.5}
            />

            <DoctorsCards
              image={Facial}
              alt="Dr. James Thompson"
              name="Dr. James Thompson"
              role="Optometrist"
              experience="15+ years experience"
              status="MON-WED: 10AM"
              ratings={3.9}
            />

            <DoctorsCards
              image={undefine}
              alt="Dr. Lisa Anderson"
              name="Dr. Lisa Anderson"
              role="Neurologist"
              experience="13+ years experience"
              status="NEXT-WEEK: 11AM"
              ratings={4.5}
            />
          </motion.div>

          <div className="flex flex-col py-25">
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
              className="text-3xl text-cyprus text-center dark:text-teal-700"
            >
              Your Health is Our Priority
            </motion.p>

            <motion.small
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
              className="text-[16px] text-center text-black opacity-75 py-2 dark:text-cloud-white"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et <br /> dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris.
            </motion.small>

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
              className="flex justify-center mt-5 gap-5"
            >
              <ButtonC text="Book Appointment" to="/login" />

              <ButtonB
                text="Find A Doctor"
                className="text-cyprus hover:text-cloud-white hover:border-teal-800 dark:text-cloud-white dark:border-teal-700"
              />
            </motion.div>
          </div>

          <motion.div
            variants={parentVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-7"
          >
            <ServicesCards
              iconClass="fa-solid fa-heart-pulse"
              title="24/7 Emergency Care"
              description="Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo."
              to="/services"
              link="Learn More"
            />

            <ServicesCards
              iconClass="fa-regular fa-calendar-check"
              title="Easy Online Booking"
              description="Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur."
              to="/login"
              link="Book Now"
            />

            <ServicesCards
              iconClass="fa-solid fa-user-doctor"
              title="Expert Medical Team"
              description="Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim."
              to="/"
              link="Meet Our Doctors"
            />
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
            className="bg-linear-to-r from-teal-800 to-cyprus rounded-xl p-4 sm:p-8 flex flex-col sm:flex-row gap-5 justify-between my-20"
          >
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
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <i class="fa-solid fa-phone text-cloud-white bg-teal-700/75 text-3xl p-4 mx-3 rounded-full"></i>
              <div className="mx-2">
                <p className="text-2xl text-cloud-white font-medium">
                  Medical Emergency?
                </p>
                <p className="text-gray-200 text-base leading-8">
                  Call our 24/7 emergency hotline for immediate assistance
                </p>
              </div>
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
              transition={{ duration: 1.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <a
                href="tel:+234 (555)987-6543"
                className="inline-block bg-cloud-white text-lg font-bold rounded-full py-4 px-3 shadow-teal-800 text-cyprus hover:-translate-y-1 hover:bg-teal-100 hover:shadow-lg transition-all ease-in-out duration-300"
              >
                <i class="fa-solid fa-phone px-3"></i>
                Call +234 (555)987-6543
              </a>
            </motion.div>
          </motion.div>
        </section>

        <section className="flex flex-col bg-white px-2 sm:px-80 py-10">
          <motion.h1
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
            className="text-cyprus text-center text-3xl font-bold headings relative"
          >
            Emergency Info
          </motion.h1>

          <motion.small
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
            className="text-[16px] text-center text-black opacity-75 mt-12"
          >
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </motion.small>

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
            className="bg-linear-to-r from-red-500 to-red-700 rounded-xl gap-5 p-5 flex flex-col sm:flex-row justify-between mt-20 mb-10 shadow-red-500 shadow-lg"
          >
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
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <i class="fa-solid fa-triangle-exclamation text-cloud-white text-5xl mx-3"></i>
              <div className="mx-2">
                <p className="text-3xl text-cloud-white py-2 font-bold">
                  Medical Emergency?
                </p>
                <p className="text-cloud-white text-lg">
                  If you are experiencing a life-threatening emergency, call 911
                  immediately or go to your nearest emergency room.
                </p>
              </div>
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
              transition={{ duration: 1.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <a
                href="tel:+2349126626571"
                className="flex items-center gap-3 bg-cloud-white text-red-700 text-lg font-bold rounded-full py-3 px-6 shadow-red-800 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all ease-in-out duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <i className="fa-solid fa-phone text-red-700 text-xl"></i>
                </div>

                <div className="text-left leading-tight">
                  Call <br /> 911
                </div>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={parentVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-7"
          >
            <HelpCards
              iconClass="fa-regular fa-hospital text-red-500"
              title="Emergency Room"
              call="+234 (555) 987-6543"
              location="1245 Healthcare Blvd, Medical City, CA 90210"
              open="Open 24/7"
              className="border-l-red-500"
            />

            <HelpCards
              iconClass="fa-regular fa-clock"
              title="Urgent Care"
              call="+234 (555) 987-6543"
              location="892 Wellness Ave, Health District, CA 90211"
              open="Mon-Sun: 7:00 AM - 10:00 PM"
            />
          </motion.div>

          <motion.div
            variants={parentVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-7"
          >
            <HelpCards
              iconClass="fa-solid fa-headset"
              title="Nurse Helpline"
              call="+234 (555) 456-7890"
              location="24/7 medical advice and guidance"
              open="Available 24/7"
            />

            <HelpCards
              iconClass="fa-solid fa-heart-pulse"
              title="Poison Control"
              call="+234-800-222-1222"
              location="National poison control hotline"
              open="Available 24/7"
            />
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
            className="bg-white inset-shadow-2xs shadow-xl rounded-xl p-5 my-10"
          >
            <p className="text-cyprus text-2xl text-center mt-6">
              When to Seek Emergency Care
            </p>
            <div className="flex justify-around flex-col sm:flex-row">
              <ul>
                <li className="text-black/80 leading-15">
                  <i class="fa-regular fa-circle-check text-green-600 pr-2"></i>{" "}
                  Chest pain or difficulty breathing
                </li>
                <li className="text-black/80 leading-15">
                  <i class="fa-regular fa-circle-check text-green-600 pr-2"></i>{" "}
                  Severe allergic reactions
                </li>
                <li className="text-black/80 leading-15">
                  <i class="fa-regular fa-circle-check text-green-600 pr-2"></i>{" "}
                  Major trauma or injuries
                </li>
                <li className="text-black/80 leading-15">
                  <i class="fa-regular fa-circle-check text-green-600 pr-2"></i>{" "}
                  Signs of stroke or heart attack
                </li>
              </ul>

              <ul>
                <li className="text-black/80 leading-15">
                  <i class="fa-regular fa-circle-check text-green-600 pr-2"></i>{" "}
                  Severe burns or bleeding
                </li>
                <li className="text-black/80 leading-15">
                  <i class="fa-regular fa-circle-check text-green-600 pr-2"></i>{" "}
                  Loss of consciousness
                </li>
                <li className="text-black/80 leading-15">
                  <i class="fa-regular fa-circle-check text-green-600 pr-2"></i>{" "}
                  Severe abdominal pain
                </li>
                <li className="text-black/80 leading-15">
                  <i class="fa-regular fa-circle-check text-green-600 pr-2"></i>{" "}
                  High fever with confusion
                </li>
              </ul>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default Home;
