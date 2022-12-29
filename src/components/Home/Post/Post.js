import React from 'react';
import img from '../../../Assets/neasher-bg1.png';

const Post = () => {
    return (
        <div className='border-solid border-2 p-6 bg-white shadow-sm my-8 rounded-md border-t-0'>
            <div className='flex flex-row justify-center items-center gap-4'>
                <img className="mask mask-circle w-12" src={img} alt='user' />
                <input type="text" placeholder="What's on your mind?" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="divider"></div>
            <div className='flex flex-row justify-center items-center gap-4'>
                <input type="file" className="file-input file-input-bordered file-input-primary w-64" />
                <button className='btn btn-primary text-white'>Post</button>
            </div>
        </div>
    );
};

export default Post;