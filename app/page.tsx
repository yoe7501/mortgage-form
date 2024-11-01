'use client'
import { useState } from "react";
import MortgageForm from "./components/MortgageForm";
import ShownResult from "./components/ShownResult";
import "./styles/styles.css";
export default function Home() {
  const [isResult, setResult] = useState(false);
  return (
    
    <div className="flex flex-col lg:flex-row items-center justify-center rounded-lg sm:p-5 mx-auto sm:h-screen w-full sm:w-auto max-w-[600px] lg:max-w-[1200px]">
      <MortgageForm isResult={isResult} setResult={setResult }/>
      {!isResult && <ShownResult/>}
    </div>
  );
}
