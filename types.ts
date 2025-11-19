export interface LoanInput {
  amount: number;
  rate: number;
  years: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationYear[];
}

export interface AmortizationYear {
  year: number;
  interest: number;
  principal: number;
  balance: number;
}

export enum ViewState {
  INPUT = 'INPUT',
  RESULTS = 'RESULTS'
}
