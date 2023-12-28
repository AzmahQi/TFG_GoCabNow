import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Retrieve information by email
export async function GET(req) {
    const { body, query } = req;
  
    console.log("Request Body:", body);
    console.log("Query Parameters:", query);
  
    return NextResponse.json({ body, query }, { status: 200 });
  }