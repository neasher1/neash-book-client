import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../../shared/Spinner';
import MediaCard from '../MediaCard';

const TopPost = () => {

    const { data: topPosts = [], isLoading, refetch } = useQuery({
        queryKey: ['topPost'],
        queryFn: async () => {
            const res = await fetch('https://neash-book-server.vercel.app/topPosts');
            const data = await res.json();
            return data;
        }
    })
    refetch();

    if (isLoading) {
        return <Spinner></Spinner>;
    }

    return (
        <div className='grid grid-cols-1 mx-4 my-12'>
            {
                topPosts.map(post => <MediaCard
                    key={post._id}
                    post={post}
                ></MediaCard>)
            }
        </div>
    );
};

export default TopPost;