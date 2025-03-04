import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({allPlayers}) => {
  console.log(allPlayers)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader color="#16A34A" size={50} />
    </div>
  );
};

export default Loader;
