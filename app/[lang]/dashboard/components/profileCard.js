'use client'
import { updateUserProfile } from '@/lib/db';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';


import React, { useState, useEffect } from 'react';


const ProfileCard = ({content, initialData }) => {

  const router = useRouter();
  const {data: session,status, update} = useSession();

  const [name, setName] = useState(initialData.name || '');
  const [contactNumber, setContactNumber] = useState(initialData.contactNumber || '');
  const [gender, setGender] = useState(initialData.gender || 'Male');

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isContactNumberEditing, setIsContactNumberEditing] = useState(false);
  const [isGenderEditing, setIsGenderEditing] = useState(false);

  useEffect(() => {
    setName(initialData.name || '');
    setContactNumber(initialData.contactNumber || '');
    setGender(initialData.gender || 'Male');
  }, [initialData]);

  useEffect(() => {
    // Check if the status changes to "authenticated"
    if (status === "authenticated") {
      // Refresh the page
      router.refresh();
    }
  }, [status, router]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEditToggle = (field) => {
    switch (field) {
      case 'name':
        setIsNameEditing(!isNameEditing);
        break;
      case 'contactNumber':
        setIsContactNumberEditing(!isContactNumberEditing);
        break;
      case 'gender':
        setIsGenderEditing(!isGenderEditing);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {

    // Create a data object with the updated values
    const updatedData = {
      name: name,
      contactNumber: contactNumber,
      gender: gender
    };
      // update database
      const response = await updateUserProfile(initialData.userId, updatedData);
      if (response.id == 1) {
        session.user.name = updatedData.name;
        session.user.contactNumber = updatedData.contactNumber;
        session.user.profile.name =updatedData.name;
        session.user.profile.gender =updatedData.gender;
        update(session);
      }else {
        console.error(response.message)
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
              onChange={handleNameChange}
              className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <>
              {name}{' '}
              <span onClick={() => handleEditToggle('name')} className="cursor-pointer">
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
              onChange={handleContactNumberChange}
              className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <>
              {contactNumber}{' '}
              <span onClick={() => handleEditToggle('contactNumber')} className="cursor-pointer">
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
              onChange={handleGenderChange}
              className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
            >
              <option value="Male">{content.gMale}</option>
              <option value="Female">{content.gFemale}</option>
              <option value="Other">{content.gOther}</option>
            </select>
          ) : (
            <>
              {gender}{' '}
              <span onClick={() => handleEditToggle('gender')} className="cursor-pointer">
                📝
              </span>
            </>
          )}
        </div>
        <div className="text-center">
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {status === "authenticated" ? "Submit" : "Loading" }
          </button>
        </div>
      </div>
    </div>
    </SessionProvider>
  );
};

export default ProfileCard;