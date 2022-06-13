import PaypalButton from "./PaypalButton";
import { useState } from "react";
import { useRouter } from "next/router";
import { NEXT_BACKEND_URI } from "../../config/app";
import { toast } from "react-toastify";

const Paypal = () => {
    //Compile the item for payment(descritopn: 'Course bourges at evuka', amout:cart_total)
    const product = {
        description: "Design+Code React Hooks Course",
        price: 1
    };
    //Local state needed to handle the user experince
    const [paidFor, setPaidFor] = useState(false);
    const router = useRouter()

    const handleApprove = async (orderId, order) => {

        // Call backend function to fulfill order
        const fulfill = await fetch(`${NEXT_BACKEND_URI}/api/paypal/`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ orderID: orderId , order}),
        })
        // if response is success
        if (!fulfill.ok) {
            // if response is error
            toast.error("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@evuka.io for assistance.");
        }
        //Set paid for to true for user experince 
        setPaidFor(true);
        //
        if (paidFor) {
            // Display success message, modal or redirect user to success page
            toast.success("Thank you for your purchase!");
            //
            //Refresh user's account or subscription status
            router.push('/user')
        }

    };

    return (
        <div className="paypal-button-container">
            <PaypalButton product={product} handleApprove={handleApprove} />
        </div>
    );
};


export default Paypal