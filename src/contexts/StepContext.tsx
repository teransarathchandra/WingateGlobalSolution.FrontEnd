import React, { createContext, ReactNode, useState } from 'react';

interface StepContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

// Create a context with a default value
export const StepContext = createContext<StepContextType>({
  currentStep: 0,
  setCurrentStep: () => { }
});

interface StepProviderProps {
  children: ReactNode; // or React.ReactNode, depending on your version of React
}

// Define the provider component
export const StepProvider: React.FC<StepProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepContext.Provider>
  );
};