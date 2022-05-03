import React, { useState, useContext } from 'react';
import payloadOrderJson from '../../config/PayloadOrder.json';
import paymentPayloadJson from '../../config/PaymentPayload.json';
import consults from '../../hooks/Consults';
import Iframe from '../Iframe';
import UserContext from "../../context/UserContext";

function Home() {

  const [showPayButton, setShowPayButton] = useState(false);
  const [payOrder, setPayOrder] = useState({});
  const [paymentPayload, setPaymentPayload] = useState({});
  const [textError, setTextError] = useState();
  const [showError, setShowError] = useState(false);
  const [showPayFinish, setShowPayFinish] = useState(false);
  const [data, setData] = useState({});
  const ctx = useContext(UserContext);
  const { showIframe, setShowIframe } = ctx;

  const createOrder = () => {
    consults.createOrder(payloadOrderJson, (payOrder) => {
      console.info(payOrder);
      setPayOrder(payOrder);
      setShowPayButton(true);
    }, (error) => {
      setTextError(error);
      setShowError(true);
    });
  }

  const paymentOrder = () => {
    let paymentPayloadAux = paymentPayloadJson;
    paymentPayloadAux.orderId = payOrder.id;
    consults.paymentOrder(paymentPayloadAux, (payloadOrder) => {
      setPaymentPayload(payloadOrder);
      setShowIframe(true);
      setShowPayFinish(true);
    }, (error) => {
      setTextError(error);
      setShowError(true);
    });
  }

  const paymentPayFinish = () => {
    consults.paymentOrder({ "orderId": payOrder.id }, (dataRes) => {
      for (let obj of dataRes) {
        if (obj.orderId === payOrder.id) {
          setShowPayFinish(false);
          setData(obj);
        }
      }
    }, (error) => {
      setTextError(error);
      setShowError(true);
    });
  }

  return (
    <div className="App">
      {
        !showIframe && !showPayButton &&
        <button onClick={createOrder}>Crear órden</button>
      }
      {
        showPayButton && !showIframe &&
        <button onClick={paymentOrder}>Pago</button>
      }
      {
        showPayFinish &&
        <button onClick={paymentPayFinish}>Finalizar pago</button>
      }
      {
        showError &&
        <div className='error'>
          <label>{textError}</label>
        </div>
      }
      {showIframe &&
        <Iframe url={paymentPayload.url}></Iframe>
      }
      {
        JSON.stringify(data) !== '{}' &&
        <div className='main-data'>
          <div className='title'>Datos de la órden</div>
          <div>
            <label className='label-title'>Uuid: </label><label>{data.uuid}</label>
          </div>
          <div>
            <label className='label-title'>Nombre: </label><label>{data.name}</label>
          </div>
          <div>
            <label className='label-title'>Monto: </label><label>{parseInt(data.amount)}</label>
          </div>
          <div>
            <label className='label-title'>Código: </label><label>{data.number}</label>
          </div>

        </div>
      }
    </div>
  );
}

export default Home;
