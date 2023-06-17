import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useUser = (user) => {
  const [dUser, setDbUser] = useState({});
  const email = user.email;





  useEffect(() => {
    if (email) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/getUser/${email}`, {
          headers: {
            authorization: `Bearer ${
              typeof window !== "undefined" &&
              localStorage.getItem("accessToken")
            }`,
          },
        })
        .then((res) => {
          setDbUser(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            toast.error("Access Token is invalid");
          }
        });
    }
  }, [user]);
  return [dUser];
};

export default useUser;
