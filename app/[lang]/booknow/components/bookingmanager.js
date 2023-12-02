


'use client'
// This component will control the steps by steps

import { useEffect, useState } from "react";
import StepA from "./StepA";
import StepB from "./StepB";
import StepC from "./StepC";

import StepFinal from "./StepFinal";



// Step 1: Recollecting client info
// Step 2: Recollecting reservation info
// Step 3: Review the info
// Step 4: Confirmation of sending the info to show reservation id


const initialFormData = {

    firstName: '',
    surname: '',
    contactNumber: '',

    from: '',
    to: '',
    dateTime: '',
    numPassenger: 1,
    luggage: 0
};

const stepsArray = ['A','B','C'];


export default function BookingManager({ showSteps }) {
    //Setting states for Step and also Data
    const [step, setStep] = useState('A');
    const [formData, setFormData] = useState(initialFormData);

    // Method to handle to go to the next step
    const handleNextStep = () => {
      console.log("in: "+step)
        if (step === 'A'){
          setStep('B');
        }
        else if (step === 'B'){
          setStep('C');
        }

    };

    // Method to handle to go to the prev step
    const handlePrevStep = () => {
      console.log("prev: "+step)
        if (step === 'C') setStep('B');
        else if (step == 'B') setStep('A');
    };
    
    // Method to update our formData, also to manipulate it
    const handleChangeInput = (event) => {
        const fieldName = event.target.name;
        let fieldValue;

        fieldValue = event.target.value;

        // Here is where im actually updating the data
        setFormData({...formData,
          [fieldName]: fieldValue});
    };

    // Method to do the final operation

    const handleSubmitFormData = () => {
        //Do the validations needed here...

        if (!formData.contactNumber){
          alert('Error! Contact number not added');
        }else {
          setStep('Final');
        }

        
    };

    // To see the actual changes irl
    useEffect(() =>{
        console.log(formData);
    },[formData]);


    //Method to render the Steps bar
    const renderTopStepNumbers = () => {
        if (!showSteps || step === 'Final'){
            return null;
        }
        return (
            <section className="mt-2 mb-4 flex justify-between">
                {stepsArray.map((item) => (
                    <div key={item}
                    className={`${item === step ? 'bg-purple-500':'bg-green-500'}
                    w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer`}
                    onClick={() => setStep(item)}
                    >
                        {item}
                    </div>
                ))}
            </section>
        )


    }



    return (
      <>
        <div>Booking Manager</div>
        <div className="bg-blue-400 w-[600px] max-w-full px-6 py-1 mx-auto rounded-lg border-2 border-dotted border-sky-300 ">
          {renderTopStepNumbers()}

          {/* //Steps */}
          {step === 'A' ? (
            <StepA
              formData={formData}
              handleChangeInput={handleChangeInput}
              handleNextStep={handleNextStep}
            />
          ) : null}
          {step === 'B' ? (
            <StepB
            formData={formData}
              handleChangeInput={handleChangeInput}
              handlePrevStep={handlePrevStep}
              handleNextStep={handleNextStep}
            />
          ) : null}
          {step === 'C' ? (
            <StepC
            formData={formData}
              handleChangeInput={handleChangeInput}
              handlePrevStep={handlePrevStep}
              handleSubmitFormData={handleSubmitFormData}
            />
          ) : null}
          
          {step === "Final" ? <StepFinal /> : null}
        </div>
      </>
    );
}