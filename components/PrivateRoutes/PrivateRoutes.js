import { useAllContext } from "@/context/ContextProvider";
import { useRouter } from "next/router";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const {user,dbUser,loading} = useAllContext()
 

  if (loading) {
     return <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex justify-center flex-col items-center">
        <div
          className="spinner-border border-dashed border-teal-600 animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        ></div>
        <span className="visually-hidden">Loading...</span>
      </div>
     </div>
    
  }
  if(user?.email){
    return <>{children}</>
}else{
    router.push('/account/login')
}
};

export default PrivateRoutes;
