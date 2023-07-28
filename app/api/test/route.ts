import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request : Request) {
    try {

        const session = await getServerSession(authOptions);

        return NextResponse.json({
            message : 'success',
            session : session
        })
        

    } catch (err) {
        return NextResponse.json({
            message : `error on api : ${err}`
        })
    }
}