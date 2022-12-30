import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthProvider';
import ModalAbout from './ModalAbout';
import Spinner from './shared/Spinner';

const About = () => {
    const { user } = useContext(AuthContext);

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    const { university, address, _id } = users;
    refetch();
    // console.log(users.body.name);

    if (isLoading) {
        return <Spinner></Spinner>
    }


    return (
        <div className='flex md:justify-between flex-col md:flex-row px-2 md:px-0 gap-5 my-20 h-screen'>
            <div className='w-full'><img src={user?.photoURL} alt="" /></div>
            <div className='w-full'>
                <div className=' flex gap-3'>
                    <h3 className='text-2xl font-bold'>Name : {users?.body?.name}</h3>
                    <label htmlFor="aboutModal" className='btn btn-square btn-ghost btn-sm w-6 h-3'><p>Edit</p></label>
                </div>
                <p className='text-sm text-gray-600 font-bold'> Email : {users?.body?.email}</p>
                <p className='mt-3 font-semibold'>University : {users?.body?.university} </p>
                <p className=' font-semibold'>Address : {users?.body?.address}</p>
            </div>

            {/* Put this part before </body> tag */}
            <ModalAbout user={user} address={address} university={university} id={_id}></ModalAbout>
        </div>
    );
};

export default About;