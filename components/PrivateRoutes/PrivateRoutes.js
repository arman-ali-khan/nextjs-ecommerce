import { useAllContext } from "@/context/ContextProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const { loading,dbUser:user } = useAllContext();

  if (loading) {
    return (
      <div className="flex justify-center flex-col items-center">
        <div
          className="spinner-border border-dashed border-primary animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        ></div>
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  useEffect(() => {
    if (!(user?.uid || loading)) {
      router.push('/account/login');
    }
  }, [user?.uid, loading]);

  return children;
};

export default PrivateRoutes;
