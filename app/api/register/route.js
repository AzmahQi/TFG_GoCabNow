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

    try {
      // Check if the user table exists, create it if not
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          mobile VARCHAR(255),
          email VARCHAR(255),
          password VARCHAR(255)
        )
      `);

      // Insert user data into the users table
      const result = await pool.query(
        'INSERT INTO users (username, contact_number, email, password) VALUES (?, ?, ?, ?)',
        [name, mobile, email, password]
      );
        
      NextResponse.json.status(200).json({ message: 'Registration successful', result });
    } catch (error) {
      console.error('Error during registration:', error);
      NextResponse.json.status(500).json({ error: 'Internal Server Error' });
    }
  
}
