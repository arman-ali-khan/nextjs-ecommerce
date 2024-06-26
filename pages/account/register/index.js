import Layout from "@/Layout/Layout";
import { useAllContext } from "@/context/ContextProvider";
import { authentication } from "@/firebase/firebase.config";
import setToken from "@/hooks/setToken";
import useToken from "@/hooks/useToken";
import actionTypes from "@/state/ProductState/actionTypes";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const index = () => {
  const router = useRouter();
  const { userState, userDispatch, updateUser } = useAllContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // created user email
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  // access token
  // get params url
  const { next } = router.query;
  const [token] = useToken(createdUserEmail);

  if (token) {
    if (next) {
      router.push(`/${next}`);
    } else {
      router.push("/");
    }
  }

  // get agents
  const [agents, setAgents] = useState([]);
  const [agentLoad, setAgentsLoad] = useState(true);

  useEffect(() => {
    axios
      .get("/api/agents")
      .then((response) => {
        setAgents(response.data);
        setAgentsLoad(false);
      })
      .catch((error) => {
        console.log(error);
        setAgentsLoad(false);
      });
  }, []);



  const handleRegister = (data) => {
    userDispatch({ type: actionTypes.GETTING_USER_START });
    const phone = data.phone;
    const name = data.name;
    const email = data.email;
    const password = data.password;
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const photo = "/logo.svg";
        userDispatch({
          type: actionTypes.GETTING_USER_SUCCESS,
          payload: { user },
        });

        if (userCredential.user) {
          // user info insert in mongodb
          // user data
          const userData = {
            name,
            photo,
            email,
            phone,
            stock: 0,
            balance: 0,
            id: "1234567890",
            revenue: 0,
            type:'user',
            location: "",
            uid: userCredential.user.uid,
            agent: data.agent,
          };
          // send data in database
          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_PRO}/api/user/create`,
              userData,
              {
                headers: {
                  "content-type": "application/json",
                },
              }
            )
            .then(
              (response) => {
                toast.success("Account Successfully Created");
                setToken(response.data);
                setCreatedUserEmail(email);
              },
              (error) => {
                const errorMessage = error.message;
                userDispatch({
                  type: actionTypes.GETTING_USER_ERROR,
                  payload: { errorMessage },
                });
              }
            );
        }

        // info
        const info = { displayName: name, photoURL: photo };
        // update user info
        updateUser(info)
          .then(() => {
            // update user firebase
          })
          .catch((error) => {
            userDispatch({
              type: actionTypes.GETTING_USER_ERROR,
              payload: { error: error },
            });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        userDispatch({
          type: actionTypes.GETTING_USER_ERROR,
          payload: { errorMessage },
        });
        // ..
      });
  };

  return (
    <Layout title={"Register || Nobin Udyokta"}>
      <div className="my-20 items-center container mx-auto flex justify-center">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="w-96 bg-base-200 rounded-xl md:px-9 px-4 py-6 flex flex-col gap-2"
        >
          <div>
            <h2 className="text-2xl uppercase text-teal-600 font-bold">
              New Account Create
            </h2>
          </div>

          <>
            {/* Name */}
            <label className="flex flex-col">
              Full Name
              <input
                {...register("name", { required: true })}
                placeholder="Full Name"
                className="border border-teal-600 px-4 py-3 rounded"
                type="text"
              />
              {/* Error handle */}
              {errors.name && (
                <span className="text-rose-500">This field is required</span>
              )}
            </label>
            {/* Phone number */}
            <label className="flex flex-col">
              Phone Number
              <input
                {...register("phone", { required: true })}
                placeholder="Phone Number"
                className="border border-teal-600 px-4 py-3 rounded"
                type="text"
              />
              {/* Error handle */}
              {errors.phone && (
                <span className="text-rose-500">This field is required</span>
              )}
            </label>
            {/* Email Address */}
            <label className="flex flex-col">
              Email Address
              <input
                {...register("email", { required: true })}
                placeholder="Email Address"
                className="border border-teal-600 px-4 py-3 rounded"
                type="email"
              />
              {/* Error handle */}
              {errors.email && (
                <span className="text-rose-500">This field is required</span>
              )}
            </label>
            {/* Gender */}
            <label>Gender</label>
            <fieldset className="flex items-center gap-4">
              <legend className="sr-only">Gender</legend>
              <div className="flex items-center">
                <select
                  className="select border border-teal-600"
                  {...register("gender", { required: true })}
                >
                  <option value="male" key="male">
                    Male
                  </option>
                  <option value="female" key="female">
                    Female
                  </option>
                </select>
              </div>
            </fieldset>
            {/* Agents */}
            <label>Agent</label>
            <fieldset className="flex items-center gap-4">
              <legend className="sr-only">Gender</legend>
              <div className="flex items-center">
                {agentLoad ? (
                  <select className="select border border-teal-600">
                    <option value="" key="">
                      Agents are loading...
                    </option>
                  </select>
                ) : (
                  <select
                    className="select border border-teal-600"
                    {...register("agent", { required: true })}
                  >
                    {agents.map((agent, i) => {
                      return (
                        <option className="select" value={agent.email} key={i}>
                          {agent.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
            </fieldset>
            {/* Password */}
            <label className="flex flex-col">
              Password
              <input
                {...register("password", { required: true })}
                className="border border-teal-600 px-4 py-3 rounded "
                type="password"
              />
              {/* Error handle */}
              {errors.password && (
                <span className="text-rose-500">This field is required</span>
              )}
            </label>
          </>
          <p className="text-rose-600"> {userState.errorMessage}</p>
          {/* Register */}
          <div className="mx-6">
            <button className="w-full px-3 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white">
              {userState.loading ? "Loading..." : "Register"}
            </button>
          </div>
          <div className="flex flex-col gap-2 mx-6">
            {/* Recover Password */}
            <Link
              className="text-teal-600 hover:underline font-bold"
              href={"#"}
            >
              Recover Password
            </Link>
            {/* Already have an account */}
            <Link
              className="text-teal-600 hover:underline font-bold"
              href={"/account/login"}
            >
              <span className="text-black">Already have an account?</span>{" "}
              <span>Login</span>
            </Link>
          </div>
          <div id="sign-in-button"></div>
        </form>
      </div>
    </Layout>
  );
};

export default index;
