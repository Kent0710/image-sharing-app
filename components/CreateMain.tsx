'use client'

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { AiFillHeart } from "react-icons/ai";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { BiDotsHorizontal } from "react-icons/bi";

import Button from "./Button";

import { useUserPosts } from "@/hooks/useUserPosts";

const CreateMain = () => {
    const [userPosts, updateUserPosts] = useUserPosts(
        (state) => [state.userPosts, state.updateUserPosts],
    )

    return (
        <div className="flex flex-col md:flex-row gap-3 pt-3 p-10 h-full text-neutral-600">
            
            <Box className="basis-1/4">
                <PostDropZone />
            </Box>

            <Box className="basis-3/4" title="Your posts">
                <CardGroup data={userPosts} emptyText="You don't have any post yet." />
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

import { TypePosts } from "@/types";
interface CardGroupProps {
    emptyText ? : string;
    data : TypePosts[];
}
const CardGroup : React.FC<CardGroupProps> = ({
    emptyText,
    data
}) => {
    return (
        <div className="w-full h-full">
            {data.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                    <p> {emptyText} </p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-5 pl-10 h-fit overflow-hidden hover:overflow-y-auto">
                    {data.map((item) => (
                        <Card title={item.title} caption={item.caption} imageUrl={item.imageUrl} key={item.title} />
                    ))}
                </div>
            )}
        </div>
    )
}

interface CardProps {
    title : string;
    caption : string;
    imageUrl : string;
};
const Card : React.FC<CardProps> = ({
    title,
    caption,
    imageUrl
}) => {
    const [ isPointerOver, setIsPointerOver ] = useState(false);

    const handlePointer = () => {
        if (!isPointerOver) setIsPointerOver(true);
        else setIsPointerOver(false)
    };

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
                onClick : download
            },
            {
                icon : BiDotsHorizontal,
                info : 'info'
            }
        ]

        interface ActionsProps {
            icon : any;
            info : string;
            onClick : any;
        };

        const Action : React.FC<ActionsProps> = ({
            icon : Icon,
            info,
            onClick
        }) => {
            return (
                <Icon size={26} className='fill-white' onCick={onClick} />
            )
        }

        return (
            <div 
                onMouseLeave={handlePointer}
                className={twMerge(`
                    bg-slate-500 w-40 h-56 rounded-lg flex flex-col justify-between p-5 items-center text-white
                `,
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
            )}
        />
    )
}

import Image from "next/image";

import { ChangeEvent } from "react";

import { useDropzone } from "react-dropzone";
const PostDropZone = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState<any>();
    const [filename, setFilename] = useState('');
    const [previewImageUrl, setPreviewImageUrl] = useState('');


    const [postUploaded, setPostUploaded] = useState(false);
    const onDrop = (file : any) => {
        setPostUploaded(true);

        if (file) {
            const blobFile = new Blob(file);

            setFile(blobFile);
            setFilename(file.name);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImageUrl(reader.result as string);
            };
            reader.readAsDataURL(blobFile);
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    // handle the submit click event
    const handleSubmit = async (e : React.SyntheticEvent) => {
        e.preventDefault();
        uploadToCloudinary(file)
            .then((imageUrl) => {
                uploadPostToDatabase(title, caption, imageUrl)
                .then((res) => {
                    console.log(res);
                })
            })
            .catch((err) => {
                throw new Error (`error on promise uplaod to cloudinary : ${err}`)
            })
    }

    if (postUploaded) {
        return (
            <div className="flex flex-col gap-3 items-center h-full justify-center">
                
                <Image src={previewImageUrl} alt="image" width={0} height={0} className="w-1/2" />

                <form className="gap-3 flex flex-col px-10 w-full mt-5" onSubmit={handleSubmit}>

                    <label htmlFor="title" className="block text-md font-bold tracking-tight">Title</label>
                    <input type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        autoComplete={title}
                        className="rounded-lg py-1 px-4 font-semibold"
                    />

                    <label htmlFor="caption" className="block text-md font-bold mt-5 tracking-tight">Caption</label>
                    <input type="text"
                        name="caption"
                        id="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                        autoComplete={caption}
                        className="rounded-lg py-1 px-4 w-full"
                    />
                    
                    <Button type='submit' text="Post" className="bg-blue-500 mt-10 w-1/2 place-self-center"/>
                    <Button type='button' text="Discard" className="bg-red-500 w-1/2 place-self-center" onClick={() => setPostUploaded(false)} />
                </form>

            </div>
        )
    }

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

async function uploadToCloudinary(file : any, e? : React.SyntheticEvent) {
    e?.preventDefault();
    try {
        const cloudName = "dmvuenhhc";
        const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const formData = new FormData;
        formData.append('file', file);
        formData.append('upload_preset', 'image-sharing-app-post-images-bucket');

        const response = await fetch (apiUrl, {
            method : "POST",
            body : formData
        });

        if (!response.ok) throw new Error (`api upload failed`);

        const data = await response.json();
        console.log('Api returned data : ', data);
        const imageUrl = data.secure_url;
        return imageUrl;            
    } catch (err) {
        throw new Error (`error on upload to cloudinary functino : ${err}`)
    }
}


async function uploadPostToDatabase(title : string, caption : string, imageUrl : string, e? : React.SyntheticEvent) {
    e?.preventDefault();
    try {
        const response = await fetch ('/api/post/upload', {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({title, caption, imageUrl})
        });

        if (!response.ok) throw new Error ('error on saving the post to database');

        const data = await response.json();
        console.log(data);
        
        const res = {
            ok : data.ok,
        };

        return res;

    } catch (err) {
        throw new Error (`error on upload post to database function : ${err}`)
    }
}

export default CreateMain;