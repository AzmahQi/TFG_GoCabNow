export default function StepB  ({formData, handleChangeInput, handlePrevStep,handleNextStep })  {
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
      </div>
      <div className="my-2">
        <label>Date time</label>
        <input
          type="text"
          name="dateTime"
          value={formData.dateTime}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
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
        <button className="bg-yellow-400 px-4 py-2 rounded-x1"
        onClick={handlePrevStep}>
          Prev</button>
          
          <button className="bg-green-400 px-4 py-2 rounded-x1"
        onClick={handleNextStep}>
          Next</button>
      </div>

    </div>
    )
  }
  