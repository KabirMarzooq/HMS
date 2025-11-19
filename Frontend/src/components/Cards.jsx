import { Link } from "react-router-dom";

export function FieldCards({ image, alt, iconClass, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-lg group/card hover:shadow-2xl hover:-translate-y-3 transition-all ease-in duration-200">
      <div className="overflow-hidden rounded-t-xl">
        <img
          loading="lazy"
          src={image}
          alt={alt}
          className="object-cover w-full h-50 group-hover/card:scale-[1.02] transition-all ease-in duration-200"
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
    </div>
  );
}
