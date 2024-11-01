import React from 'react'
import { Input } from './MortgageForm'

interface Props{
    data: Input;
}

const PaymentResult = ({data} : Props) => {
    if (!data) return null;

    const principal = data.amount;
    const monthlyRate = data.rate / 100 / 12;
    const numPayments = data.years * 12;
  
    const monthlyPayment =
      ((principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1));
    const total = parseFloat((monthlyPayment * numPayments).toFixed(2)).toLocaleString('en-US');
    const payments = parseFloat(monthlyPayment.toFixed(2)).toLocaleString('en-US');
    console.log(payments + " " + total )
  return (
    <div className='showResult'>
    <header className=''>
        <h1 >Your Results</h1>
        <p className='py-3'>Your results are shown below based on the information you provided. To adjust the results, edit the form and click -calculate repayments- again.</p>
    </header>
    <div className='repaymentBox'>
        <p className='text-slate-400 text-sm pb-2' >Your monthly repayments</p>
        <p className='text-5xl text-lime font-bold pb-5'>${payments}</p>
        <hr className='p-5 '/>
        <p className='text-slate-400 text-sm pb-2'>Total you will repay over the term</p>
        <p className='font-bold'>${total}</p>
    </div>
    </div>
  )
}

export default PaymentResult