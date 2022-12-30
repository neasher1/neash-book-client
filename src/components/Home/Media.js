import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Spinner from '../shared/Spinner';
import TopPost from './Home/TopPost';
import MediaCard from './MediaCard';

const Media = () => {
    const { user } = useContext(AuthContext);

    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                const res = await fetch('https://neash-book-server.vercel.app/posts');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    });
    refetch();

    if (isLoading) {
        return <Spinner></Spinner>;
    }

    return (
        <div className='grid grid-cols-1 mx-4 my-12'>
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