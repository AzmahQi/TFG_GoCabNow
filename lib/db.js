"use server";

import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

/*
########
GET
########
*/

/**
 * Retrieve user data by email.
 * @param {string} email - The email address of the user.
 * @returns {Promise<Object>} - The user data.
 */
export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}

/**
 * Retrieve user data by contact number.
 * @param {string} number - The contact number of the user.
 * @returns {Promise<Object>} - The user data.
 */
export async function getUserByNumber(number) {
  return await prisma.user.findFirst({
    where: { contactNumber: number },
  });
}

/**
 * Retrieve user profile by user ID.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object>} - The user profile.
 */
export async function getProfileByUserId(userId) {
  return await prisma.profile.findFirst({
    where: { userId: userId },
  });
}

/**
 * Retrieve user role by user ID.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<string>} - The user role.
 */
export async function getRoleByUserId(userId) {
  const roleData = await prisma.role.findFirst({
    where: { userId: userId },
    include: {
      RolesPermission: {
        select: {
          Permission: {
            select: {
              permissionName: true,
            },
          },
        },
      },
    },
  });

  return roleData.RolesPermission[0].Permission;
}

/**
 * Get the count of clients and drivers in the system.
 *
 * @returns {Promise<{ clients: number, drivers: number }>} - The count of clients and drivers.
 */
export async function getClientsAndDriversCount() {
  try {
    const clientsCount = await prisma.rolesPermission.count({
      where: { permissionId: 2 }, // PermissionId for clients
    });

    const driversCount = await prisma.rolesPermission.count({
      where: { permissionId: 3 }, // PermissionId for drivers
    });

    return { clients: clientsCount, drivers: driversCount };
  } catch (error) {
    console.error("Error getting clients and drivers count:", error);
    throw error;
  }
}

/**
 * Get the total number of reservations in the system.
 * @returns {Promise<number>} - The total number of reservations.
 */
export async function getReservationCount() {
  try {
    const count = await prisma.reservation.count();
    return count;
  } catch (error) {
    console.error("Error getting reservation count:", error);
    throw error;
  }
}

/**
 * Retrieve reservation data by reservation ID.
 * @param {number} id - The ID of the reservation.
 * @returns {Promise<Object>} - The reservation data.
 */
export async function getReservationsById(id) {
  return await prisma.reservation.findUnique({
    where: { id: id },
  });
}

/**
 * Retrieve reservations based on user ID and role.
 * @param {number} userId - The ID of the user.
 * @param {string} role - The role of the user.
 * @returns {Promise<Array>} - An array of reservations with additional user information.
 */
export async function getReservationsByUserId(userId, role) {
  let reservations = null;

  if (role === "Standard") {
    reservations = await prisma.reservation.findMany({
      where: { clientId: userId },
      include: {
        User_Reservation_driverIdToUser: {
          select: {
            contactNumber: true,
            Profile: { select: { name: true } },
          },
        },
      },
    });
  } else if (role === "Driver") {
    reservations = await prisma.reservation.findMany({
      where: { driverId: userId },
      include: {
        User_Reservation_clientIdToUser: {
          select: {
            contactNumber: true,
            Profile: { select: { name: true } },
          },
        },
      },
    });
  }

  // Update each reservation to include contactNumber and Profile name
  reservations = reservations.map((reservation) => {
    const userField =
      role === "Standard"
        ? reservation.User_Reservation_driverIdToUser
        : reservation.User_Reservation_clientIdToUser;

    if (userField) {
      const { contactNumber, Profile } = userField;
      reservation.contactNumber = contactNumber.replace(/\+/g, "");
      reservation.profileName = Profile.map((profile) => profile.name);
    }

    return reservation;
  });

  return reservations;
}

/**
 * Retrieve pending reservations.
 * @returns {Promise<Array>} - An array of pending reservations.
 */
export async function getPendingReservations() {
  // !IMPORTANT: Updating the status to CLOSED to reservations with logic.
  const procedure =
    await prisma.$queryRaw`Call updateReservationStatus()`;

  return await prisma.reservation.findMany({
    where: { driverId: null, reservationStatus: "PENDING" },
  });
}

/*
########
UPDATE Remember to update de session information. if you modify Profile.
########
*/

/**
 * Update contactNumber for a user by userId with validations.
 *
 * @param {number} userId - The ID of the user to update.
 * @param {string} newContactNumber - The new contact number to set.
 * @returns {Promise<{ id: number, message: string } | Object>} - The updated user profile or an error object.
 */
export async function updateContactNumber(userId, newContactNumber) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("User not found for the specified user ID");
    }

    const regex = /^\+34\d{9}$/;

    // Validate the new contact number
    if (
      newContactNumber !== undefined &&
      newContactNumber !== existingUser.contactNumber 
    ) {
      const userWithNewContactNumber = await prisma.user.findUnique({
        where: { contactNumber: newContactNumber },
      });

      if (userWithNewContactNumber) {
        throw new Error("Contact number already exists in the system");
      }
    }

    if(!regex.test(newContactNumber)) {
      throw new Error("Contact number doesn't have the correct format +34 plus 9 numbers");
    }

    // Update the contact number
    const updatedUserData = await prisma.user.update({
      where: { id: userId },
      data: { contactNumber: newContactNumber },
    });

    // Return the updated user data
    return updatedUserData;
  } catch (error) {
    console.error("Error updating contact number:", error);
    return {
      id: userId,
      message: error.message || "Error updating contact number",
    };
  }
}

/**
 * Update profile information for a user by userId with validations.
 *
 * @param {number} userId - The ID of the user to update.
 * @param {Object} updatedProfile - The updated profile information (name, gender).
 * @returns {Promise<{ id: number, message: string } | Object>} - The updated user profile or an error object.
 */
export async function updateProfile(userId, updatedProfile) {
  try {
    const existingProfile = await getProfileByUserId(userId);

    if (!existingProfile) {
      throw new Error("User not found for the specified user ID");
    }

    // Validate and update profile information
    const updatedProfileData = await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        name:
          updatedProfile.name !== undefined
            ? updatedProfile.name
            : existingProfile?.name,
        gender:
          updatedProfile.gender !== undefined
            ? updatedProfile.gender
            : existingProfile?.gender,
      },
    });

    // Return the updated profile data
    return updatedProfileData;
  } catch (error) {
    console.error("Error updating profile:", error);
    return { id: userId, message: error.message || "Error updating profile" };
  }
}

/**
 * Update user profile information, including contact number validation.
 *
 * @param {Object} userId - The user id.
 * @param {Object} updatedProfile - The updated profile information.
 * @returns {Promise<{ id: number, message: string } | Object>} - The updated user profile or an error object.
 */
export async function updateUserProfile(userId, updatedProfile) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { Profile: true },
    });

    if (!existingUser) {
      throw new Error("User not found for the specified user ID");
    }

    // Update the new contact number
    const updateNumber = await updateContactNumber(
      userId,
      updatedProfile.contactNumber
    );
    const updatedProfileData = await updateProfile(userId, updatedProfile);

    if (updateNumber || updatedProfileData) {
      return {
        id: 1,
        message: "Updated successfully!",
      };
    } else {
      return { id:2, message: "Couldn't update it" };
    }

    return updatedProfileData;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      id: 1,
      userId: userId,
      message: error.message || "Error updating user profile",
    };
  }
}

/**
 * Update reservation status and associated driver ID.
 * @param {number} id - The ID of the reservation.
 * @param {string} status - The new status of the reservation.
 * @param {number} driverId - The ID of the driver associated with the reservation.
 * @returns {Promise<Object>} - The updated reservation data.
 */
export async function updateReservationStatus(id, status, driverId) {
  try {
    const updatedReservation = await prisma.reservation.update({
      where: { id: id },
      data: {
        reservationStatus: status,
        driverId:
          status !== "CONFIRMED" && status !== "CANCELLED" ? null : driverId,
      },
    });

    // !IMPORTANT: Updating the status to CLOSED to reservations with logic.
    const procedure =
      await prisma.$queryRaw`Call updateReservationStatus()`;


    return updatedReservation;
  } catch (error) {
    console.error("Error updating reservation status:", error);
    throw error;
  }
}

/*
########
POST
########
*/

/**
 * Create a new user or update existing user information.
 * @param {Object} userData - The user data.
 * @returns {Promise<Object>} - The created or updated user data.
 */
export async function createUser(userData) {
  const { email, password, contactNumber, name, gender, birthDate } = userData;
  const hashedPassword = await hash(password, 12);
  const formattedBirthDate = new Date(birthDate).toISOString();

  const existingUserByEmail = await getUserByEmail(email);
  const existingUserByNumber = await getUserByNumber(contactNumber);

  if (existingUserByEmail) {
    return {
      id: 1,
      user: null,
      message: "User with this email already exists",
    };
  }

  if (existingUserByNumber) {
    // Existing number
    if (existingUserByNumber.email !== null) {
      // Already has an account with the related number
      return {
        id: 2,
        user: null,
        message:
          "We already have an account with the number you introduced. Please try another number",
      };
    } else {
      // Update the existing user information
      const result = await prisma.user.update({
        where: { contactNumber: existingUserByNumber.contactNumber },
        data: {
          email,
          password: hashedPassword,
        },
      });

      await prisma.profile.update({
        where: { userId: existingUserByNumber.id },
        data: {
          name,
          gender,
          birthDate: formattedBirthDate,
        },
      });

      const { password: newPassword, ...rest } = result;
      return {
        id: 3,
        user: rest,
        message: "User information updated successfully",
      };
    }
  } else {
    // Create NEW USER
    const result = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        contactNumber,
      },
    });

    await prisma.profile.create({
      data: {
        userId: result.id,
        name,
        gender,
        birthDate: formattedBirthDate,
      },
    });

    const roleRes = await prisma.role.create({
      data: {
        userId: result.id,
        roleName: "Default",
        description: "Autogenerated by registration",
      },
    });

    await prisma.rolesPermission.create({
      data: {
        roleId: roleRes.id,
        permissionId: 2,
      },
    });

    const { password: newPassword, ...rest } = result;
    return { user: rest, message: "User created successfully" };
  }
}

/**
 * Create a new reservation, verifying if the contactNumber exists in our system as a client.
 * If it doesn't exist it creates it without an account.
 * A driver can't create a reservation with his contactNumber.
 *
 * @param {Object} formData - The reservation data.
 * @returns {Promise<Object>} - The created reservation data.
 */
export async function createReservation(formData) {
  try {
    //Verify if we have the contactNumber on our system
    let isUser = await getUserByNumber(formData.contactNumber);

    if (!isUser) {
      //Creating user without authentication.
      isUser = await prisma.user.create({
        data: {
          contactNumber: formData.contactNumber,
        },
      });

      await prisma.profile.create({
        data: {
          userId: isUser.id,
          name: formData.name,
        },
      });

      const roleRes = await prisma.role.create({
        data: {
          userId: isUser.id,
          roleName: "Default",
          description: "Autogenerated by registration",
        },
      });
      await prisma.rolesPermission.create({
        data: {
          roleId: roleRes.id,
          permissionId: 2,
        },
      });
    }

    // verify the Existing user role
    let permission = await getRoleByUserId(isUser.id);
    if (permission.permissionName === "Standard") {
      const reservationDate = new Date(formData.dateTime).toISOString();
      const numPassenger = parseInt(formData.numPassenger, 10);
      const numLuggage = parseInt(formData.luggage, 10);
      const newReservation = await prisma.reservation.create({
        data: {
          pickupLocation: formData.from,
          destination: formData.to,
          reservationDate,
          passengers: numPassenger,
          luggage: numLuggage,
          clientId: isUser.id,
          updatedAt: new Date(),
        },
      });

      return await getReservationsById(newReservation.id);
    } else {
      // User is not a Standard user, cannot create a reservation
      return null;
    }
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
}
