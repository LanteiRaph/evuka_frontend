import React, { useState } from "react";


const MpesaInput = ({initiatePaymanet }) => {
    const [mpesaNumber, setMpesaNumber] = useState()
    const handleClick = (e) => {
        e.preventDefault()
        //Get the value from the user input=PhoneNo
        const value = e.target.value
        //Call the parent habdle to activate the payment process
        initiatePaymanet(value)
    }
    return (
        <div class="w-full max-w-xs" id=''>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Enter Phone number to pay
                    </label>
                    <input value={mpesaNumber} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Phone No." />
                </div>
                <button onClick={handleClick} class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Pay
                </button>
            </form>
        </div>
    )
}


export default MpesaInput