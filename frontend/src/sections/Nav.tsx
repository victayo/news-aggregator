'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from '@/components/Logo'
import AuthService from '@/services/AuthService';

export default function Nav() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const router = useRouter();
    
    React.useEffect(() => {
        // Check if user is logged in
        setIsLoggedIn(AuthService.isLoggedIn());
    }, []);

    const logout = () => {
        AuthService.logout().then(() => {
            setIsLoggedIn(false);
            router.push('/');
        }).catch(error => {
            console.error('Logout failed:', error);
            window.alert('Logout failed. Please try again.');
        });
    }

    return (
        <div className="container-fluid sticky-top px-0">
            <div className="container-fluid bg-light">
                <div className='px-md-5'>
                    <nav className="navbar navbar-light navbar-expand-xl">
                        <Logo />
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-light py-3" id="navbarCollapse">
                            <div className="navbar-nav w-100 mx-3 border-top">
                                {/* <Search /> */}
                            </div>
                            <div className="d-flex flex-nowrap border-top pt-3 pt-xl-0 ">
                                {isLoggedIn ? (
                                    <div className='d-flex'>
                                        <a href='/preference' className="btn btn-outline-primary border border-primary bg-white my-auto" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Preference">
                                            <i className="fas fa-cogs text-primary"></i>
                                        </a>

                                        <button className="btn btn-outline-danger border border-danger bg-white my-auto mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Logout" onClick={logout}>
                                            <i className="fas fa-sign-out-alt text-danger"></i>
                                        </button>
                                    </div>
                                ) : (<Link className='btn btn-outline-primary border border-primary bg-white my-auto' href='/login' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Login">
                                    <i className="fas fa-sign-in-alt text-primary"></i>
                                </Link>)}

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}
