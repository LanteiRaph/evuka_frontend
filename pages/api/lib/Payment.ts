let unirest = require('unirest');


//Moale an mpesa payment.
interface MpesaOptions{

}

const cridentials = {
    "BusinessShortCode": 174379,
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIwODIyMTEzNDA0",
    "Timestamp": "20220822113404",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": 254111850032,
    "PartyB": 174379,
    "PhoneNumber": 254111850032,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of X" 
  }

export class MpesaPayment{
    //
    //Construct the payment with reqird 
    constructor({}:MpesaOptions){

    }

    //Rturns the bear token for access to api servics.
    get_access_refresh_token():string{
        return ''
    }

    //Send sdk push to request user
    lipaNaMpesaOnline(){
        //

    }

}