import { authOptions } from './../../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET(request : Request, 
    { params } : { params : { postId : string } }    
) {
    try {
        const postId = params.postId;

        const session = await getServerSession(authOptions);

        if (postId && session) {
            const post = await prisma.posts.findUnique({
                where : {
                    id : postId
                },
                include : {
                    author : true
                }
            });

            if (post) {
                const authorName = post.author.name;
                const authorEmail = post.author.email;
                const imageUrl = post.imageUrl;
                const authorId = post.author.id
                const title = post.title;
                const caption = post.caption

                return NextResponse.json({
                    message : "success psot",
                    authorName : authorName,
                    authorEmail : authorEmail,
                    imageUrl : imageUrl,
                    authorId : authorId,
                    title : title,
                    caption : caption,
                    ok : true,
                })
            } else {
                return NextResponse.json({
                    message : "failed to fetch post from the api",
                    authorName : '',
                    authorEmail : '',
                    imageUrl : '',
                    authorId : '',
                    title : '',
                    caption : '',
                    ok : false
                })
            }
        } else {
            return NextResponse.json({
                message : "you arent authorized or you dont hafve post id",
                ok : false
            })
        }
    } catch (err) {
        return NextResponse.json({
            message : "error on fetching post data form api on error",
            ok : false
        })
    }
}