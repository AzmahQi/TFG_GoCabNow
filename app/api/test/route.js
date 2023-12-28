import { NextResponse } from "next/server";

// To retreive all the information
export async function GET() {
  try {
    return NextResponse.json("hola");
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
    console.log(result);

    //returning the data we inserted
    return NextResponse.json({des, id: result.insertId,});

  } catch (error) {
    console.log(error);
    return NextResponse.json ({message: error.message,},{status: 500,});

  }
}
