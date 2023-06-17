import { useAllContext } from "@/context/ContextProvider";
import { useRouter } from "next/router";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const {user,dbUser,userLoading} = useAllContext()
 

  if (userLoading) {
     return <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex justify-center flex-col items-center">
        <div
          className="spinner-border border-dashed border-teal-600 animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        ></div>
        <span className="visually-hidden">Loading...</span>
      </div>
     </div>
    
  }else if(!user?.email){
    return router.push('/account/login')
  }
  return children;
};

export default PrivateRoutes;
