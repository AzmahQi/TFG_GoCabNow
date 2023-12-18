import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

//retreive information by id
export async function GET(request, {params}) {
  try {
    const result = await pool.query("SELECT * FROM test WHERE id = ?", [params.id]);

    if (result.length ===0){
        return NextResponse.json({ message: "Test Id not found" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// delete by id
export async function DELETE(request, {params}) {
  try {
    
    const { des } = await request.json();

    const result = await pool.query("DELETE FROM test WHERE id = ?",  [params.id]);
    console.log(result);

    if (result.affectedRows ===0){
        return NextResponse.json({ message: "Test Id not found" }, { status: 404 });
    }

    //returning status 204 basically means deleted successfully
    return new Response (null,{status:204,});

  } catch (error) {
    console.log(error);
    return NextResponse.json ({message: error.message,},{status: 500,});

  }
}

// update by id
export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    const result = await pool.query("UPDATE test SET ? WHERE id = ?", [data,
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Test Id not found" },
        { status: 404 }
      );
    }

    const updatedResult = await pool.query("SELECT * FROM test WHERE id = ?", [params.id]);
    return NextResponse.json(updatedResult[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}