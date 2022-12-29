import React from 'react';
import { useLoaderData } from 'react-router-dom';

const PostDetails = () => {

    const postDetails = useLoaderData();
    const { img, details, _id, name, reaction, comments } = postDetails;

    return (
        <div>
            {
                postDetails ?
                    <div className="card lg:card-side bg-base-100 shadow-xl my-12 mx-4">
                        <figure>
                            <img src={img} alt="img" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Uploader Name: {name}</h2>
                            <h2 className="card-title">Reaction: {reaction}</h2>
                            <p className="card-title">Details: {details}</p>
                            <p className="card-title">Comments</p>
                            {
                                comments?.map(comment => <p>{comment.commentTxt}</p>)
                            }
                        </div>
                    </div>
                    :
                    undefined
            }
        </div>

    );
};

export default PostDetails;