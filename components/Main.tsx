'use client'

import { twMerge } from  'tailwind-merge'

import { BiHide } from 'react-icons/bi'

import CardGroup from './CardGroup';

import { useIsSidebarHiddenContext } from '@/providers/IsSidebarHidden';

const Main = () => {
    const { isSidebarHidden, updateIsSidebarHidden } = useIsSidebarHiddenContext();

    return (
        <div className='flex gap-3 pt-3 p-10 h-full text-neutral-600'>
            
            {!isSidebarHidden ? <Sidebar /> : null}
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

const Sidebar = () => {
    return (
        <Box className='basis-1/3' title='Your posts'>
            
            <CardGroup />

        </Box>
    )
};

const MainView = () => {
    return (
        <Box className='bg- shadow-none' title='Explore'>
            
            <CardGroup />

        </Box>
    )
};

export default Main;