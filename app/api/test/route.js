import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// To retreive all the information
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM test");
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// To insert in database
export async function POST(request) {
  try {
    // The take the name-value of json needed
    const { des } = await request.json();
    //the actual insert
    const result = await pool.query("INSERT INTO test SET ?", { des });
    console.log(result);

    //returning the data we inserted
    return NextResponse.json({des, id: result.insertId,});

  } catch (error) {
    console.log(error);
    return NextResponse.json ({message: error.message,},{status: 500,});

  }
}
