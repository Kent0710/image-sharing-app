import { NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma'

export async function POST(request : Request) {
    try {
        const session = await getServerSession(authOptions);
        const { title, caption, imageUrl } = await request.json();

        if (session) {
            const authorId : string = session.user.id;

            const newPost = await prisma.posts.create({
                data : {
                    title : title,
                    caption : caption,
                    imageUrl : imageUrl,
                    authorId : authorId
                }
            });

            if (newPost) {
                return NextResponse.json({
                    message : 'success',
                    newPost : newPost,
                    ok : true
                })
            }

            return NextResponse.json({
                message : 'new post failed',
                newPost : null,
                ok : false
            })
        };

        return NextResponse.json({
            message : "you aren't signed in",
            newPost : null,
            ok : false
        })
    } catch (err) {
        return NextResponse.json({
            error : err
        })
    }
}