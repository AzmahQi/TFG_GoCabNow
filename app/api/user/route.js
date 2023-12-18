import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // The take the name-value of json needed
    const { email, password, contactNumber } = await request.json();

    const existingUserByEmail = await prisma.user.findUnique({
        where: {email: email}
    })

    if (existingUserByEmail){
        return NextResponse.json({user: null, message: "User with this email already exist"},{status:409})
    }

    const hashedPassword = await hash(password,12);
    const result = await prisma.user.create({
        data:{
            email,
            password: hashedPassword,
            contactNumber

        }
    })
    
    //lets hide the password
    const {password: newPassword, ...rest} = result;


    //returning the data we inserted
    return NextResponse.json({ user: rest, message: "User created successfully"},{status:201});
  } catch (error) {

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
