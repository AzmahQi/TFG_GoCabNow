export default function StepA({ formData, handleChangeInput, handleNextStep }) {
  return (
    <div>
      <h1 className="mt-2 txt-xl font-bold">Step A: Costumer Identity Info</h1>
      <div className="my-2">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="my-2">
        <label>Last Name</label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
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
      </div>

      <div className="my-2 flex justify-end items-center">
        <button className="bg-green-400 px-4 py-2 rounded-x1"
        onClick={handleNextStep}>
          Next</button>
      </div>

    </div>
  );
}
