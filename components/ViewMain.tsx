'use client'

import { twMerge } from "tailwind-merge";

const ViewMain = () => {
    const pathname =usePathname();
    const postId = pathname.replace('/view/', '')

    const [imageUrl, setImageUrl] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [title, setTilte] = useState('');
    const [caption, setCaption] = useState('');

    useEffect(() => {
        
        async function fetchPostData() {
            try {
                const response = await fetch (`/api/post/${postId}/fetchData`, {
                    method : "GET",
                    headers : {"Content-Type" : "application/json"}
                });

                if (!response.ok) throw new Error ("feailde on response i nfetch post data");

                const data = await response.json();
                console.log(data);
                
                setImageUrl(data.imageUrl)
                setAuthorName(data.authorName);
                setAuthorEmail(data.authorEmail);
                setAuthorId(data.authorId)
                setTilte(data.title);
                setCaption(data.caption)
            } catch (err) {
                throw new Error (`error ino fethcing post data ${err}`)
            }
        };
        fetchPostData();
    }, [postId])

    return (
        <div className='flex justify-center items-center gap-10 pt-3 p-10 h-full text-neutral-600'>
            
            <PostImage imageUrl={imageUrl} />
            <Actions authorEmail={authorEmail} authorName={authorName} imageUrl={imageUrl} authorId={authorId} postId={postId} title={title} caption={caption} />

        </div>
    )
};


import Image from "next/image";
interface PostImageProps {
    imageUrl : string;
    className? : string;
}
const PostImage : React.FC<PostImageProps> = ({
    imageUrl,
    className
}) => {
    return (
        <Image 
            src={imageUrl}
            alt="image"
            width={500}
            height={500}
            className={twMerge(`
                w-[25rem] h-[30rem] rounded-lg
            `, className)}
        />
    )
}

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
interface ActionsProps {
    className ? : string;
    authorName : string;
    authorEmail : string;
    imageUrl : string;
    authorId : string;
    postId : string;
    caption : string;
    title : string;
}
// download
// like
// author name
// author email
import { useRouter } from "next/navigation";

import { AiFillHeart } from "react-icons/ai";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
const Actions : React.FC<ActionsProps> = ({
    className,
    authorName,
    authorEmail,
    imageUrl,
    authorId,
    postId,
    title,
    caption
}) => {
    const router = useRouter();

    const download = () => {
        const downloadableUrl = imageUrl.replace(
            '/upload',
            '/upload/fl_attachment'
        );

        const link = document.createElement('a');
        link.href = downloadableUrl;
        link.click();
    }

    const deletePost = async (e : React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const response = await fetch (`/api/post/${postId}/delete`, {
                method : "DELETE",
                headers : {"Content-Type" : "application/json"}
            });
            if (!response.ok) throw new Error ('failed to delete post on response');
            const data =await response.json();
            console.log(data);

            if (data.ok) router.push('/')
        } catch (err) {
            throw new Error (`eror on deleting the post : ${err}`)
        }
    }

    const actionIcons = [
        {
            icon : AiFillHeart,
            info : 'heart'
        },
        {
            icon : BsFillCloudDownloadFill,
            info : 'download',
            onClick : download
        },
        {
            icon : AiFillDelete,
            info : 'delete',
            onClick : deletePost
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
            <Icon size={23} className='transition hover:scale-150 hover:delay-200' onClick={onClick} />
        )
    }

    return (
        <div className={twMerge(`
            flex flex-col items-center gap-20
        `, className)}>
            
            <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold"> {title} </h1>
                <h2 className="text-lg"> {caption} </h2>
            </div>

            <div className="flex flex-col items-center">
                <small> posted by : </small>
                <h1 className="font-bold text-lg"> {authorName} </h1>
                <h2> {authorEmail} </h2>
            </div>

            <div className="flex gap-5 items-center mt-10">
                {actionIcons.map((actionIcon) => (
                    <Action key={actionIcon.info} icon={actionIcon.icon} info={actionIcon.info} onClick={actionIcon.onClick} />
                ))}
            </div>

        </div>
    )
}

export default ViewMain;