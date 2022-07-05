import axios from "axios";


export const removelocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("userID");
};

export const verifyToken = async (uid, name) => {
  // const VERIFICATION_ENDPOINT = "http://localhost:80/evolve/verifyToken.php";
  const VERIFICATION_ENDPOINT = process.env.REACT_APP_API_URL + "/verifyToken.php";

  const data = {
    userid: uid,
    name: name,
  };

  const verificationheaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    let verificationresponse = await axios.post(
      VERIFICATION_ENDPOINT,
      data,
      verificationheaders
    );

    if (verificationresponse.data.verified === "true") {
      return true;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
};
