import React, { Component, useState } from 'react'
import { toast } from 'react-toastify'
import { BACKEND_URI } from '../../config/app'
import Mpesabutton from './Mpesabutton'
import MpesaInput from './MpesaInputs'

const Mpesa = () =>{
    //Iniaialize the local state
    const [isChecked, setIsChecked] = useState()
    //Activate the payament:collect the number to make payment request to
    const activatePayment = () => {
        //Acrtiavte the state to accure user phone number
        setIsChecked(true)
    }
    const initiatePayment = async(phoneNumber) => {
        //Make request to the server to inistiate sdk push for payamnet verification.
        const sdkPush = await fetch(`${BACKEND_URI}/payments/online/lipa/`, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({phoneNumber})
        })

        //Check if sdk push was ok.
        if(sdkPush.ok){
            //TODO: Research on on mpesa call backs
            const msg = await sdkPush.json()
            //set the msg for user responce.
            toast.success(msg.CustomerMessage)
        }else{
            console.log(sdkPush.json())
        }

    }
    return (
        <div>
            <Mpesabutton activatePayment={activatePayment} />
            { isChecked ? <MpesaInput initiatePaymanet={initiatePayment}/> : <span></span> }
        </div>

    )
}

export default Mpesa