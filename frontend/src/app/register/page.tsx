'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import Logo from '@/components/Logo';
import AuthService from '@/services/AuthService';


export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        name: '',
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

    const handleCancel = () => {
        router.push('/');
    }

    const handleRegister = async () => {
        await AuthService.register(formData.name, formData.email, formData.password).then(() => {
            router.push('/login');
        }).catch(error => {
            console.error('Registration failed:', error);
            window.alert('Logout failed. Please try again.');
        });
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
                            <label htmlFor="name" className="form-label small fw-medium">Name</label>
                            <input type="text" className="form-control form-control-sm" name="name" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label small fw-medium">Email</label>
                            <input type="email" className="form-control form-control-sm" name="email" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-medium">Password</label>
                            <input type="password" className="form-control form-control-sm" name="password" onChange={handleChange} required />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3 ">
                            <button type="button" onClick={handleRegister} className="btn btn-sm btn-primary">Register</button>
                            <button type="button" onClick={handleCancel} className="btn btn-sm btn-danger">Cancel</button>
                        </div>
                    </div>
                    <div className="text-center border-top pt-3 small">
                        <p>Already have an account? <a href="/login">Login here</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
