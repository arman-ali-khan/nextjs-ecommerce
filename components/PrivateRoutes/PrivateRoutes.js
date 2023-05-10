import { useAllContext } from '@/context/ContextProvider';
import { useRouter } from 'next/router';
import React from 'react';

const PrivateRoutes = ({children}) => {
    const router = useRouter()
    const {user,loading} = useAllContext()
    if(loading){
        return <div className="flex justify-center flex-col items-center">
        <div className="spinner-border border-dashed border-primary animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
        </div>
          <span className="visually-hidden">Loading...</span>
      </div>
    }

    if(!user){
        return router.push('/account/login')
    }
    return children
    
};

export default PrivateRoutes; 