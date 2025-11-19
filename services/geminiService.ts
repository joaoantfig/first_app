import { GoogleGenAI } from "@google/genai";
import { LoanInput, LoanResult } from "../types";
import { formatCurrency } from "../utils/calculations";

const apiKey = process.env.API_KEY;

export const getFinancialAdvice = async (input: LoanInput, result: LoanResult): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Unable to generate AI insights.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      You are an expert financial advisor. A user is considering a loan with the following details:
      - Loan Amount: ${formatCurrency(input.amount)}
      - Annual Interest Rate: ${input.rate}%
      - Duration: ${input.years} years
      
      Calculated Results:
      - Monthly Payment: ${formatCurrency(result.monthlyPayment)}
      - Total Interest Payable: ${formatCurrency(result.totalInterest)}
      - Total Cost of Loan: ${formatCurrency(result.totalPayment)}

      Please provide a brief, friendly, and professional analysis of this loan in 3 short paragraphs.
      1. Analyze the interest cost relative to the principal (is it expensive?).
      2. Comment on the monthly affordability (general rule of thumb).
      3. Suggest one actionable tip to save money (e.g., paying extra or shortening the term).
      Keep the tone helpful and concise.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate advice at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't connect to the financial brain right now. Please try again later.";
  }
};