
export default function StepA({ content, formData, handleChangeInput, handleNextStep, session }) {
  const isFormDataValid = () => {
    return formData.name?.trim() !== '' &&
           formData.contactNumber?.trim() !== '';
  };

  return (
    <div>
      <h1 className="mt-2 txt-xl font-bold">{content.title}</h1>
      <div className="my-2">
        <label>{content.name}</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleChangeInput(e)}
          className={`w-full outline-none border border-gray-900 px-2 py-1 rounded-lg focus:border-blue-600 ${session ? 'disabled' : ''}`}
          disabled={session}
        />
        {!formData.name && <p className="text-red-500">{content.nameRequired}</p>}
      </div>

      <div className="my-2">
        <label>{content.contactNumber}</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={(e) => handleChangeInput(e)}
          className={`w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600 ${session ? 'disabled' : ''}`}
          disabled={session}
        />
        {!formData.contactNumber && <p className="text-red-500">{content.cnRequired}</p>}
      </div>

      <div className="my-2 flex justify-end items-center">
        <button
          className={`tertiary text-white hover:bg-yellow-500 focus:border-gray-300 font-extrabold text-xl px-3 py-1 rounded-2xl ${!isFormDataValid() && 'opacity-50 cursor-not-allowed'}`}
          onClick={handleNextStep}
          disabled={!isFormDataValid()}

        >
          {content.buttonNextText}
        </button>
      </div>
    </div>
  );
}
