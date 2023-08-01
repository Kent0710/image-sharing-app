import { authOptions } from './../../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth';

export async function DELETE(request : Request, 
    { params } : { params : { postId : string } }    
) {
    try {
        const session = await getServerSession(authOptions);
        const postId = params.postId;

        if (session && postId) {
            const post = await prisma.posts.delete({
                where : {
                    id : postId
                }
            });

            if (post) {
                return NextResponse.json({
                    message : 'post successfulyly deleted',
                    post : post,
                    ok : true
                })
            } else {
                return NextResponse.json({
                    message : 'post failed to delete',
                    post : null,
                    ok : false
                })
            }
        } else {
            return NextResponse.json({
                message : 'you dont have post id or session',
                ok : false
            })
        }
    } catch (err) {
        return NextResponse.json({
            message : 'failed to delete post at api err',
            ok : false
        })
    }
}