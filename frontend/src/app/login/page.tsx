'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import Logo from '@/components/Logo';
import AuthService from '@/services/AuthService';


export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async () => {
       await AuthService.login(formData.email, formData.password).then(() => {
            router.push('/');
       }).catch(error => {
            console.error('Login failed:', error); 
            window.alert('Logout failed. Please try again.');
       });
    }

    const handleCancel = () => {
        router.push('/');
    }


    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-md-5">
                    <div>
                        <div className="text-center my-5">
                            <Logo />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label small fw-medium">Email</label>
                            <input type="email" className="form-control form-control-sm" name="email" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-medium">Password</label>
                            <input type="password" className="form-control form-control-sm" name="password" onChange={handleChange} required />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <button type="button" onClick={handleLogin} className="btn btn-sm btn-primary">Login</button>
                            <button type="button" onClick={handleCancel} className="btn btn-sm btn-danger">Cancel</button>
                        </div>
                    </div>
                    <div className="text-center border-top pt-3 small">
                        <p>Don't have an account? <a href="/register">Register here</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
