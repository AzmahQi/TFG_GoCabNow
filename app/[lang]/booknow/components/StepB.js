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
      formData.from.trim() !== '' &&
      formData.to.trim() !== '' &&
      formData.dateTime.trim() !== ''
    );
  };

    // Function to handle date-time input change
  const handleDateTimeChange = (e) => {
    setFormattedDateTime(e.target.value);
    handleChangeInput({
      target: { name: "dateTime", value: e.target.value },
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
          min={new Date().toISOString().slice(0, 16)} // Set the min attribute dynamically
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        {!formattedDateTime && (
          <p className="text-red-500">Date Time is required</p>
        )}
      </div>
      <div className="my-2">
        <label>Number of Passengers</label>
        <input
          type="text"
          name="numPassenger"
          value={formData.numPassenger}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="my-2">
        <label>Luggage</label>
        <input
          type="number"
          name="luggage"
          value={formData.luggage}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />

      </div>
      <div className="my-2 flex justify-between items-center">
        <button
          className={`bg-yellow-400 px-4 py-2 rounded-x1`}
          onClick={handlePrevStep}
        >
          Prev
        </button>

        <button
          className={`bg-green-400 px-4 py-2 rounded-x1 ${!isFormDataValid() && 'opacity-50 cursor-not-allowed'}`}
          onClick={handleNextStep}
          disabled={!isFormDataValid()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
