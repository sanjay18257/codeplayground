export const analyzeCodeForInputs = (code, language) => {
  if (language === 'java') {
    // Check for Scanner usage
    if (code.includes('new Scanner(System.in)') && code.includes('.next')) {
      return {
        needsInput: true,
        suggestion: "Your code uses Scanner to read input. Please provide all expected input values in the Input pane, one per line."
      };
    }
  } else if (language === 'python') {
    // Check for input() function
    if (code.includes('input(')) {
      return {
        needsInput: true,
        suggestion: "Your code uses input() function. Please provide all expected input values in the Input pane, one per line."
      };
    }
  }
  
  return { needsInput: false };
};
