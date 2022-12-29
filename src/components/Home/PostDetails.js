import React from 'react';
import { useLoaderData } from 'react-router-dom';

const PostDetails = () => {

    const postDetails = useLoaderData();
    const { img, details, _id } = postDetails;
    console.log(postDetails);

    return (
        <div>
            <h2 className="text-3xl">Post Details</h2>
            <h2 className="text-3xl">{details}</h2>
        </div>
    );
};

export default PostDetails;