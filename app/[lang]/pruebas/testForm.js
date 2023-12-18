'use client';


const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("asas")

}
export default function SecondaryPage (){



    return (

        <form onSubmit={handleSubmit}>
            <label>test: </label>
            <input type="text"></input>

            <button >submission</button>

        </form>
    )
}