'use client'

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { AiFillHeart } from "react-icons/ai";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { BiDotsHorizontal } from "react-icons/bi";

import Button from "./Button";

const CreateMain = () => {
    return (
        <div className="flex gap-3 pt-3 p-10 h-full text-neutral-600">
            
            <Box className="basis-1/2" title="Your posts">
                <CardGroup />
            </Box>

            <Box className="basis-1/2">
                <PostDropZone />
            </Box>

        </div>
    )
};

interface BoxProps {
    children : React.ReactNode;
    className? : string;
    title? : string;
}
const Box : React.FC<BoxProps> = ({
    children,
    className,
    title
}) => {
    return (
        <div className={twMerge(`
            bg-slate-200 shadow-2xl h-full w-full rounded-lg p-5 flex flex-col gap-3
        `,
            className
        )}>
            {children}
        </div>
    )
}

const CardGroup = () => {
    return (
        <div className="flex flex-wrap gap-5 pl-10 h-[45rem] overflow-hidden hover:overflow-y-auto">
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
            <Card text="this is a card" />
        </div>
    )
}

interface CardProps {
    text : string;
};
const Card : React.FC<CardProps> = ({
    text,
}) => {
    const [ isPointerOver, setIsPointerOver ] = useState(false);

    const handlePointer = () => {
        if (!isPointerOver) setIsPointerOver(true);
        else setIsPointerOver(false)
    };

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

        interface ActionsProps {
            icon : any;
        };

        const Action : React.FC<ActionsProps> = ({
            icon : Icon,
        }) => {
            return (
                <Icon size={26} className='fill-white' />
            )
        }

        return (
            <div 
                onMouseLeave={handlePointer}
                className={twMerge(`
                    bg-slate-500 w-40 h-56 rounded-lg flex flex-col justify-between p-5 items-center text-white
                `,
            )}>
                <h1> {text}  pointer true </h1>

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
        )}>    
            <h1>{text} </h1>
        </div>
    )
}

import { useDropzone } from "react-dropzone";
const PostDropZone = () => {
    const onDrop = (file : any) => {
        console.log(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

    return (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} 
            w-full h-full rounded-lg flex flex-col items-center justify-center font-bold text-neutral-500 shadow-2xl gap-3
        `}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag drop some files here, or click to select files</p>
          )}
          <Button text='Upload' className="w-40 bg-blue-500"/>
        </div>
      );
}

export default CreateMain;