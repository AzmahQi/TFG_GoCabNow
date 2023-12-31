import { useEffect } from "react";

export default function StepB({
  content,
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
}) {
  useEffect(() => {
    // Set the minimum date and time to today + 2 hours
    const minDate = new Date();
    minDate.setHours(minDate.getHours() + 2);

    // Format the minimum date as a string suitable for datetime-local input
    const minDateString = minDate.toISOString().slice(0, 16);

    // Set formData.dateTime to the minimum date if it's earlier than the minimum date
    if (!formData.dateTime || formData.dateTime < minDateString) {
      handleChangeInput({
        target: { name: "dateTime", value: minDateString },
      });
    }
  }, [formData.dateTime, handleChangeInput]);

  const isFormDataValid = () => {
    return (
      formData.from.trim() !== "" &&
      formData.to.trim() !== "" &&
      formData.numPassenger >= 1 &&
      formData.numPassenger <= 5 &&
      formData.luggage >= 0 &&
      formData.luggage <= 5
    );
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
      <h1 className="mt-2 txt-xl font-bold">{content.title}</h1>
      <div className="my-2">
        <label>{content.from}</label>
        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        {!formData.from && <p className="text-red-500">{content.fromRequired}</p>}
      </div>
      <div className="my-2">
        <label>{content.to}</label>
        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        {!formData.to && <p className="text-red-500">{content.toRequired}</p>}
      </div>
      <div className="my-2">
        <label>{content.dateTime}</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime || ""}
          onChange={(e) => handleChangeInput(e)}
          min={new Date().toISOString().slice(0, 16)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        {!formData.dateTime && (
          <p className="text-red-500">{content.dtRequired}</p>
        )}
      </div>
      <div className="my-2">
        <label>{content.passengers}</label>
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
        <label>{content.luggage}</label>
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
          {content.buttonPrevText}
        </button>

        <button
          className={`tertiary text-white hover:bg-yellow-500 focus:border-gray-300 font-extrabold text-xl px-3 py-1 rounded-2xl ${
            !isFormDataValid() && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleNextStep}
          disabled={!isFormDataValid()}
        >
          {content.buttonNextText}
        </button>
      </div>
    </div>
  );
}
