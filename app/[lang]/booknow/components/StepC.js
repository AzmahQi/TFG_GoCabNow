export default function StepC  ({formData, handleChangeInput, handlePrevStep,handleSubmitFormData})  {
    return (
      <div>
        <h1 className="mt-2 txt-xl font-bold">Step C: Confirm Form data</h1>
        <DataConfirmRow label='Name' value={formData.name}/>
        <DataConfirmRow label='Contact Number' value={formData.contactNumber}/>
        <DataConfirmRow label='From' value={formData.from}/>
        <DataConfirmRow label='To' value={formData.to}/>
        <DataConfirmRow label='Date Time' value={formData.dateTime}/>
        <DataConfirmRow label='Number of Passengers' value={formData.numPassenger}/>
        <DataConfirmRow label='luggage' value={formData.luggage}/>

        <div className="my-2 flex justify-between items-center">
        <button className="bg-red-500 hover:bg-red-400 focus:border-gray-300 font-extrabold text-xl px-3 py-1 rounded-2xl"
        onClick={handlePrevStep}>
          Prev</button>

          <button className="tertiary hover:bg-yellow-500 focus:border-gray-300 font-extrabold text-xl px-3 py-1 rounded-2xl"
        onClick={handleSubmitFormData}>
          Submit</button>
      </div>
      </div>
    )
  }

  // To show data
  const DataConfirmRow = ({label, value}) => {
    return (
      <div className="my-3 border border-dashed border-gray-200 p-1 rounded-lg">
        <span className="mr-4 text-slate-500">{label}</span>
        <span className="mr-4 text-slate-100">{value}</span>

      </div>
    );
  }