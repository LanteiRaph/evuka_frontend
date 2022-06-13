import React, { useState } from "react";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";


const PaypalButton = (props) => {
    const { product,handleApprove } = props;
   
    return (
        <PayPalButtons
            style={{
                color: "gold",
                layout: "horizontal",
                height: 48,
                tagline: false
            }}

            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: product.description,
                            amount: {
                                value: product.price
                            }
                        }
                    ]
                });
            }}
            onApprove={async (data, actions) => {
                //Retrive the order response from paypal.
                const order = await actions.order.capture();
                //handle the apprrove for local managaement
                handleApprove(data.orderID, order);
            }}
            onError={(err) => {
                //Respond back to the user.
                toast.error("PayPal Checkout onError", err);
            }}
            onCancel={() => {
                // Display cancel message, modal or redirect user to cancel page or back to cart
                toast.success("You cancalled the Payment");
            }}

        />
    );
};

export default PaypalButton