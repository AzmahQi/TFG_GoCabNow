'use client'
import { updateUserProfile } from '@/lib/db';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const ProfileCard = ({ content, initialData }) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [name, setName] = useState(initialData.name || '');
  const [contactNumber, setContactNumber] = useState(initialData.contactNumber.replace(/^\+34/, '') || '');
  const [gender, setGender] = useState(initialData.gender || 'Male');

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isContactNumberEditing, setIsContactNumberEditing] = useState(false);
  const [isGenderEditing, setIsGenderEditing] = useState(false);

  useEffect(() => {
    setName(initialData.name || '');
    setContactNumber(initialData.contactNumber.replace(/^\+34/, '') || '');
    setGender(initialData.gender || 'Male');
  }, [initialData]);

  useEffect(() => {
    // Check if the status changes to "authenticated"
    if (status === "authenticated") {
      // Refresh the page
      router.refresh();
    }
  }, [status, router]);

  // Validation for Contact Number
  const validateContactNumber = () => {
    if (!/^\d{9}$/.test(contactNumber)) {
      alert('Error! Contact number should have exactly 9 digits.');
      return false;
    }
    return true;
  };

  // Handle Submit
  const handleSubmit = async () => {
    // Validate contactNumber
    if (!validateContactNumber()) {
      return;
    }

    // Add +34 to the contactNumber before updating profile
    const updatedContactNumber = `+34${contactNumber}`;

    // Create a data object with the updated values
    const updatedData = {
      name: name,
      contactNumber: updatedContactNumber,
      gender: gender
    };

    // Update database
    const response = await updateUserProfile(initialData.userId, updatedData);

    if (response.id == 1) {
      // Update session data
      session.user.name = updatedData.name;
      session.user.contactNumber = updatedData.contactNumber;
      session.user.profile.name = updatedData.name;
      session.user.profile.gender = updatedData.gender;

      // Update the session
      update(session);
    } else {
      alert(response.message);
    }
  };

  return (
    <SessionProvider session={session}>
      <div className="bg-white shadow-md rounded-md p-6 max-w-sm mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">
            {isNameEditing ? (
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <>
                {name}{' '}
                <span onClick={() => setIsNameEditing(!isNameEditing)} className="cursor-pointer">
                  📝
                </span>
              </>
            )}
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <strong>{content.email}:</strong> {initialData.email}
          </div>
          <div>
            <strong>{content.birthDate}:</strong> {initialData.birthDate}
          </div>
          <div>
            <strong>{content.contactNumber}:</strong>{' '}
            {isContactNumberEditing ? (
              <input
                type="text"
                value={contactNumber}
                onChange={(event) => setContactNumber(event.target.value)}
                className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <>
                {contactNumber}{' '}
                <span onClick={() => setIsContactNumberEditing(!isContactNumberEditing)} className="cursor-pointer">
                  📝
                </span>
              </>
            )}
          </div>
          <div>
            <strong>{content.gender}:</strong>{' '}
            {isGenderEditing ? (
              <select
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              >
                <option value="Male">{content.gMale}</option>
                <option value="Female">{content.gFemale}</option>
                <option value="Other">{content.gOther}</option>
              </select>
            ) : (
              <>
                {gender}{' '}
                <span onClick={() => setIsGenderEditing(!isGenderEditing)} className="cursor-pointer">
                  📝
                </span>
              </>
            )}
          </div>
          <div className="text-center">
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              {status === "authenticated" ? "Submit" : "Loading"}
            </button>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default ProfileCard;
