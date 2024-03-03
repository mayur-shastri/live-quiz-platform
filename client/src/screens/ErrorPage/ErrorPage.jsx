import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography'


function ErrorPage({status}) {

    const navigate = useNavigate();

    const goToHome = ()=>{
        navigate('/app/home');
    }

    return (
        <div className="flex items-center justify-center h-screen w-full">
          <div>
            <Typography variant="h1" color="initial">{status} Error</Typography>
            <Typography variant="h5" color="initial">We can&apos;t find that page</Typography>
            <p className="mt-4 text-gray-500 font-m-plus-rounded">
              Sorry, the page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="mt-6 flex items-center space-x-3">
              <button
                type="button"
                onClick={goToHome}
                className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-m-plus-rounded text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <ArrowLeft size={16} className="mr-2" />
                Home
              </button>
              <button
                type="button"
                className="rounded-md bg-black  px-3 py-2 text-sm font-m-plus-rounded text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      );
}

export default ErrorPage;
