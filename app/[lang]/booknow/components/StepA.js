export default function StepA({ formData, handleChangeInput, handleNextStep }) {
  const isFormDataValid = () => {
    return formData.name.trim() !== '' &&
           formData.contactNumber.trim() !== '';
  };

  return (
    <div>
      <h1 className="mt-2 txt-xl font-bold">Step A: Customer Identity Info</h1>
      <div className="my-2">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        {!formData.name && <p className="text-red-500">Name is required</p>}
      </div>

      <div className="my-2">
        <label>Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        {!formData.contactNumber && <p className="text-red-500">Contact Number is required</p>}
      </div>

      <div className="my-2 flex justify-end items-center">
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
