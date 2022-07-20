import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-4 gap-2">
      <div className="text-9xl text-red-500">404</div>
      <div className="text-center leading-loose">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </div>
      <Link to="/">
        <div className="border-2 border-white p-4 font-bold my-2 hover:text-white hover:bg-evolve-green hover:border-evolve-green transition-all text-xs flex items-center justify-center gap-2 rounded-md mt-4">
          BACK TO HOME
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
