// pages/api/register.js
import { NextResponse, NextRequest } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM users");
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req, res) {

    // Handle registration logic here
    const { name, mobile, email, password } = await req.json();
    let result = null;
    let val = null;
    try {
      // Check if the user table exists, create it if not
      await pool.query(`
        CREATE TABLE IF NOT EXISTS User (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          mobile VARCHAR(255),
          email VARCHAR(255),
          password VARCHAR(255)
        )
      `);

      
      /*
      Do the registration validation
      1. Validate if we already have the user in our system with same email or number.
        1.1 If we have the same number but no email, we update the user and add the email and password
        1.2 If we have the email, we give an error message.
      2. If the validations are not triggered insert the new user.
      */
     //Retreive any row with similar data.
      val = await pool.query("SELECT * FROM User WHERE mobile = ? OR email = ?", [params.mobile,params.email]);
      console.log(NextResponse.json.status(200).json({ message: 'Registration successful', val }))
     
    } catch (error) {
      console.error('Error during registration:', error);
      NextResponse.json.status(500).json({ error: 'Internal Server Error' });
    }
  
}
