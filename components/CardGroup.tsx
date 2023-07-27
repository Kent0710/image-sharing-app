'use client'

import ayano from '@/public/images/ayano.jpg';

import Image from 'next/image';
import { useState } from 'react';

import { twMerge } from 'tailwind-merge'

import { BsFillCloudDownloadFill } from 'react-icons/bs'
import { BiDotsHorizontal } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'

import { useIsSidebarHiddenContext } from '@/providers/IsSidebarHidden';

const CardGroup = () => {
    const { isSidebarHidden } = useIsSidebarHiddenContext();

    return (
        <div className={twMerge(`
            flex flex-wrap gap-5 pl-10 h-[45rem] overflow-hidden hover:overflow-y-auto     
        `,
            isSidebarHidden && 'gap-8'
        )}>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
            <Card text="this is a card"/>
        </div>
    )
};


interface CardProps {
    text : string;
}
const Card : React.FC<CardProps> = ({
    text
}) => {
    const { isSidebarHidden } = useIsSidebarHiddenContext();

    const [isPointerOver, setIsPointerOver] = useState(false);

    const handlePointer = () => {
        console.log('pointer over')
        if (!isPointerOver) setIsPointerOver(true);
        else setIsPointerOver(false)
    }

    if (isPointerOver) {
        const actionIcons = [
            {
                icon : AiFillHeart,
                info : 'heart'
            },
            {
                icon : BsFillCloudDownloadFill,
                info : 'download'
            },
            {
                icon : BiDotsHorizontal,
                info : 'info'
            }
        ]
        interface ActionProps {
            icon : any;
        }
        const Action : React.FC<ActionProps> = ({
            icon : Icon,
        }) => {
            return (
                <Icon size={23} className='fill-white' />
            )
        }

        return (
            // <div className='bg-slate-500 w-40 h-56 rounded-lg flex flex-col justify-between p-5 items-center text-white' onMouseLeave={handlePointer}>
            <div 
                onMouseLeave={handlePointer}
                className={twMerge(`
                    bg-slate-500 w-40 h-56 rounded-lg flex flex-col justify-between p-5 items-center text-white
                `,
                isSidebarHidden && 'w-44 h-[15rem]'
            )}>
                <h1 > {text}  pointer true </h1>

                <div className='flex gap-3 place-self-end'>
                    {actionIcons.map((actionIcon) => (
                        <Action key={actionIcon.info} icon={actionIcon.icon}/>
                    ))}
                </div>

            </div>
        )
    }

    return (
        <div 
            onMouseEnter={handlePointer}
            className={twMerge(`
                    bg-slate-500 w-40 h-56 rounded-lg flex flex-col justify-between p-5 items-center text-white
                `,
                isSidebarHidden && 'w-44 h-[15rem]'
        )}>    
            <h1>{text} </h1>
        </div>
    )
}

export default CardGroup;