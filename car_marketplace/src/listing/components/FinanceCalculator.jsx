import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TbZoomMoney } from "react-icons/tb";

function FinanceCalculator({ carDetails }) {
  const [price, setPrice] = useState(0);
  const [interestRate, setInterest] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [downPayment, setDownPayement] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleInputChange = (name, value) => {
    switch (name) {
      case "price":
        console.log("price", value);
        setPrice(value);
        break;
      case "interestRate":
        console.log("interestRate", value);
        setInterest(value);
        break;
      case "loanTerm":
        console.log("loanTerm", value);
        setLoanTerm(value);
        break;
      case "downPayment":
        console.log("downPayment", value);
        setDownPayement(value);
        break;
      default:
        break;
    }
  };

  const CalculateMonthlyPayment = () => {
    const Principal = price - downPayment;
    const MonthlyInterestRate = interestRate / 1200;

    const MonthlyPayment =
      (Principal *
        MonthlyInterestRate *
        Math.pow(1 + MonthlyInterestRate, loanTerm)) /
      (Math.pow(1 + MonthlyInterestRate, loanTerm) - 1);
    console.log("MonthlyPayment", MonthlyPayment.toFixed(2));
    setMonthlyPayment(MonthlyPayment.toFixed(2));
    
    const TotalInterest = MonthlyPayment * loanTerm - Principal;
    setTotalInterest(TotalInterest.toFixed(2));
    const TotalAmount = Principal + TotalInterest;
    setTotalAmount(TotalAmount.toFixed(2));
  };
  return (
    <div className="w-full flex flex-col shadow-md bg-white p-6 rounded-lg my-4">
      <div>
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Finance Calculator
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Price MAD
            </label>
            <Input
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              type="number"
              name="price"
              placeholder="0"
              className="w-full bg-transparent border-0 rounded-md px-4 py-2 text-lg font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0 transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Interest Rate (%)
            </label>
            <Input
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              type="number"
              name="interestRate"
              placeholder="0"
              className="w-full bg-transparent border-0 rounded-md px-4 py-2 text-lg font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-none focus:border-0 transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Loan Term (Mounths)
            </label>
            <Input
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              type="number"
              name="loanTerm"
              placeholder="0"
              className="w-full bg-transparent border-0 rounded-md px-4 py-2 text-lg font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0 transition-colors duration-20 "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Down Payment
            </label>
            <Input
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              type="number"
              name="downPayment"
              placeholder="0"
              className="w-full bg-transparent border-0 rounded-md px-4 py-2 text-lg font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0 transition-colors duration-200"
            />
          </div>
        </div>

        <button
          onClick={() => {
            CalculateMonthlyPayment();
          }}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4 cursor-pointer"
        >
          <TbZoomMoney className="text-white text-xl" />
          <span className="text-sm font-medium text-white">Calculate</span>
        </button>
        <div
          className={`mt-4 border-t border-gray-100 transition-opacity duration-300 ${
            monthlyPayment || totalInterest || totalAmount
              ? "opacity-100"
              : "opacity-50"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Monthly Payment</p>
              <p className="text-xl font-bold text-blue-600">
                {monthlyPayment || "0"} MAD
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Interest</p>
              <p className="text-xl font-bold text-green-600">
                {totalInterest || "0"} MAD
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-xl font-bold text-gray-800">
                {totalAmount || "0"} MAD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FinanceCalculator;
