import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { FaRegComments } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const MediaCard = ({ post }) => {
    const { _id, img, details } = post;
    // console.log(post);
    // const { comment, setComment } = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const commentDetails = form.comment.value;
        console.log(commentDetails);

        const comment = {
            comment: commentDetails
        }

        // fetch(`http://localhost:5000/comment?id=${_id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     body: JSON.stringify(comment)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.acknowledged) {
        //             toast.success("Comment Confirmed");
        //         }
        //         else {
        //             toast.error(data.message);
        //         }
        //     })

    }

    return (
        <div className="card shadow-xl">
            <figure>
                <img className='w-2/5' src={img} alt="img" />
            </figure>
            <div className="card-body">
                <p>{details}</p>
                <div className="divider"></div>
                <div className='flex flex-row justify-between items-center'>
                    <button className='text-xl btn text-white'><BiLike /></button>

                    <label htmlFor="comment" className="btn text-white text-xl"><FaRegComments /></label>

                    <input type="checkbox" id="comment" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <form onSubmit={handleSubmit}>
                                <input name='comment' type="text" placeholder="Type your comment" className="input input-bordered w-full max-w-xs" />

                                <div className="modal-action">
                                    <label type='submit' htmlFor="comment" className="btn text-white">Close</label>
                                    <input htmlFor="comment" className="btn text-white" type="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div className="divider"></div>
                <div className="card-actions justify-center">
                    <Link to={`/media/${_id}`} className="btn btn-primary text-white">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default MediaCard;