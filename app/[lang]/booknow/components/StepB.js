import { useState, useEffect } from "react";

export default function StepB({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
}) {
  const [formattedDateTime, setFormattedDateTime] = useState(
    formData.dateTime || ""
  );
  useEffect(() => {
    // Set the minimum date and time to today + 2 hours
    const minDate = new Date();
    minDate.setHours(minDate.getHours() + 2);

    // Format the minimum date as a string suitable for datetime-local input
    const minDateString = minDate.toISOString().slice(0, 16);

    // Set the formattedDateTime to the minimum date if it's earlier than the minimum date
    if (formattedDateTime < minDateString) {
      setFormattedDateTime(minDateString);
    }
  }, [formattedDateTime]);

  const isFormDataValid = () => {
    return (
      formData.from.trim() !== "" &&
      formData.to.trim() !== "" &&
      formData.dateTime.trim() !== "" &&
      formData.numPassenger >= 1 &&
      formData.numPassenger <= 5 &&
      formData.luggage >= 0 &&
      formData.luggage <= 5
    );
  };

  // Function to handle date-time input change
  const handleDateTimeChange = (e) => {
    setFormattedDateTime(e.target.value);
    handleChangeInput({
      target: { name: "dateTime", value: e.target.value },
    });
  };

  // Function to handle input change with validation
  const handleInputChangeWithValidation = (name, value) => {
    // Validate and limit values for numPassenger and luggage
    if (name === "numPassenger") {
      value = Math.max(1, Math.min(5, value)); // Ensure value is between 1 and 5
    } else if (name === "luggage") {
      value = Math.max(0, Math.min(5, value)); // Ensure value is between 0 and 5
    }

    handleChangeInput({
      target: { name, value },
    });
  };

  return (
    <div>
      <h1 className="mt-2 txt-xl font-bold">Step B: Destination Info</h1>
      <div className="my-2">
        <label>From</label>
        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        {!formData.from && <p className="text-red-500">From is required</p>}
      </div>
      <div className="my-2">
        <label>To</label>
        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        {!formData.to && <p className="text-red-500">To is required</p>}
      </div>
      <div className="my-2">
        <label>Date time</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={formattedDateTime}
          onChange={handleDateTimeChange}
          min={new Date().toISOString().slice(0, 16)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        {!formattedDateTime && (
          <p className="text-red-500">Date Time is required</p>
        )}
      </div>
      <div className="my-2">
        <label>Number of Passengers</label>
        <input
          type="number"
          name="numPassenger"
          value={formData.numPassenger}
          onChange={(e) =>
            handleInputChangeWithValidation("numPassenger", e.target.value)
          }
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
          min="1"
          max="5"
        />
      </div>
      <div className="my-2">
        <label>Luggage</label>
        <input
          type="number"
          name="luggage"
          value={formData.luggage}
          onChange={(e) =>
            handleInputChangeWithValidation("luggage", e.target.value)
          }
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
          min="0"
          max="5"
        />
      </div>
      <div className="my-2 flex justify-between items-center">
        <button
          className={`bg-red-500 hover:bg-red-400 focus:border-gray-300 font-extrabold text-xl px-3 py-1 rounded-2xl`}
          onClick={handlePrevStep}
        >
          Prev
        </button>

        <button
          className={`tertiary hover:bg-yellow-500 focus:border-gray-300 font-extrabold text-xl px-3 py-1 rounded-2xl ${
            !isFormDataValid() && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleNextStep}
          disabled={!isFormDataValid()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
