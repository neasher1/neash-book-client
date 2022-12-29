import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../shared/Spinner';
import MediaCard from './MediaCard';

const Media = () => {

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/posts');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    });

    if (isLoading) {
        return <Spinner></Spinner>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mx-4 my-12'>
            {
                posts.map(post => <MediaCard
                    key={post._id}
                    post={post}
                ></MediaCard>)
            }
        </div>
    );
};

export default Media;