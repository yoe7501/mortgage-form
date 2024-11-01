"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PaymentResult from "./PaymentResult";

interface Props{
    isResult: boolean,
    setResult: (value: boolean) => void
}

enum MortgageEnum {
  repayment = "repayment",
  interest = "interest",
}

const schema = z.object({
  amount: z
    .number()
    .min(1000, { message: "Loan must be over 1000" })
    .max(400000, { message: "Loand over 400,000 not allowed" }),
  years: z
    .number()
    .min(1, { message: "Term must be atleast a year" })
    .max(30, { message: "Term cannot exceed 30 years" }),
  rate: z.number().min(1).max(30, { message: "Within 1, 30%" }),
  type: z.enum([MortgageEnum.interest, MortgageEnum.repayment], {
    message: "Required",
  }),
});

export type Input = z.infer<typeof schema>;

const MortgageForm = ({isResult, setResult} : Props) => {



  const [focusField, setFocusField] = useState({
    amount: false,
    years: false,
    rate: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<Input>({
    resolver: zodResolver(schema),
  });

  const [data, setData] = useState<Input>()
  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);
    setData(data);
    setResult(true);
  };

  const MortgageType: MortgageEnum = watch('type', MortgageEnum.repayment);
  const hasErrors = Object.keys(errors).length > 0;
  return (
    
    <>
    <div className="formContainer">
      <header className="flex flex-col sm:flex-row items-start sm:justify-between mb-7 ">
        <h1 className="font-semibold text-2xl">Mortgage Calculator</h1>
        <button onClick={()=> reset()} className="underline text-slate-400 ">Clear All</button>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        action=""
      >
        <label htmlFor="amount">Mortgage Amount</label>
        <div className={`input ${errors.amount? 'ring-1 ring-red': ''}`}>
          <span className={`px-3 py-1 rounded-l-md ${focusField.amount === true ? 'bg-lime': ''} ${errors.amount? 'bg-red text-white': ''} `}>$</span>
          <input
            onFocus={() => setFocusField(prev=>({...prev, amount:true}))}
            {...register("amount", {valueAsNumber: true, onBlur: ()=> setFocusField((prev) => ({...prev, amount:false}))})}
            className="w-full border border-slate-300 rounded-sm"
            type="number"
            id="amount"
          />
          
        </div>
        {errors.amount && <p className="text-red">{errors.amount.message}</p>}

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="basis-1/2">
            <label  htmlFor="years">Mortgage Term</label>
            <div className={`input ${errors.years? 'ring-1 ring-red': ''}`}>
              <input
                onFocus={()=> setFocusField(prev=>({...prev, years:true}))}
                className="w-full"
                type="number"
                id="years"
                {...register("years", {valueAsNumber:true, onBlur: () => setFocusField((prev) => ({...prev, years:false}))})}
              />
              <span className={`py-1 px-3 rounded-r-md ${focusField.years === true? 'bg-lime': ''} ${errors.years? 'bg-red text-white': ''}`}>years</span>
            </div>
            {errors.years && <p className="text-red">{errors.years.message}</p>}
          </div>
          

          <div className="basis-1/2">
            <label  htmlFor="rate">Interest Rate</label>
            <div className={`input ${errors.rate ? 'ring-1 ring-red': ''}`}>
              <input
                onFocus={()=> setFocusField(prev=>({...prev, rate:true}))}
                className="w-full"
                type="float"
                id="rate"
                {...register("rate", {valueAsNumber:true, onBlur: () => setFocusField((prev) => ({...prev, rate:false}))})}
              />
              <span className={`py-1 px-3 rounded-r-md ${focusField.rate === true? "bg-lime": ""} ${errors.rate? 'bg-red text-white': ''} `}>%</span>
            </div>
            {errors.rate && <p className="text-red">{errors.rate.message}</p>}
          </div>
          
        </div>

        <div className="flex flex-col items-start gap-2">
          <label>Mortgage type</label>

          <div className={`radioButton ${MortgageType === MortgageEnum.repayment ? "bg-lime": ""}`}>
            <input
              type="radio"
              id="repayment"
              value="repayment"
              {...register('type')}
              style={{display:'none'}}
            />
            <label className="radioLabel" htmlFor="repayment">
              Repayment
            </label>
          </div>

          <div className={`radioButton ${MortgageType === MortgageEnum.interest ? "bg-lime": ""}`}>
            <input
              type="radio"
              id="interest"
              value="interest"
              {...register('type')}
              style={{display:'none'}}
            />
            <label htmlFor="interest" className="radioLabel whitespace-nowrap">
              Interest Only
            </label>
          </div>
        </div>

        <button disabled={hasErrors}   className="button" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#133041"
              d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"
            />
          </svg>
          <p>Calculate Repayments</p>
        </button>
      </form>
      
    </div>
    {isResult && <PaymentResult data={data!} />}
    </>
    
   
  );
};

export default MortgageForm;
