import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const googleProvider = new GoogleAuthProvider();

const Login = () => {

    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (data, event) => {
        signInUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast.success("Successfully logged in");
                event.target.reset();

                fetch(`https://neash-book-server.vercel.app/jwt?email=${data.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.accessToken) {
                            localStorage.setItem('accessToken', data.accessToken);
                        }
                    })
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const handleSignInGoogle = () => {
        signInWithGoogle(googleProvider)
            .then(res => {
                fetch(`https://neash-book-server.vercel.app/jwt?email=${res.user.email}`)
                    .then(res => res.json())
                    .then(token => {
                        localStorage.setItem('accessToken', token.accessToken);
                        const user = {
                            name: res.user.displayName,
                            email: res.user.email
                        };
                        fetch('https://neash-book-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(user)
                        })
                            .then(res => res.json())
                            .then(data => {
                                toast.success('Login successfully')
                                navigate('/')
                            })
                    });


            })
            .catch(err => toast.error(err))
    }

    return (
        <div className='h-[500px] flex justify-center items-center my-16'>
            <div className='w-96 card shadow-2xl p-8'>
                <h2 className="text-4xl font-bold text-primary mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register("email", {
                                required: "email address is required",
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className="text-error">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            {...register("password", {
                                required: "password is required",
                                minLength: { value: 6, message: "password must be 6 characters or longer" }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className="text-error">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text-alt">Forget Password?</span>
                        </label>
                    </div>
                    <input className='btn btn-primary w-full text-white my-2' type="submit" value="Login" />
                </form>
                <span className='text-sm my-2 text-center'>New to Neash Book? <Link to="/register" className='text-primary'>Create new account</Link> </span>
                <div className="divider">OR</div>
                <button onClick={handleSignInGoogle} className='uppercase btn btn-outline text-sm'>Continue With Google</button>
            </div>
        </div>
    );
};

export default Login;