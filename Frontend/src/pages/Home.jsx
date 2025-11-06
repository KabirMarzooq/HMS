import Navbar from "../components/Navbar.jsx";
import OperationTheatre from "../assets/Operation Theatre.jfif";
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
import Footer from "../components/Footer.jsx";

function Home() {
  return (
    <>
      <Navbar />

      <div>
        <section className="w-xxl m-30">
          <p className="bg-cyprus text-cloud-white w-1/5 rounded-full text-center text-sm py-2 font-[600]">
            Leading Healthcare Specialists
          </p>

          <h1 className="text-cloud-white text-[55px] font-bold my-4 leading-17">
            Advanced Medical care<br></br>
            for Your Family's Health
          </h1>

          <p className="text-cloud-white text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
            placeat <br></br>
            necessitatibus quis, velit quisquam beatae.
          </p>

          <div className="my-9">
            <a
              href="#_"
              className="relative inline-block overflow-hidden bg-teal-800 rounded-full py-4 px-7 text-cloud-white group mr-4"
            >
              <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
              <span className="relative z-10 font-bold">Book Appointment</span>
            </a>

            <a
              href="#_"
              className="relative inline-block overflow-hidden border-2 border-cyprus rounded-full py-4 px-7 text-cloud-white group"
            >
              <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-teal-800 left-0 top-0"></span>
              <span className="relative z-10 font-bold">Explore Services</span>
            </a>
          </div>

          <div className="flex">
            <div className="flex items-center mr-4">
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
          </div>

          <div className="w-xxl bg-black opacity-75 py-10 flex justify-around my-20 rounded-3xl">
            <div className="flex">
              <div className="mt-3">
                <i class="fa-solid fa-heart-pulse bg-cyprus text-3xl p-3 text-teal-600 rounded-xl"></i>
              </div>
              <div className="mx-2">
                <p className="text-lg text-white my-1">Cardiology</p>
                <p className="text-violet-200 text-sm">
                  Lorem ipsum dolor sit amet,
                  <br />
                  consectetur adipiscing elit
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mt-3">
                <i class="fa-solid fa-lungs bg-cyprus text-3xl p-3 text-teal-600 rounded-xl"></i>
              </div>
              <div className="mx-2">
                <p className="text-lg text-white my-1">Pulmonology</p>
                <p className="text-violet-200 text-sm">
                  Lorem ipsum dolor sit amet,
                  <br />
                  consectetur adipiscing elit
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mt-3">
                <i class="fa-solid fa-capsules bg-cyprus text-3xl p-3 text-teal-600 rounded-xl"></i>
              </div>
              <div className="mx-2">
                <p className="text-lg text-white my-1">Diagnostics</p>
                <p className="text-violet-200 text-sm">
                  Lorem ipsum dolor sit amet,
                  <br />
                  consectetur adipiscing elit
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white pt-20 px-30">
          <div className="flex items-center">
            <div className="relative w-1/2">
              <img
                loading="lazy"
                src={OperationTheatre}
                alt="State of the Art facilities"
                className="h-96 w-136 rounded-2xl shadow-md shadow-gray-400"
              />
              <div className="text-cloud-white bg-cyprus absolute right-10 -bottom-15 p-5 rounded-xl flex-col justify-center shadow-md shadow-gray-400">
                <p className="font-bold text-4xl">25+</p>
                <p>Years of excellence</p>
              </div>
            </div>
            <div className="w-1/2  ml-8">
              <h3 className="text-cyprus text-3xl font-bold">
                Committed to Exceptional Patient <br />
                Care
              </h3>

              <p className="text-cyprus opacity-70 font-bold my-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi iure ab fugit, consequatur sapiente inventore in
                ducimus earum voluptatem.
              </p>

              <p className="opacity-90">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                minima quam cupiditate dolore velit qui accusamus eveniet sunt
                vel tenetur, accusantium ad rem deleniti Dolor.
              </p>

              <div className="my-15 flex">
                <div className="p-4 shadow-sm rounded-xl mr-8 transition">
                  <i class="fa-solid fa-heart-pulse text-3xl text-cyprus"></i>
                  <p className="text-cyprus leading-12 font-semibold">
                    Compassionate Care
                  </p>

                  <small className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>

                <div className="p-4 shadow-sm rounded-xl transition">
                  <i class="fa-regular fa-star text-3xl text-cyprus"></i>
                  <p className="text-cyprus leading-12 font-semibold">
                    Medical Excellence
                  </p>

                  <small className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>
              </div>

              <div className="mt-15">
                <a
                  href="#_"
                  className="relative inline-block overflow-hidden bg-teal-800 rounded-xl py-4 px-7 text-cloud-white group mr-4"
                >
                  <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                  <span className="relative z-10 font-bold">
                    Learn More About Us
                  </span>
                </a>

                <a
                  href="#_"
                  className="relative inline-block overflow-hidden border-1 border-cyprus rounded-xl py-4 px-7 text-cyprus group hover:border-teal-800 hover:text-cloud-white"
                >
                  <span className="absolute z-0 w-80 h-80 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-teal-800 -left-5 top-0"></span>
                  <span className="relative z-10 font-bold">Meet Our Team</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-50 flex flex-col">
            <h1 className="text-cyprus text-center text-3xl font-bold headings relative">
              Featured Departments
            </h1>

            <small className="text-sm text-black opacity-75 text-center mt-12">
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </small>

            <div className="grid grid-cols-3 gap-7 my-20">
              <div className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    loading="lazy"
                    src={HeartFailure}
                    alt="Cognitive Heart Failure (CHF)"
                    className="object-cover w-full h-50 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                  />
                </div>
                <div className="px-7 pb-9 pt-18 flex flex-col relative">
                  <i class="fa-solid fa-heart-pulse text-3xl text-cloud-white bg-cyprus p-3 rounded-full absolute -top-7 left-7 shadow-teal-800 shadow-lg"></i>
                  <p className="font-semibold text-2xl text-cyprus">
                    Cardiology
                  </p>

                  <small className="text-sm text-black opacity-65 my-7 leading-6">
                    Comprehensive cardiovascular care with advanced diagnostic
                    techniques and treatment options for heart conditions,
                    ensuring optimal cardiac health for all patients.
                  </small>

                  <a
                    href="/"
                    className="text-cyprus font-semibold group/link hover:text-teal-600 transition-all ease-in duration-200 w-28"
                  >
                    Learn More{" "}
                    <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-1 transition-all ease-in duration-200"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    loading="lazy"
                    src={Brain}
                    alt="Brain Surgeon Junction"
                    className="object-cover w-full h-50 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                  />
                </div>
                <div className="px-7 pb-9 pt-18 flex flex-col relative">
                  <i class="fa-solid fa-brain text-3xl text-cloud-white bg-cyprus p-3 rounded-full absolute -top-7 left-7 shadow-teal-800 shadow-lg"></i>
                  <p className="font-semibold text-2xl text-cyprus">
                    Neurology
                  </p>

                  <small className="text-sm text-black opacity-65 my-7 leading-6">
                    Expert neurological care specializing in brain and nervous
                    system disorders, providing cutting-edge treatments and
                    compassionate support for neurological conditions.
                  </small>

                  <a
                    href="/"
                    className="text-cyprus font-semibold group/link hover:text-teal-600 transition-all ease-in duration-200 w-28"
                  >
                    Learn More{" "}
                    <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-1 transition-all ease-in duration-200"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    loading="lazy"
                    src={Bone}
                    alt="Experience Natural Healing Physiotherapy"
                    className="object-cover w-full h-50 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                  />
                </div>
                <div className="px-7 pb-9 pt-18 flex flex-col relative">
                  <i class="fa-solid fa-bone text-3xl text-cloud-white bg-cyprus p-3 rounded-full absolute -top-7 left-7 shadow-teal-800 shadow-lg"></i>
                  <p className="font-semibold text-2xl text-cyprus">
                    Orthopedics
                  </p>

                  <small className="text-sm text-black opacity-65 my-7 leading-6">
                    Advanced musculoskeletal care focusing on bones, joints, and
                    muscles with innovative surgical and non-surgical treatment
                    approaches for mobility restoration.
                  </small>

                  <a
                    href="/"
                    className="text-cyprus font-semibold group/link hover:text-teal-600 transition-all ease-in duration-200 w-28"
                  >
                    Learn More{" "}
                    <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-1 transition-all ease-in duration-200"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    loading="lazy"
                    src={Child}
                    alt="Child Specialist"
                    className="object-cover w-full h-50 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                  />
                </div>
                <div className="px-7 pb-9 pt-18 flex flex-col relative">
                  <i class="fa-solid fa-baby text-3xl text-cloud-white bg-cyprus p-3 rounded-full absolute -top-7 left-7 shadow-teal-800 shadow-lg"></i>
                  <p className="font-semibold text-2xl text-cyprus">
                    Pediatrics
                  </p>

                  <small className="text-sm text-black opacity-65 my-7 leading-6">
                    Specialized healthcare for children from infancy through
                    adolescence, offering comprehensive medical care in a
                    child-friendly environment with experienced pediatric
                    specialists.
                  </small>

                  <a
                    href="/"
                    className="text-cyprus font-semibold group/link hover:text-teal-600 transition-all ease-in duration-200 w-28"
                  >
                    Learn More{" "}
                    <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-1 transition-all ease-in duration-200"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    loading="lazy"
                    src={Cancer}
                    alt="Living Cancer Virus"
                    className="object-cover w-full h-50 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                  />
                </div>
                <div className="px-7 pb-9 pt-18 flex flex-col relative">
                  <i class="fa-solid fa-ribbon text-3xl text-cloud-white bg-cyprus p-3 rounded-full absolute -top-7 left-7 shadow-teal-800 shadow-lg"></i>
                  <p className="font-semibold text-2xl text-cyprus">Oncology</p>

                  <small className="text-sm text-black opacity-65 my-7 leading-6">
                    Comprehensive cancer care with multidisciplinary approach,
                    offering advanced treatment options, clinical trials, and
                    compassionate support throughout the cancer journey.
                  </small>

                  <a
                    href="/"
                    className="text-cyprus font-semibold group/link hover:text-teal-600 transition-all ease-in duration-200 w-28"
                  >
                    Learn More{" "}
                    <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-1 transition-all ease-in duration-200"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    loading="lazy"
                    src={Ambulance}
                    alt="Advanced Hospital SEO services"
                    className="object-cover w-full h-50 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                  />
                </div>
                <div className="px-7 pb-9 pt-18 flex flex-col relative">
                  <i class="fa-solid fa-truck-medical text-3xl text-cloud-white bg-cyprus p-3 rounded-full absolute -top-7 left-7 shadow-teal-800 shadow-lg"></i>
                  <p className="font-semibold text-2xl text-cyprus">
                    Emergency Care
                  </p>

                  <small className="text-sm text-black opacity-65 my-7 leading-6">
                    Round-the-clock emergency medical services with rapid
                    response capabilities, state-of-the-art equipment, and
                    experienced emergency physicians for critical care.
                  </small>

                  <a
                    href="/"
                    className="text-cyprus font-semibold group/link hover:text-teal-600 transition-all ease-in duration-200 w-28"
                  >
                    Learn More{" "}
                    <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-1 transition-all ease-in duration-200"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    loading="lazy"
                    src={Skin}
                    alt="Microneedling Safe Practices"
                    className="object-cover w-full h-50 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                  />
                </div>
                <div className="px-7 pb-9 pt-18 flex flex-col relative">
                  <i class="fa-solid fa-hand-dots text-3xl text-cloud-white bg-cyprus p-3 rounded-full absolute -top-7 left-7 shadow-teal-800 shadow-lg"></i>
                  <p className="font-semibold text-2xl text-cyprus">
                    Dermatology
                  </p>

                  <small className="text-sm text-black opacity-65 my-7 leading-6">
                    Extensive skin care services offering expert diagnosis and
                    treatment of various skin, hair, and nail conditions, using
                    advanced therapies to restore and maintain healthy, radiant
                    skin.
                  </small>

                  <a
                    href="/"
                    className="text-cyprus font-semibold group/link hover:text-teal-600 transition-all ease-in duration-200 w-28"
                  >
                    Learn More{" "}
                    <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-1 transition-all ease-in duration-200"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    loading="lazy"
                    src={Eye}
                    alt="Ophthalmology Simulation Training - cataract surgery"
                    className="object-cover w-full h-50 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                  />
                </div>
                <div className="px-7 pb-9 pt-18 flex flex-col relative">
                  <i class="fa-regular fa-eye text-3xl text-cloud-white bg-cyprus p-3 rounded-full absolute -top-7 left-7 shadow-teal-800 shadow-lg"></i>
                  <p className="font-semibold text-2xl text-cyprus">
                    Optometry
                  </p>

                  <small className="text-sm text-black opacity-65 my-7 leading-6">
                    Comprehensive eye and vision care with advanced diagnostic
                    equipment and personalized treatment plans, ensuring clear
                    vision, early detection of eye diseases, and long-term
                    ocular health for all patients.
                  </small>

                  <a
                    href="/"
                    className="text-cyprus font-semibold group/link hover:text-teal-600 transition-all ease-in duration-200 w-28"
                  >
                    Learn More{" "}
                    <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-1 transition-all ease-in duration-200"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    loading="lazy"
                    src={Xray}
                    alt="X-ray review"
                    className="object-cover w-full h-50 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                  />
                </div>
                <div className="px-7 pb-9 pt-18 flex flex-col relative">
                  <i class="fa-solid fa-x-ray text-3xl text-cloud-white bg-cyprus p-3 rounded-full absolute -top-7 left-7 shadow-teal-800 shadow-lg"></i>
                  <p className="font-semibold text-2xl text-cyprus">
                    Radiology
                  </p>

                  <small className="text-sm text-black opacity-65 my-7 leading-6">
                    Comprehensive Bone care with advanced diagnostic techniques
                    and Xray options for bone conditions, ensuring optimal
                    skeletal health for all patients.
                  </small>

                  <a
                    href="/"
                    className="text-cyprus font-semibold group/link hover:text-teal-600 transition-all ease-in duration-200 w-28"
                  >
                    Learn More{" "}
                    <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-1 transition-all ease-in duration-200"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-teal-50 py-15 px-30 flex flex-col">
          <h1 className="text-cyprus text-center text-3xl font-bold headings relative">
            Featured Services
          </h1>

          <small className="text-sm text-black opacity-75 text-center mt-12">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </small>

          <div className="grid grid-cols-2 gap-7 mt-20">
            <div className="bg-white border-t-4 border-cyprus rounded-xl flex flex-col p-5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="py-5">
                <i class="fa-solid fa-heart-pulse text-5xl text-cyprus bg-teal-100 p-4 rounded-full"></i>
              </div>

              <p className="font-semibold text-2xl text-cyprus">
                Cardiology Excellence
              </p>

              <small className="text-sm text-black opacity-65 my-7 leading-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </small>

              <ul>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i>{" "}
                  Advanced Heart Surgery
                </li>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i> 24/7
                  Emergency Care
                </li>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i>{" "}
                  Preventive Screenings
                </li>
              </ul>

              <a
                href="/"
                className="text-teal-600 font-semibold group/link hover:text-cyprus transition-all ease-in duration-200 w-28 my-4"
              >
                Learn More{" "}
                <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-2 transition-all ease-in duration-200"></i>
              </a>
            </div>

            <div className="bg-white border-t-4 border-cyprus rounded-xl flex flex-col p-5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="py-5">
                <i class="fa-solid fa-brain text-5xl text-cyprus bg-teal-100 p-4 rounded-full"></i>
              </div>

              <p className="font-semibold text-2xl text-cyprus">
                Neurology & Brain Health
              </p>

              <small className="text-sm text-black opacity-65 my-7 leading-6">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse.
              </small>

              <ul>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i>{" "}
                  Brain Imaging & Diagnostics
                </li>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i>
                  Stroke Treatment Center
                </li>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i>{" "}
                  Neurological Rehabilitation
                </li>
              </ul>

              <a
                href="/"
                className="text-teal-600 font-semibold group/link hover:text-cyprus transition-all ease-in duration-200 w-28 my-4"
              >
                Learn More{" "}
                <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-2 transition-all ease-in duration-200"></i>
              </a>
            </div>

            <div className="bg-white border-t-4 border-cyprus rounded-xl flex flex-col p-5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="py-5">
                <i class="fa-solid fa-bone text-5xl text-cyprus bg-teal-100 p-4 rounded-full"></i>
              </div>

              <p className="font-semibold text-2xl text-cyprus">
                Orthopedic Surgery
              </p>

              <small className="text-sm text-black opacity-65 my-7 leading-6">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error.
              </small>

              <ul>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i>{" "}
                  Joint Replacement Surgery
                </li>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i>
                  Sports Medicine
                </li>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i>{" "}
                  Minimally Invasive Procedures
                </li>
              </ul>

              <a
                href="/"
                className="text-teal-600 font-semibold group/link hover:text-cyprus transition-all ease-in duration-200 w-28 my-4"
              >
                Learn More{" "}
                <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-2 transition-all ease-in duration-200"></i>
              </a>
            </div>

            <div className="bg-white border-t-4 border-cyprus rounded-xl flex flex-col p-5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="py-5">
                <i class="fa-solid fa-truck-medical text-5xl text-cyprus bg-teal-100 p-4 rounded-full"></i>
              </div>

              <p className="font-semibold text-2xl text-cyprus">
                Emergency & Trauma Care
              </p>

              <small className="text-sm text-black opacity-65 my-7 leading-6">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </small>

              <ul>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i> 24/7
                  Emergency Department
                </li>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i> 24/7
                  Level 1 Trauma Center
                </li>
                <li className="text-sm text-gray-700 leading-8">
                  <i class="fa-solid fa-circle-check text-cyprus pr-2"></i>{" "}
                  Critical Care Units
                </li>
              </ul>

              <a
                href="/"
                className="text-teal-600 font-semibold group/link hover:text-cyprus transition-all ease-in duration-200 w-28 my-4"
              >
                Learn More{" "}
                <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-2 transition-all ease-in duration-200"></i>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white py-15 px-30 flex flex-col">
          <h1 className="text-cyprus text-center text-3xl font-bold headings relative">
            Find A Doctor
          </h1>

          <small className="text-sm text-black opacity-75 text-center mt-12">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </small>

          <div className="grid grid-cols-3 gap-7 my-20">
            <div className="bg-white rounded-xl group/card hover:shadow-md hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="overflow-hidden rounded-t-xl relative">
                <img
                  loading="lazy"
                  src={estetica}
                  alt="Dr. Rauscher Preguntas"
                  className="object-cover object-top rounded-t-xl w-full h-70 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                />
                <p class="text-cloud-white text-xs font-bold bg-amber-300 px-4 py-1 rounded-full absolute top-4 right-4">
                  IN SURGERY
                </p>
              </div>
              <div className="px-7 py-5 flex flex-col">
                <p className="font-normal text-xl text-cyprus my-3">
                  Dr. Rauscher Preguntas
                </p>

                <p className="font-[600] text-md text-teal-800">Cardiology</p>

                <small className="text-sm text-black opacity-65">
                  22+ years experience
                </small>

                <div className="my-5">
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>

                  <small className="text-sm text-black opacity-65 px-2">
                    (5.0)
                  </small>
                </div>

                <div>
                  <a
                    href="#_"
                    className="relative inline-block overflow-hidden bg-teal-800 rounded-xl py-4 px-7 text-cloud-white group mr-4"
                  >
                    <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                    <span className="relative z-10 font-bold">
                      Book Appointment
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl group/card hover:shadow-md hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="overflow-hidden rounded-t-xl relative">
                <img
                  loading="lazy"
                  src={Fans}
                  alt="Dr. Sarah Mitchel"
                  className="object-cover object-top rounded-t-xl w-full h-70 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                />
                <p class="text-cloud-white text-xs font-bold bg-green-600 px-4 py-1 rounded-full absolute top-4 right-4">
                  AVAILABLE
                </p>
              </div>
              <div className="px-7 py-5 flex flex-col">
                <p className="font-normal text-xl text-cyprus my-3">
                  Dr. Sarah Mitchel
                </p>

                <p className="font-[600] text-md text-teal-800">Neurology</p>

                <small className="text-sm text-black opacity-65">
                  5+ years experience
                </small>

                <div className="my-5">
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star-half-stroke text-amber-300 text-sm"></i>
                  <i class="fa-regular fa-star text-amber-300 text-sm"></i>

                  <small className="text-sm text-black opacity-65 px-2">
                    (3.5)
                  </small>
                </div>

                <div>
                  <a
                    href="#_"
                    className="relative inline-block overflow-hidden bg-teal-800 rounded-xl py-4 px-7 text-cloud-white group mr-4"
                  >
                    <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                    <span className="relative z-10 font-bold">
                      Book Appointment
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl group/card hover:shadow-md hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="overflow-hidden rounded-t-xl relative">
                <img
                  loading="lazy"
                  src={Pagin}
                  alt="Dr. Shaun Murphy"
                  className="object-cover object-top rounded-t-xl w-full h-70 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                />
                <p class="text-cloud-white text-xs font-bold bg-green-600 px-4 py-1 rounded-full absolute top-4 right-4">
                  AVAILABLE
                </p>
              </div>
              <div className="px-7 py-5 flex flex-col">
                <p className="font-normal text-xl text-cyprus my-3">
                  Dr. Shaun Murphy
                </p>

                <p className="font-[600] text-md text-teal-800">
                  General Surgeon
                </p>

                <small className="text-sm text-black opacity-65">
                  15+ years experience
                </small>

                <div className="my-5">
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>

                  <small className="text-sm text-black opacity-65 px-2">
                    (5.0)
                  </small>
                </div>

                <div>
                  <a
                    href="#_"
                    className="relative inline-block overflow-hidden bg-teal-800 rounded-xl py-4 px-7 text-cloud-white group mr-4"
                  >
                    <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                    <span className="relative z-10 font-bold">
                      Book Appointment
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl group/card hover:shadow-md hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="overflow-hidden rounded-t-xl relative">
                <img
                  loading="lazy"
                  src={Doctor}
                  alt="Dr. Jin Woo"
                  className="object-cover object-top rounded-t-xl w-full h-70 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                />
                <p class="text-cloud-white text-xs font-bold bg-gray-700/75 px-4 py-1 rounded-full absolute top-4 right-4">
                  NEXT-TOMMOROW: 9AM
                </p>
              </div>
              <div className="px-7 py-5 flex flex-col">
                <p className="font-normal text-xl text-cyprus my-3">
                  Dr. Jin Woo
                </p>

                <p className="font-[600] text-md text-teal-800">Oncology</p>

                <small className="text-sm text-black opacity-65">
                  33+ years experience
                </small>

                <div className="my-5">
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-regular fa-star text-amber-300 text-sm"></i>

                  <small className="text-sm text-black opacity-65 px-2">
                    (4.0)
                  </small>
                </div>

                <div>
                  <a
                    href="#_"
                    className="relative inline-block overflow-hidden bg-teal-800 rounded-xl py-4 px-7 text-cloud-white group mr-4"
                  >
                    <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                    <span className="relative z-10 font-bold">
                      Book Appointment
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl group/card hover:shadow-md hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="overflow-hidden rounded-t-xl relative">
                <img
                  loading="lazy"
                  src={undefin}
                  alt="Dr. Isaiah Washington"
                  className="object-cover object-[1%_25%] rounded-t-xl w-full h-70 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                />
                <p class="text-cloud-white text-xs font-bold bg-amber-300 px-4 py-1 rounded-full absolute top-4 right-4">
                  IN SURGERY
                </p>
              </div>
              <div className="px-7 py-5 flex flex-col">
                <p className="font-normal text-xl text-cyprus my-3">
                  Dr. Isaiah Washington
                </p>

                <p className="font-[600] text-md text-teal-800">Pediatrics</p>

                <small className="text-sm text-black opacity-65">
                  18+ years experience
                </small>

                <div className="my-5">
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star-half-stroke text-amber-300 text-sm"></i>

                  <small className="text-sm text-black opacity-65 px-2">
                    (4.5)
                  </small>
                </div>

                <div>
                  <a
                    href="#_"
                    className="relative inline-block overflow-hidden bg-teal-800 rounded-xl py-4 px-7 text-cloud-white group mr-4"
                  >
                    <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                    <span className="relative z-10 font-bold">
                      Book Appointment
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl group/card hover:shadow-md hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="overflow-hidden rounded-t-xl relative">
                <img
                  loading="lazy"
                  src={love}
                  alt="Dr. Robert Kim"
                  className="object-cover object-top rounded-t-xl w-full h-70 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                />
                <p class="text-cloud-white text-xs font-bold bg-green-600 px-4 py-1 rounded-full absolute top-4 right-4">
                  AVAILABLE
                </p>
              </div>
              <div className="px-7 py-5 flex flex-col">
                <p className="font-normal text-xl text-cyprus my-3">
                  Dr. Robert Kim
                </p>

                <p className="font-[600] text-md text-teal-800">Orthopedics</p>

                <small className="text-sm text-black opacity-65">
                  11+ years experience
                </small>

                <div className="my-5">
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>

                  <small className="text-sm text-black opacity-65 px-2">
                    (5.0)
                  </small>
                </div>

                <div>
                  <a
                    href="#_"
                    className="relative inline-block overflow-hidden bg-teal-800 rounded-xl py-4 px-7 text-cloud-white group mr-4"
                  >
                    <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                    <span className="relative z-10 font-bold">
                      Book Appointment
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl group/card hover:shadow-md hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="overflow-hidden rounded-t-xl relative">
                <img
                  loading="lazy"
                  src={undefined}
                  alt="Dr. Emily Chen"
                  className="object-cover object-[1%_40%] rounded-t-xl w-full h-70 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                />
                <p class="text-cloud-white text-xs font-bold bg-green-600 px-4 py-1 rounded-full absolute top-4 right-4">
                  AVAILABLE
                </p>
              </div>
              <div className="px-7 py-5 flex flex-col">
                <p className="font-normal text-xl text-cyprus my-3">
                  Dr. Emily Chen
                </p>

                <p className="font-[600] text-md text-teal-800">Dermatology</p>

                <small className="text-sm text-black opacity-65">
                  3+ years experience
                </small>

                <div className="my-5">
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star-half-stroke text-amber-300 text-sm"></i>
                  <i class="fa-regular fa-star text-amber-300 text-sm"></i>
                  <i class="fa-regular fa-star text-amber-300 text-sm"></i>

                  <small className="text-sm text-black opacity-65 px-2">
                    (2.5)
                  </small>
                </div>

                <div>
                  <a
                    href="#_"
                    className="relative inline-block overflow-hidden bg-teal-800 rounded-xl py-4 px-7 text-cloud-white group mr-4"
                  >
                    <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                    <span className="relative z-10 font-bold">
                      Book Appointment
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl group/card hover:shadow-md hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="overflow-hidden rounded-t-xl relative">
                <img
                  loading="lazy"
                  src={Facial}
                  alt="Dr. James Thompson"
                  className="object-cover object-top rounded-t-xl w-full h-70 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                />
                <p class="text-cloud-white text-xs font-bold bg-gray-700/75 px-4 py-1 rounded-full absolute top-4 right-4">
                  MON-WED: 10AM
                </p>
              </div>
              <div className="px-7 py-5 flex flex-col">
                <p className="font-normal text-xl text-cyprus my-3">
                  Dr. James Thompson
                </p>

                <p className="font-[600] text-md text-teal-800">Optometry</p>

                <small className="text-sm text-black opacity-65">
                  15+ years experience
                </small>

                <div className="my-5">
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-regular fa-star text-amber-300 text-sm"></i>

                  <small className="text-sm text-black opacity-65 px-2">
                    (4.0)
                  </small>
                </div>

                <div>
                  <a
                    href="#_"
                    className="relative inline-block overflow-hidden bg-teal-800 rounded-xl py-4 px-7 text-cloud-white group mr-4"
                  >
                    <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                    <span className="relative z-10 font-bold">
                      Book Appointment
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl group/card hover:shadow-md hover:-translate-y-1 transition-all ease-in duration-200">
              <div className="overflow-hidden rounded-t-xl relative">
                <img
                  loading="lazy"
                  src={undefine}
                  alt="Dr. Lisa Anderson"
                  className="object-cover object-[1%_23%] rounded-t-xl w-full h-70 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
                />
                <p class="text-cloud-white text-xs font-bold bg-gray-700/75 px-4 py-1 rounded-full absolute top-4 right-4">
                  NEXT-WEEK: 11AM
                </p>
              </div>
              <div className="px-7 py-5 flex flex-col">
                <p className="font-normal text-xl text-cyprus my-3">
                  Dr. Lisa Anderson
                </p>

                <p className="font-[600] text-md text-teal-800">Neurology</p>

                <small className="text-sm text-black opacity-65">
                  13+ years experience
                </small>

                <div className="my-5">
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star text-amber-300 text-sm"></i>
                  <i class="fa-solid fa-star-half-stroke text-amber-300 text-sm"></i>

                  <small className="text-sm text-black opacity-65 px-2">
                    (4.5)
                  </small>
                </div>

                <div>
                  <a
                    href="#_"
                    className="relative inline-block overflow-hidden bg-teal-800 rounded-xl py-4 px-7 text-cloud-white group mr-4"
                  >
                    <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                    <span className="relative z-10 font-bold">
                      Book Appointment
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col py-25">
            <p className="text-3xl text-cyprus text-center">
              Your Health is Our Priority
            </p>
            <small className="text-[16px] text-center text-black opacity-75 py-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et <br /> dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris.
            </small>
            <div className="flex justify-center mt-5">
              <a
                href="#_"
                className="relative inline-block overflow-hidden bg-teal-800 rounded-full py-4 px-7 text-cloud-white group mr-4 hover:-translate-y-1 transition-all ease-in-out duration-300"
              >
                <span className="absolute z-0 w-64 h-64 mt-15 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-cyprus left-0 top-0"></span>
                <span className="relative z-10 font-bold">
                  Book Appointment
                </span>
              </a>

              <a
                href="#_"
                className="relative inline-block overflow-hidden border-1 border-cyprus rounded-full py-4 px-7 text-cyprus group hover:border-teal-800 hover:text-cloud-white hover:-translate-y-1 transition-all ease-in-out duration-300"
              >
                <span className="absolute z-0 w-64 h-64 mt-14 rounded-full group-hover:-mt-25 transition-all ease-linear duration-300 bg-teal-800 -left-5 top-0"></span>
                <span className="relative z-10 font-bold">Find A Doctor</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-7">
            <div className="bg-white shadow-lg flex flex-col items-center rounded-xl p-5 group/cad hover:shadow-2xl hover:-translate-y-2 transition-all ease-in duration-300">
              <div className="py-5">
                <i class="fa-solid fa-heart-pulse text-4xl text-cyprus group-hover/cad:bg-cyprus group-hover/cad:text-cloud-white transition-all ease-in duration-300 bg-teal-100 p-5 rounded-full"></i>
              </div>

              <p className="text-cyprus font-mono text-xl py-2 font-medium">
                24/7 Emergency Care
              </p>

              <small className="text-[16px] text-center text-black opacity-75 py-2">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo.
              </small>

              <a
                href="/"
                className="text-teal-600 font-semibold group/link hover:text-cyprus transition-all ease-in duration-200 my-4"
              >
                Learn More{" "}
                <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-2 transition-all ease-in duration-200"></i>
              </a>
            </div>

            <div className="bg-white shadow-lg flex flex-col items-center rounded-xl p-5 group/cad hover:shadow-2xl hover:-translate-y-2 transition-all ease-in duration-300">
              <div className="py-5">
                <i class="fa-regular fa-calendar-check text-4xl text-cyprus group-hover/cad:bg-cyprus group-hover/cad:text-cloud-white transition-all ease-in duration-300 bg-teal-100 p-5 rounded-full"></i>
              </div>

              <p className="text-cyprus font-mono text-xl py-2 font-medium">
                Easy Online Booking
              </p>

              <small className="text-[16px] text-center text-black opacity-75 py-2">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </small>

              <a
                href="/"
                className="text-teal-600 font-semibold group/link hover:text-cyprus transition-all ease-in duration-200 my-4"
              >
                Book Now{" "}
                <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-2 transition-all ease-in duration-200"></i>
              </a>
            </div>

            <div className="bg-white shadow-lg flex flex-col items-center rounded-xl p-5 group/cad hover:shadow-2xl hover:-translate-y-2 transition-all ease-in duration-300">
              <div className="py-5">
                <i class="fa-solid fa-user-doctor text-4xl text-cyprus group-hover/cad:bg-cyprus group-hover/cad:text-cloud-white transition-all ease-in duration-300 bg-teal-100 p-5 rounded-full"></i>
              </div>

              <p className="text-cyprus font-mono text-xl py-2 font-medium">
                Expert Medical Team
              </p>

              <small className="text-[16px] text-center text-black opacity-75 py-2">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim.
              </small>

              <a
                href="/"
                className="text-teal-600 font-semibold group/link hover:text-cyprus transition-all ease-in duration-200 my-4"
              >
                Meet Our Doctors{" "}
                <i class="fa-solid fa-arrow-right fa-sm group-hover/link:translate-x-2 transition-all ease-in duration-200"></i>
              </a>
            </div>
          </div>

          <div className="bg-linear-to-r from-teal-800 to-cyprus rounded-xl p-8 flex justify-between my-20">
            <div className="flex items-center">
              <i class="fa-solid fa-phone text-cloud-white bg-teal-700/75 text-3xl p-4 mx-3 rounded-full"></i>
              <div className="mx-2">
                <p className="text-2xl text-cloud-white font-medium">
                  Medical Emergency?
                </p>
                <p className="text-gray-200 text-base leading-8">
                  Call our 24/7 emergency hotline for immediate assistance
                </p>
              </div>
            </div>
            <div>
              <a
                href="#_"
                className="inline-block bg-cloud-white text-lg font-bold rounded-full py-4 px-3 shadow-teal-800 text-cyprus hover:-translate-y-1 hover:bg-teal-100 hover:shadow-lg transition-all ease-in-out duration-300"
              >
                <i class="fa-solid fa-phone px-3"></i>
                Call +234 (555)987-6543
              </a>
            </div>
          </div>
        </section>

        <section className="flex flex-col bg-white px-80">
          <h1 className="text-cyprus text-center text-3xl font-bold headings relative">
            Emergency Info
          </h1>

          <small className="text-[16px] text-center text-black opacity-75 mt-12">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </small>

          <div className="bg-linear-to-r from-red-500 to-red-700 rounded-xl p-5 flex items-center justify-between mt-20 mb-10 shadow-red-500 shadow-lg">
            <div className="flex items-center">
              <i class="fa-solid fa-triangle-exclamation text-cloud-white text-5xl mx-3"></i>
              <div className="mx-2">
                <p className="text-3xl text-cloud-white py-2 font-bold">
                  Medical Emergency?
                </p>
                <p className="text-cloud-white text-lg">
                  If you are experiencing a life-threatening emergency, call{" "}
                  <br /> 911 immediately or go to your nearest emergency room.
                </p>
              </div>
            </div>

            <div>
              <a
                href="#_"
                className="inline-block bg-cloud-white text-lg font-bold rounded-full py-2 px-3 shadow-red-800 text-red-700 hover:-translate-y-1 hover:shadow-lg transition-all ease-in-out duration-300"
              >
                <i class="fa-solid fa-phone px-2"></i>
                Call 911
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7">
            <div className="bg-white inset-shadow-2xs shadow-lg border-l-4 border-l-red-500 flex flex-col items-center rounded-xl p-5 hover:shadow-2xl hover:-translate-y-1 transition-all ease-in duration-300">
              <div className="py-5">
                <i class="fa-regular fa-hospital text-4xl text-red-500"></i>
              </div>

              <p className="text-cyprus text-2xl py-2 font-medium">
                Emergency Room
              </p>

              <small className="font-[550] text-center text-cyprus py-2">
                <i class="fa-solid fa-phone px-2"></i> +234 (555) 987-6543
              </small>

              <small className="text-[15px] text-center text-teal-800 py-2">
                <i class="fa-solid fa-location-dot px-2 text-cyprus"></i>1245
                Healthcare Blvd, Medical City, CA 90210
              </small>

              <small className="text-sm font-[550] text-center text-cyprus/60 py-2">
                Open 24/7
              </small>

              <a
                href="#_"
                className="inline-block bg-teal-800 rounded-full py-2 px-4 my-2 text-cloud-white hover:-translate-y-1 hover:bg-cyprus transition-all ease-in-out duration-300"
              >
                Call Now
              </a>
            </div>

            <div className="bg-white inset-shadow-2xs shadow-lg border-l-4 border-l-cyprus flex flex-col items-center rounded-xl p-5 hover:shadow-2xl hover:-translate-y-1 transition-all ease-in duration-300">
              <div className="py-5">
                <i class="fa-regular fa-clock text-4xl text-cyprus"></i>
              </div>

              <p className="text-cyprus text-2xl py-2 font-medium">
                Urgent Care
              </p>

              <small className="font-[550] text-center text-cyprus py-2">
                <i class="fa-solid fa-phone px-2"></i> +234 (555) 987-6543
              </small>

              <small className="text-[15px] text-center text-teal-800 py-2">
                <i class="fa-solid fa-location-dot px-2 text-cyprus"></i>892
                Wellness Ave, Health District, CA 90211
              </small>

              <small className="text-sm font-[550] text-center text-cyprus/60 py-2">
                Mon-Sun: 7:00 AM - 10:00 PM
              </small>

              <a
                href="#_"
                className="inline-block bg-teal-800 rounded-full py-2 px-4 my-2 text-cloud-white hover:-translate-y-1 hover:bg-cyprus transition-all ease-in-out duration-300"
              >
                Call Now
              </a>
            </div>

            <div className="bg-white inset-shadow-2xs shadow-lg border-l-4 border-l-cyprus flex flex-col items-center rounded-xl p-5 hover:shadow-2xl hover:-translate-y-1 transition-all ease-in duration-300">
              <div className="py-5">
                <i class="fa-solid fa-headset text-4xl text-cyprus"></i>
              </div>

              <p className="text-cyprus text-2xl py-2 font-medium">
                Nurse Helpline
              </p>

              <small className="font-[550] text-center text-cyprus py-2">
                <i class="fa-solid fa-phone px-2"></i> +234 (555) 456-7890
              </small>

              <small className="text-[15px] text-center text-teal-800 py-2">
                <i class="fa-solid fa-location-dot px-2 text-cyprus"></i>24/7
                medical advice and guidance
              </small>

              <small className="text-sm font-[550] text-center text-cyprus/60 py-2">
                Available 24/7
              </small>

              <a
                href="#_"
                className="inline-block bg-teal-800 rounded-full py-2 px-4 my-2 text-cloud-white hover:-translate-y-1 hover:bg-cyprus transition-all ease-in-out duration-300"
              >
                Call Now
              </a>
            </div>

            <div className="bg-white inset-shadow-2xs shadow-lg border-l-4 border-l-cyprus flex flex-col items-center rounded-xl p-5 hover:shadow-2xl hover:-translate-y-1 transition-all ease-in duration-300">
              <div className="py-5">
                <i class="fa-solid fa-heart-pulse text-4xl text-cyprus"></i>
              </div>

              <p className="text-cyprus text-2xl py-2 font-medium">
                Poison Control
              </p>

              <small className="font-[550] text-center text-cyprus py-2">
                <i class="fa-solid fa-phone px-2"></i> +234-800-222-1222
              </small>

              <small className="text-[15px] text-center text-teal-800 py-2">
                <i class="fa-solid fa-location-dot px-2 text-cyprus"></i>
                National poison control hotline
              </small>

              <small className="text-sm font-[550] text-center text-cyprus/60 py-2">
                Available 24/7
              </small>

              <a
                href="#_"
                className="inline-block bg-teal-800 rounded-full py-2 px-4 my-2 text-cloud-white hover:-translate-y-1 hover:bg-cyprus transition-all ease-in-out duration-300"
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="bg-white inset-shadow-2xs shadow-xl rounded-xl p-5 my-10">
            <p className="text-cyprus text-2xl text-center mt-6">
              When to Seek Emergency Care
            </p>
            <div className="flex justify-around">
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
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Home;
