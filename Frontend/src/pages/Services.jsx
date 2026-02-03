import { useState } from "react";
import { ButtonD } from "../components/Button.jsx";
import { motion } from "framer-motion";
import {
  ServiceCards,
  EmergencyCards,
  ScheduleCards,
} from "../components/Cards.jsx";

function Services() {
  const [activeTab, setActiveTab] = useState("Primary Care");

  const tabs = ["Primary Care", "Speciality Care", "Diagnostics", "Emergency"];

  const cards = [
    {
      category: "Primary Care",
      iconClass: "fa-solid fa-stethoscope",
      features: "General Consultation",
      description:
        "Cupiditate placeat facere. Delectus quisquam et consequatur laborum sunt consectetur.",
      items: [
        "Comprehensive Health Assessment",
        "Preventive Care Planning",
        "Health Monitoring",
      ],
    },
    {
      category: "Primary Care",
      iconClass: "fa-solid fa-syringe",
      features: "Vaccination Services",
      description:
        "Voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut.",
      items: ["Adult Immunizations", "Travel Vaccines", "Flu Shots"],
    },
    {
      category: "Primary Care",
      iconClass: "fa-solid fa-baby",
      features: "Maternal Health",
      description:
        "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.",
      items: ["Prenatal Care", "Delivery Support", "Postnatal Care"],
    },
    {
      category: "Primary Care",
      iconClass: "fa-solid fa-user-doctor",
      features: "Family Medicine",
      description:
        "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.",
      items: [
        "All-Age Care",
        "Chronic Disease Management",
        "Wellness Programs",
      ],
    },
    {
      category: "Speciality Care",
      iconClass: "fa-solid fa-heart-pulse",
      features: "Cardiology",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
      items: [
        "Heart Disease Treatment",
        "Cardiac Surgery",
        "Rehabilitation Programs",
      ],
    },
    {
      category: "Speciality Care",
      iconClass: "fa-solid fa-brain",
      features: "Neurology",
      description:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur.",
      items: ["Neurological Assessment", "Stroke Treatment", "Memory Care"],
    },
    {
      category: "Speciality Care",
      iconClass: "fa-solid fa-bone",
      features: "Orthopedics",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit.",
      items: ["Joint Replacement", "Sports Medicine", "Pain Management"],
    },
    {
      category: "Speciality Care",
      iconClass: "fa-solid fa-ribbon",
      features: "Oncology",
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.",
      items: ["Cancer Treatment", "Chemotherapy", "Support Services"],
    },
    {
      category: "Diagnostics",
      iconClass: "fa-solid fa-vial",
      features: "Laboratory Testing",
      description:
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.",
      items: ["Blood Analysis", "Pathology Services", "Quick Results"],
    },
    {
      category: "Diagnostics",
      iconClass: "fa-solid fa-x-ray",
      features: "Diagnostic Imaging",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      items: ["MRI Scans", "CT Imaging", "Ultrasound"],
    },
    // {
    //   category: "Emergency",
    //   iconClass: "fa-solid fa-truck-medical",
    //   features: "24/7 Emergency Care",
    //   description:
    //     "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   items: [
    //     "Round-the-Clock Availability",
    //     "Trauma Center",
    //     "Critical Care Unit",
    //     "Emergency Surgery",
    //   ],
    //   className: "items-center text-center",
    // },
  ];

  const emergencyCards = [
    {
      iconClass: "fa-solid fa-truck-medical",
      features: "24/7 Emergency Care",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      items: [
        "Round-the-Clock Availability",
        "Trauma Center",
        "Critical Care Unit",
        "Emergency Surgery",
      ],
      className: "items-center text-center",
    },
  ];

  const filteredCards = cards.filter((card) => card.category === activeTab);

  return (
    <div className="m-2">
      <div className="absolute left-0 top-0 w-full h-full bg-white pt-50 dark:bg-gray-900 -z-10"></div>

      <h2 className="text-center text-cyprus text-5xl font-bold dark:text-cloud-white">
        Services
      </h2>

      <p className="text-black opacity-65 dark:text-white text-lg text-center my-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis, <br className="hidden sm:inline-block" />{" "}
        pulvinar dapibus leo.
      </p>

      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex mx-auto my-15 gap-4 justify-center w-max">
          {tabs.map((tab) => (
            <ButtonD
              key={tab}
              text={tab}
              onClick={() => setActiveTab(tab)}
              active={activeTab === tab}
            />
          ))}
        </div>
      </div>

      <div>
        {activeTab === "Emergency" ? (
          <div className="w-full sm:w-5/6 mx-auto">
            {emergencyCards.map((item, index) => (
              <EmergencyCards
                key={index}
                features={item.features}
                description={item.description}
                iconClass={item.iconClass}
                items={item.items}
              />
            ))}
          </div>
        ) : (
          <div className="w-full sm:w-5/6 mx-auto my-15 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredCards.map((card, index) => (
              <ServiceCards
                key={index}
                features={card.features}
                description={card.description}
                items={card.items}
                iconClass={card.iconClass}
              />
            ))}
          </div>
        )}
      </div>

      <ScheduleCards />
    </div>
  );
}

export default Services;
