"use client";
// This component will control the steps by steps

import StepA from "./StepA";
import StepB from "./StepB";
import StepC from "./StepC";

import StepFinal from "./StepFinal";
import { useState, useEffect } from "react";
import { createReservation } from "@/lib/db";

// Step 1: Recollecting client info
// Step 2: Recollecting reservation info
// Step 3: Review the info
// Step 4: Confirmation of sending the info to show reservation id

const initialFormData = {
  name: "",
  contactNumber: "",

  from: "",
  to: "",
  dateTime: "",
  numPassenger: 1,
  luggage: 0,
};

const stepsArray = ["A", "B", "C"];

export default function BookingManager({ content, showSteps, session }) {
  //Setting states for Step and also Data

  const [step, setStep] = useState("A");
  const [reservationRef, setReservationRef] = useState(null);
  const [formData, setFormData] = useState(initialFormData);


  useEffect(() => {
    if (session && session.user.role === 'Standard') {
      setStep("B");
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: session.user.profile.name,
        contactNumber: session.user.contactNumber,
      }));
    }
  }, [session]);

  // Method to handle to go to the next step
  const handleNextStep = () => {
    if (step === "A") {
      setStep("B");
    } else if (step === "B") {
      setStep("C");
    }
  };

  // Method to handle to go to the prev step
  const handlePrevStep = () => {
    if (step === "C") setStep("B");
    else if (step == "B") setStep("A");
  };

  // Method to update our formData, also to manipulate it
  const handleChangeInput = (event) => {
    const fieldName = event.target.name;
    let fieldValue;
    fieldValue = event.target.value;
    // Here is where im actually updating the data
   setFormData({ ...formData, [fieldName]: fieldValue });
  };

  // Method to do the final operation

// Method to do the final operation
const handleSubmitFormData = async (e) => {
  const regex = '/^\d{9}$/';
  if (!regex.test(formData.contactNumber)) {
    alert("Contact number must be 9 digits");
  } else {
    const reservation = await createReservation(formData);
    if (reservation) {
      setReservationRef(reservation.reservationRef);
      setStep("Final");
    } else {
      alert("Error! We couldn't create the reservation correctly!");
    }
  }
};


  //Method to render the Steps bar
  const renderTopStepNumbers = () => {
    if (!showSteps || step === "Final") {
      return null;
    }
    return (
      <section className="mt-2 mb-4 flex justify-between">
        {stepsArray.map((item) => (
          <div
            key={item}
            className={`${item === step ? "bg-purple-500" : "bg-green-500"}
                    w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer`}
            onClick={() => setStep(item)}
          >
            {item}
          </div>
        ))}
      </section>
    );
  };

  return (
      <div className="text-white w-[600px] max-w-full px-6 py-1 mx-auto rounded-lg border-2 border-dotted border-sky-100 ">
        {renderTopStepNumbers()}

        {/* Steps */}
        {step === "A" ? (
          <StepA
            content={content.stepA}
            formData={formData}
            handleChangeInput={handleChangeInput}
            handleNextStep={handleNextStep}
            session={session}
          />
        ) : null}

        {step === "B" ? (
          <StepB
          content={content.stepB}
            formData={formData}
            handleChangeInput={handleChangeInput}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
        ) : null}

        {step === "C" ? (
          <StepC
          content={content}
            formData={formData}
            handlePrevStep={handlePrevStep}
            handleSubmitFormData={handleSubmitFormData}
          />
        ) : null}

        {step === "Final" ? (
          <StepFinal content={content.stepFinal} reservationRef={reservationRef} />
        ) : null}
      </div>
  )
}
