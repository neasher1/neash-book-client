import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Post = () => {
    const { user } = useContext(AuthContext);
    const imgbbHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddPost = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    const addPost = {
                        img: imgData.data.url,
                        details: data.postDetails,
                        name: user?.displayName,
                        photoURL: user?.photoURL
                    }

                    fetch('https://neash-book-server.vercel.app/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(addPost)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success('Successfully Posted');
                            navigate('/media');
                        })

                }
            })

    }

    return (
        <div>
            {
                user ?
                    <form onSubmit={handleSubmit(handleAddPost)}>
                        <div className='border-solid border-2 p-6 bg-white shadow-sm my-8 rounded-md border-t-0 mx-4'>
                            <div className='flex flex-row justify-center items-center gap-4'>
                                <img className="mask mask-circle w-12" src={user?.photoURL} alt={user?.displayName} />
                                <input {...register("postDetails", {
                                    required: "Post Details is required"
                                })}
                                    type="text" placeholder={`What's on your mind, ${user?.displayName} ?`} className="input input-bordered w-full max-w-xs" />
                                {errors.postDetails && <span className='text-error'>{errors.postDetails.message}</span>}
                            </div>
                            <div className="divider"></div>

                            <div className="flex flex-row justify-center items-center gap-4">
                                <input
                                    {...register("image", {
                                        required: "Image is required"
                                    })}
                                    type="file" className="file-input file-input-bordered file-input-primary w-64" placeholder='Upload a Image' />
                                {errors.img && <span className='text-error'>{errors.img.message}</span>}
                                <button className='btn btn-primary text-white'>Post</button>
                            </div>

                        </div>
                    </form>
                    :
                    <div className='border-solid border-2 p-6 bg-white shadow-sm my-8 rounded-md border-t-0 mx-4'>
                        <Link to='/login'><h2 className="text-3xl text-center font-semibold text-primary">Please login to add a new post</h2></Link>
                    </div>

            }
        </div>
    );
};

export default Post;