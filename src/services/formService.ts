const submitForm = async (endpoint: string, formData: Record<string, string>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Form submitted to ${endpoint}:`, formData);
        resolve("Success");
      }, 1000);
    });
  };
  
  export default submitForm;
  