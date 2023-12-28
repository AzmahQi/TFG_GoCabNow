import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Retrieve information by email
export async function GET(request) {

    const data = await prisma.user.findFirst({
        where: {email : "Hamza@hotmail.com"}
    });

    const data2 = await prisma.Profile.findFirst({
        where: {userId : data.id}
    });

    const role = await prisma.role.findFirst({
        where: {userId : data.id}
    })

    const rp = await prisma.rolesPermission.findFirst({
        where: {roleId : role.id}
    })

    const permission = await prisma.permission.findFirst({
        where: {id : rp.permissionId}
    })


    const reservations = await prisma.reservation.findMany({
        where: {clientId : data.id}
    })






    return NextResponse.json({ user: data, name: data2.name, permissionName: permission.permissionName, reservations: reservations }, { status: 200 });
    
  }