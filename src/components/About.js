import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthProvider';

const About = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);

    const handleProfile = (data) => {
        const profile = {
            name: data.name,
            email: data.email,
            university: data.university,
            address: data.address
        }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(profile)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    fetch(`http://localhost:5000/jwt?email=${user?.email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.accessToken) {
                                localStorage.setItem('accessToken', data.accessToken);
                                toast.success("Profile Updated")
                            }
                        })
                }
            })
    }


    return (
        <div className='my-12 mx-4'>
            <div className='w-full card shadow-2xl p-8'>
                <h2 className="text-4xl font-bold text-primary mb-4 text-center">About Me</h2>
                <form onSubmit={handleSubmit(handleProfile)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            {...register("name", {
                                required: "name is required",
                            })}
                            className="input input-bordered" />
                        {errors.name && <p className="text-error">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register("email", {
                                required: "email address is required",
                            })}
                            className="input input-bordered" />
                        {errors.email && <p className="text-error">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">University</span>
                        </label>
                        <input type="text"
                            {...register("university", {
                                required: "university is required",
                            })}
                            className="input input-bordered" />
                        {errors.university && <p className="text-error">{errors.university?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input type="text"
                            {...register("address", {
                                required: "Address is required",
                            })}
                            className="input input-bordered" />
                        {errors.address && <p className="text-error">{errors.address?.message}</p>}
                    </div>
                    <input className='btn btn-primary w-full text-white my-2' type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};

export default About;