import React from "react";
import Logo from "../assets/images/SataJatim-removebg-preview.png";

const FooterLandingPage = () => {
  return (
    <div className="">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0c4a6e"
          fillOpacity="1"
          d="M0,192L48,197.3C96,203,192,213,288,218.7C384,224,480,224,576,213.3C672,203,768,181,864,170.7C960,160,1056,160,1152,165.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <section className="bg-sky-900 px-6 sm:px-10 text-gray-50 pb-20">
        <div className="md:max-w-7xl mx-auto text-center md:text-left md:flex">
          <div className="mb-5 md:basis-1/2">
            <div className="flex items-center gap-2 pb-5  justify-center md:justify-start">
              <img src={Logo} alt="" className="w-36" />
              <h1 className="text-green-400 font-bold text-2xl">Satu Data Jawa Timur</h1>
            </div>
            <p className="px-10 md:px-0 md:pr-36 leading-relaxed">
              Politeknik Elektronika Negeri Surabaya (PENS). Jl. Raya ITS,
              Keputih, Kec. Sukolilo, Kota SBY, Jawa Timur 60111
            </p>
          </div>
          <div className="flex flex-col gap-y-5 md:pl-20 md:flex-row md:gap-24 ">
            <div className="">
              <h1 className="text-green-400 font-bold text-lg mb-2">Info</h1>
              <p>Tentang SATA JATIM</p>
              <p>Kontak Kami</p>
              <p>Kerjasama</p>
            </div>
            <div className="">
              <h1 className="text-green-400 font-bold text-lg mb-2">
                Bantuan
              </h1>
              <p>FAQ</p>
              <p>Kebijakan Privasi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterLandingPage;