import React from 'react'
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography'

export default function NavbarLanding() {

    return (
        <div className="fixed top-0 z-50 w-full bg-white border border-black-800">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                <div className="inline-flex items-center space-x-2">
                    <span>
                        {/* insert logo */}
                    </span>
                    <Typography variant="h6" color="initial">Quizaroo</Typography>
                </div>
                <div className="hidden space-x-2 lg:block">
                    <Link to="login">
                        <button
                            type="button"
                            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Log In
                        </button>
                    </Link>
                    <Link to="register">
                        <button
                            type="button"
                            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );

}