import React, { useState } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import OutputData from './components/OutputData';

// Task 5: the state is lifted up into App, so UserInput and OutputData can share it
function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  // An empty box stays '' (so it can be cleared while typing), anything else becomes a number
  const handleInputChange = (inputIdentifier, newValue) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      [inputIdentifier]: newValue === '' ? '' : +newValue,
    }));
  };

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onInputChange={handleInputChange} />
      <OutputData inputValue={userInput} />
    </>
  );
}

export default App;
