export default function StepC  ({content, formData, handlePrevStep,handleSubmitFormData})  {
    return (
      <div>
        <h1 className="mt-2 txt-xl font-bold">{content.stepC.title}</h1>
        <DataConfirmRow label={content.stepA.name} value={formData.name}/>
        <DataConfirmRow label={content.stepA.contactNumber} value={formData.contactNumber}/>
        <DataConfirmRow label={content.stepB.from} value={formData.from}/>
        <DataConfirmRow label={content.stepB.to} value={formData.to}/>
        <DataConfirmRow label={content.stepB.dateTime} value={formData.dateTime}/>
        <DataConfirmRow label={content.stepB.passengers} value={formData.numPassenger}/>
        <DataConfirmRow label={content.stepB.luggage} value={formData.luggage}/>

        <div className="my-2 flex justify-between items-center">
        <button className="bg-red-500 hover:bg-red-400 focus:border-gray-300 font-extrabold text-xl px-3 py-1 rounded-2xl"
        onClick={handlePrevStep}>
          {content.stepB.buttonPrevText}</button>

          <button className="tertiary hover:bg-yellow-500 focus:border-gray-300 font-extrabold text-xl px-3 py-1 rounded-2xl"
        onClick={handleSubmitFormData}>
          {content.stepC.buttonSubmitText}</button>
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