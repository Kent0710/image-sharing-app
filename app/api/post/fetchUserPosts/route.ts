import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from './../../auth/[...nextauth]/route';

export async function GET(request : Request,) {
    try {
        const session = await getServerSession(authOptions);

        if (session) {
            const userId : string = session.user.id;

            const userPosts = await prisma.posts.findMany({
                where : {
                    authorId : userId
                },
                take : 10
            });

            if (userPosts) {
                return NextResponse.json({
                    message : "user posts success fetched",
                    userId : userId,
                    userPosts : userPosts,
                    ok : true,
                })
            } else {
                return NextResponse.json({
                    message : "user posts failed fetched",
                    userPosts : null,
                    ok : false,
                })
            }
        } else {
            return NextResponse.json({
                message : "you aren't authorized",
                ok : false,
            })
        }
    } catch (err) {
        return NextResponse.json({
            message : "catch onerror of fetch user posts",
            error : err
        })
    }
}