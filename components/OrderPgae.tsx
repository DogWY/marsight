"use client"

import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function OrderPage({ amount }: { amount: number }) {
    return (
        <Elements
            stripe={stripePromise}
            options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "usd",
            }}
        >
            <CheckoutPage amount={amount} />
        </Elements>

    )
}