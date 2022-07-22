import React from "react";

const Footer = (props) => {
  return (
    <div className="p-4 m-4 rounded-md flex flex-col gap-4 bg-[#1A1E21]">
      <div className="text-sm">
        <span className="font-bold text-evolve-green">Powered</span> by
      </div>
      {/* Icons */}
      <div className="flex flex-wrap gap-2">
        {/* Trading View icon*/}
        <img
          src="https://fintechbreakthrough.com/wp-content/uploads/2022/03/tradingview-new-1.svg"
          alt="Trading View icon"
          className="bg-white p-1 rounded-md h-8 w-28"
        />
        {/* Yahoo finance icon */}
        <img
          src="https://seeklogo.com/images/Y/yahoo-finance-logo-D576345001-seeklogo.com.png"
          alt="Yahoo finance icon"
          className="bg-white p-1 rounded-md h-8 w-[4.5rem]"
        />
        {/* React icon */}
        <img
          src="https://w7.pngwing.com/pngs/186/205/png-transparent-react-native-react-logos-brands-icon-thumbnail.png"
          alt="React icon"
          className="bg-white p-1 rounded-md h-8 w-8"
        />
        {/* PlanetScale icon */}
        <img
          src="https://seeklogo.com/images/P/planetscale-logo-0EEA8CAEB4-seeklogo.com.png"
          alt="PlanetScale icon"
          className="bg-white p-1 rounded-md h-8 w-8"
        />
        {/* Heroku icon */}
        <img
          src="https://banner2.cleanpng.com/20180531/lbf/kisspng-heroku-computer-icons-computer-servers-catalog-ser-24-5b103ecbd98262.9829309615277913078909.jpg"
          alt="Heroku icon"
          className="bg-white rounded-md h-8 w-8"
        />
      </div>
      {/* Attribution */}
      <div className="text-sm mt-4 leading-loose">
        Created with ❤️ for the PlanetScale X Hashnode{" "}
        <img
          src="https://seeklogo.com/images/H/hashnode-logo-B114767E70-seeklogo.com.png"
          alt="Hashnode icon"
          className="h-6 w-6 rounded-md p-1 bg-white inline-block mx-0.5"
        />{" "}
        hackathon by{" "}
        <a
          href="https://thisisindrajit.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-evolve-green"
        >
          Indrajit
        </a>
      </div>
    </div>
  );
};

export default Footer;
