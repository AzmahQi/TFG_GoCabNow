import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// To see if we are authenticated or not.
export async function GET (request) {
    const session = await getServerSession(authOptions)
    if  (!session){
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
    }
    return NextResponse.json({authenticated: !!session})
}