'use client'

import { twMerge } from  'tailwind-merge'

import { BiHide } from 'react-icons/bi'

import CardGroup from './CardGroup';

import { useIsSidebarHiddenContext } from '@/providers/IsSidebarHidden';

import { useUserPosts } from '@/hooks/useUserPosts';

const Main = () => {
    const { isSidebarHidden, updateIsSidebarHidden } = useIsSidebarHiddenContext();

    return (
        <div className='flex gap-3 lg:pt-3 lg:p-10 h-full text-neutral-600'>
            
            {!isSidebarHidden ? <Sidebar /> : <ToggledSidebar/>}
            <MainView />

        </div>
    )
};

interface BoxProps {
    children : React.ReactNode,
    className? : string
    title? : string;
}
const Box : React.FC<BoxProps> = ({
    children,
    className,
    title
}) => {
    const { isSidebarHidden, updateIsSidebarHidden } = useIsSidebarHiddenContext();

    return (
        <div className={twMerge(`bg-slate-200 shadow-2xl h-full w-full rounded-lg p-5 flex flex-col gap-3`,
            className
        )}>

            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg'> {title} </h1>
                {title !== 'Explore' ? <BiHide size={26} className='hover:cursor-pointer' onClick={() => updateIsSidebarHidden(true)} /> : null}
            </div>
            
            {children}
        </div>
    )
}


import { useEffect, useState } from 'react';

import { TypePosts } from '@/types';

const Sidebar = () => {
    // handle the fetching of the posts here then send to the card group, for own user posts
    // const [userPosts, setUserPosts] = useState<TypePosts[]>([]);
    const [userPosts, updateUserPosts] = useUserPosts(
        (state) => [state.userPosts, state.updateUserPosts],
    )

    useEffect(() => {
        async function fetchUserPosts() {
            try {
                const response = await fetch (`/api/post/fetchUserPosts`, {
                    method : "GET",
                    headers : {"Content-Type" : "application/json"},
                });

                if (!response.ok) throw new Error (`failed on the api fetc huser posts`)

                const data = await response.json();
                console.log(data);
                
                const fetchedUserPosts = await data.userPosts;
                updateUserPosts(fetchedUserPosts);
                // setUserPosts(userPosts);
            } catch (err) {
                throw new Error (`error on the use effect of fetch users : ${err}`)
            } 
        };

        fetchUserPosts();
    }, [updateUserPosts])
    return (
        <Box className='basis-1/3 hidden md:block' title='Your posts'>
            
            <CardGroup emptyText="You don't have any post yet." data={userPosts} />

        </Box>
    )
};

const MainView = () => {
    const [allPosts, setAllPosts] = useState<TypePosts[]>([]);
    useEffect(() => {
        async function fetchAllPosts() {
            try {   
                const response = await fetch (`/api/post/fetchAllPosts`, {
                    method : "GET",
                    headers : {"Conetnt-Type" : "application/json"}
                });
                if (!response.ok) throw new Error ('faiedl on the fetchcall to call posts');
                const data = await response.json();
                console.log(data);

                const allPosts = await data.allPosts;
                setAllPosts(allPosts);
            } catch (err) {
                throw new Error(`failed on the api fetch all opsts`)
            }
        };
        fetchAllPosts();
    }, [])
    
    return (
        <Box className='bg- shadow-none' title='Explore'>
            
            <CardGroup emptyText="No posts from the database yet." data={allPosts} />

        </Box>
    )
};


// when sidebar is hidden
const ToggledSidebar = () => {
    const { updateIsSidebarHidden } = useIsSidebarHiddenContext();

    return(
        <div className='bg-slate-300 p-5 rounded-full'>
            <BiHide size={26} className='hover:cursor-pointer' onClick={() => updateIsSidebarHidden(false)} />
        </div>
    )
}

export default Main;