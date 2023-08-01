'use client'

import ayano from '@/public/images/ayano.jpg';

import Image from 'next/image';
import { useState } from 'react';

import { twMerge } from 'tailwind-merge'

import { BsFillCloudDownloadFill } from 'react-icons/bs'
import { BiDotsHorizontal } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'

import { useIsSidebarHiddenContext } from '@/providers/IsSidebarHidden';

import { TypePosts } from '@/types';

import { useRouter } from 'next/navigation';

interface CardGroupProps {
    emptyText? : string;
    data : TypePosts[];
}
const CardGroup : React.FC<CardGroupProps> = ({
    emptyText,
    data
}) => {
    const { isSidebarHidden } = useIsSidebarHiddenContext();

    return (
        <div className='w-full h-full'>
            {data.length === 0 ? (
                <div className='flex items-center justify-center w-full h-full'>
                    <p> {emptyText} </p>
                </div>
            ) : (
                <div className={twMerge(`flex pl-10 flex-wrap gap-5 h-fit overflow-hidden hover:overflow-y-auto`, isSidebarHidden && 'gap-8')}>
                    {data.map((item) => (
                        <Card title={item.title} caption={item.caption} imageUrl={item.imageUrl} id={item.id} key={item.id} />
                    ))}
                </div>
            )}
        </div>
    )
};


interface CardProps {
    id : string;
    title : string;
    caption : string;
    imageUrl : string;
}
const Card : React.FC<CardProps> = ({
    id,
    title,
    caption,
    imageUrl
}) => {
    const router = useRouter();

    const { isSidebarHidden } = useIsSidebarHiddenContext();

    const [isPointerOver, setIsPointerOver] = useState(false);

    const handlePointer = () => {
        if (!isPointerOver) setIsPointerOver(true);
        else setIsPointerOver(false)
    }

    const download = () => {
        const downloadableUrl = imageUrl.replace(
            '/upload',
            '/upload/fl_attachment'
        );

        const link = document.createElement('a');
        link.href = downloadableUrl;
        link.click();
    }

    if (isPointerOver) {
        const actionIcons = [
            {
                icon : AiFillHeart,
                info : 'heart'
            },
            {
                icon : BsFillCloudDownloadFill,
                info : 'download',
                onClick : download,
            },
            {
                icon : BiDotsHorizontal,
                info : 'info'
            }
        ]
        interface ActionProps {
            icon : any;
            info : string;
            onClick : any;
        }
        const Action : React.FC<ActionProps> = ({
            icon : Icon,
            info,
            onClick
        }) => {
            return (
                <Icon size={23} className='fill-white' onClick={onClick} />
            )
        }

        const viewPost = async (e : React.SyntheticEvent) => {
            e.preventDefault();
            try {
                router.push(`/view/${id}`)
            } catch (err) {
                throw new Error (`error on viewing the post : ${err}`)
            }
        }

        return (
            <div 
                onClick={viewPost}
                onMouseLeave={handlePointer}
                className={twMerge(`
                    bg-slate-500 w-40 h-56 rounded-lg flex flex-col justify-between p-5 items-center text-white
                `,
                isSidebarHidden && 'w-44 h-[15rem]'
            )}>
                <div className='flex flex-col items-center w-full h-36'>
                    <h1 className='font-bold '> {title} </h1>
                    <p className='w-full trunacte overflow-hidden text-center'> {caption} </p>
                </div>

                <div className='flex gap-3 place-self-end'>
                    {actionIcons.map((actionIcon) => (
                        <Action key={actionIcon.info} icon={actionIcon.icon} info={actionIcon.info} onClick={actionIcon.onClick} />
                    ))}
                </div>

            </div>
        )
    }

    return (
        <Image 
            src={imageUrl}
            alt='img'
            width={200}
            height={200}
            onMouseEnter={handlePointer}
            className={twMerge(`
                bg-slate-500 w-40 h-56 rounded-lg flex flex-col justify-between items-center text-white shrink-0
            `,
                isSidebarHidden && 'w-44 h-[15rem]'
            )}
        />
    )
}

export default CardGroup;