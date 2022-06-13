import React, { Component } from 'react'


const Mpesabutton = ({ activatePayment }) => {

    return (
        <button
            onClick={activatePayment}
            className="block text-sm md:text-base w-full bg-green-500 my-2 py-3 text-gray-800 rounded font-semibold"
        >
            Pay with Mpesa
        </button>
    )
}

export default Mpesabutton
