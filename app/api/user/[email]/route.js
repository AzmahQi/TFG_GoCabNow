import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

// Retrieve information by email
export async function GET(request, { params }) {
    try {
      const result = await pool.query(
        "SELECT u.id, u.email, u.contactNumber, p.name, p.birthDate, p.gender FROM User u JOIN Profile p ON (u.id=p.userId) WHERE email = ?",
        "hamza@hotmail.com"
      );
  
      if (result.length === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      const role = await pool.query(
        "SELECT p.permissionName from Permission p JOIN RolesPermission rp ON (p.id=rp.permissionId) JOIN Role r ON (rp.roleId=r.id) WHERE r.userId = ?",
        [result[0].id]
      );
  
      if (role.length === 0) {
        return NextResponse.json({ message: "No role found" }, { status: 404 });
      }
  
      let reservations = null;
      if (role[0].permissionName === "Standard") {
        // Retrieve all reservations for a standard user
        reservations = await pool.query(
          "SELECT * FROM Reservation WHERE clientId = ?",
          [result[0].id]
        );
      } else if (role[0].permissionName === "Driver") {
        // Retrieve all reservations for a driver
        reservations = await pool.query(
          "SELECT * FROM Reservation WHERE driverId = ?",
          [result[0].id]
        );
      }
  
      if (reservations.length === 0) {
        return NextResponse.json(
          { message: "No reservations found" },
          { status: 404 }
        );
      }
  
      // Return user information, role, and reservations
      return NextResponse.json({ user: result[0], role: role[0], reservations });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  