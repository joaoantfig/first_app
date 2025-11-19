import { LoanInput, LoanResult, AmortizationYear } from '../types';

export const calculateLoan = (input: LoanInput): LoanResult => {
  const { amount, rate, years } = input;
  
  // Handle edge case of 0 interest
  if (rate === 0) {
    const totalMonths = years * 12;
    const monthlyPayment = amount / totalMonths;
    return {
      monthlyPayment,
      totalPayment: amount,
      totalInterest: 0,
      amortizationSchedule: Array.from({ length: years }, (_, i) => ({
        year: i + 1,
        interest: 0,
        principal: amount / years,
        balance: amount - ((amount / years) * (i + 1))
      }))
    };
  }

  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = years * 12;
  
  // Standard Amortization Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  const monthlyPayment = 
    (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - amount;

  // Generate yearly schedule for charts
  let balance = amount;
  const amortizationSchedule: AmortizationYear[] = [];
  
  let yearlyInterest = 0;
  let yearlyPrincipal = 0;

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = monthlyPayment - interestForMonth;
    
    balance -= principalForMonth;
    yearlyInterest += interestForMonth;
    yearlyPrincipal += principalForMonth;

    // Aggregate by year
    if (i % 12 === 0) {
      amortizationSchedule.push({
        year: i / 12,
        interest: parseFloat(yearlyInterest.toFixed(2)),
        principal: parseFloat(yearlyPrincipal.toFixed(2)),
        balance: Math.max(0, parseFloat(balance.toFixed(2)))
      });
      yearlyInterest = 0;
      yearlyPrincipal = 0;
    }
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(value);
};