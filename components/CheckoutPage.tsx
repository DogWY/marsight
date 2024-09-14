"use client"

import React, {useEffect, useState} from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import convertToSubcurrency from '@/lib/convertToSubcurrency'

export default function CheckoutPage({amount}: {amount: number}) {
  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    fetch('https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/purchase/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount: convertToSubcurrency(amount)})
    }).then((res)=> res.json()).then((data)=> setClientSecret(data.clientSecret))
  },[amount])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    
    if(!stripe || !elements){
      return
    }

    const {error: submitError} = (await elements.submit()) as any

    if(submitError){
      setErrorMessage(submitError?.message)
      setLoading(false)
      return
    }


    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`
      }
    }) as any

    if(error){
      setErrorMessage(error?.message)
    }else {

    }

    setLoading(false)
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={e => handleSubmit(e)} className='bg-white p-2 rounded-md'>
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button disabled={!stripe || loading} className='text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse'>
        {
          !loading ? `Pay $${amount}` : `Processing...`
        }
      </button>
    </form>
  )
}