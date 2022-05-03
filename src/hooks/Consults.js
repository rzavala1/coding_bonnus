const axios = require('axios').default;

const URL_CREATE_ORDER = "https://giftcardsapidev.azurewebsites.net/api/orders";
const URL_PAYMENT_ORDER = "https://giftcardsapidev.azurewebsites.net/api/payment";

const CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
};

const createOrder = (values, fn, fnError) => {
    axios.post(URL_CREATE_ORDER,
        values,
        CONFIG
    )
        .then(function (response) {
            if (response.data.result === "Success") {
                fn(response.data.object);
            }
        })
        .catch(function (error) {
            console.log(error);
            fnError(error.response.data.message);
        });
}

const paymentOrder = (values, fn, fnError) => {
    axios.post(URL_PAYMENT_ORDER,
        values,
        CONFIG
    )
        .then(function (response) {
            if (response.url !==null) {
                fn(response.data);
            }else if(response.status===200){
               fn(response);
            }
            console.info(response)
        })
        .catch(function (error) {
            if(error.request.status===400){
                fnError(error.response.data.message);
            }
            console.log(error);
        });
}

export default { createOrder, paymentOrder };