import { authentication } from "@/firebase/firebase.config";
import actionTypes from "@/state/ProductState/actionTypes";
import {
  initialState,
  productsReducer,
} from "@/state/ProductState/productsReducer";
import {
  userInitialState,
  userReducer,
} from "@/state/ProductState/userReducer";
import axios from "axios";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-hot-toast";

export const ALL_CONTEXT = createContext();

const ProductsProvider = ({ children, data }) => {
  // show nav category
  const [showCategory, setShowCategory] = useState(false);

  // update money
  const [updateMoney, setUpdateMoney] = useState(false);

  // user loading
  const [userLoading, setUserLoading] = useState(true);
  // loadin until the get user from firebase
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});

  // products
  const [state, dispatch] = useReducer(productsReducer, initialState);
  // User
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);

  // get search data
  const [search, setSearch] = useState("");

  const updateUser = (info) => {
    updateProfile(authentication.currentUser, info)
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  // login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(authentication, email, password);
  };

  // Logout

  const logOut = () => {
    signOut(authentication)
      .then(() => {
        typeof window !== "undefined" && localStorage.removeItem("accessToken");
        toast.success("Logout success!");
        setUser({});
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user?.email]);


  // pagination
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch({ type: actionTypes.FETCHING_START });
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/products?page=${currentPage}`);
        const jsonData = await response.json();
        dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: jsonData });
      } catch (error) {
        dispatch({ type: actionTypes.FETCHING_ERROR, payload: error });
      }
    };

    fetchData();
  }, [currentPage]);

  const [dbUser, setDbUser] = useState({});

  // call data from local storage in nextjs
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/api/getUser?email=${user?.email}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDbUser(res.data);
          setUserLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 401 || !token) {
            setUserLoading(false);
            logOut().then(() => {
              router.push(`account/login`);
            })
          }
        });
    }
  }, [user?.email, updateMoney]);

 

  const value = {
    state,
    dispatch,
    userState,
    userDispatch,
    user,
    updateUser,
    loginUser,
    logOut,
    dbUser,
    loading,
    setLoading,
    search,
    setSearch,
    showCategory,
    setShowCategory,
    setUpdateMoney,
    updateMoney,
    // pagination
    currentPage,
    setCurrentPage,
    userLoading,
  };

  return <ALL_CONTEXT.Provider value={value}>{children}</ALL_CONTEXT.Provider>;
};

export const useAllContext = () => {
  const context = useContext(ALL_CONTEXT);
  return context;
};

export default ProductsProvider;
