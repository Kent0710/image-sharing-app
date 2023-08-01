import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request : Request) {
    try {
        const session = await getServerSession(authOptions);

        if (session) {
            const userId = session.user.id;

            const allPosts = await prisma.posts.findMany({
                where : {
                    NOT : {
                        authorId : userId
                    }
                }
            });

            if (allPosts) {
                return NextResponse.json({
                    message : 'all posts success',
                    allPosts : allPosts,
                    ok : true
                })
            }

            return NextResponse.json({
                message : 'all posts failed',
                allPosts : null,
                ok : false
            })
        }

        return NextResponse.json({
            message : "not authorized",
            ok : false,
        })
    } catch (err) {
        return NextResponse.json({
            message : err,
            ok : false
        })
    }
}