import { BACKEND_URI } from "../../config/app";


export default async (req, res) => {
    //Request for payment to course
    const pay_course = await fetch(`${BACKEND_URI}/payments/paypal/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify()
    })

    //check the response from server
    if (!pay_course.ok) {
        //
        res.status(401).json({ "msg": "sorry" })
    }
    //
    //respond back to the user with a sucess.
    res.status(200).json({})

}