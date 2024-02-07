// import React, { useEffect } from 'react';

// function YearlyReminder() {
//   // Function to display the yearly pop-up
//   const showYearlyPopup = () => {
//     alert("baguhin nalng ng oras lagayan ng year");
//   };

//   // Function to display the monthly pop-up
//   const showMonthlyPopup = () => {
//     alert("baguhin nalng ng oras lagayan ng month");
//   };

//   useEffect(() => {
//     // Set a timeout for 1 second for the yearly pop-up
//     const yearlyTimeoutId = setTimeout(showYearlyPopup, 1000); // 1 second * 1000 milliseconds

//     // Set a timeout for 5 seconds for the monthly pop-up (adjust as needed)
//     const monthlyTimeoutId = setTimeout(showMonthlyPopup, 5000); // 5 seconds * 1000 milliseconds

//     // Clear the timeouts when the component unmounts
//     return () => {
//       clearTimeout(yearlyTimeoutId);
//       clearTimeout(monthlyTimeoutId);
//     };
//   }, []);

//   return (
//     <div>
//       {/* Your React component content goes here */}
//     </div>
//   );
// }

// export default YearlyReminder;



import React, { useEffect } from 'react';

function YearlyReminder() {
  // Function to display the yearly pop-up
  const showYearlyPopup = () => {
    alert("baguhin nalng ng oras lagayan ng year");
    // Set a flag in local storage to indicate that the yearly pop-up has been shown
    localStorage.setItem('yearlyPopupShown', 'true');
  };

  // Function to display the monthly pop-up
  const showMonthlyPopup = () => {
    alert("baguhin nalng ng oras lagayan ng month");
    // Set a flag in local storage to indicate that the monthly pop-up has been shown
    localStorage.setItem('monthlyPopupShown', 'true');
  };

  useEffect(() => {
    // Check if the yearly pop-up hasn't been shown before
    const hasYearlyPopupShown = localStorage.getItem('yearlyPopupShown');
    if (!hasYearlyPopupShown) {
      // Set a timeout for 1 second for the yearly pop-up
      const yearlyTimeoutId = setTimeout(showYearlyPopup, 1000); // 1 second * 1000 milliseconds

      // Clear the timeout when the component unmounts
      return () => {
        clearTimeout(yearlyTimeoutId);
      };
    }

    // Check if the monthly pop-up hasn't been shown before
    const hasMonthlyPopupShown = localStorage.getItem('monthlyPopupShown');
    if (!hasMonthlyPopupShown) {
      // Set a timeout for 5 seconds for the monthly pop-up (adjust as needed)
      const monthlyTimeoutId = setTimeout(showMonthlyPopup, 5000); // 5 seconds * 1000 milliseconds

      // Clear the timeout when the component unmounts
      return () => {
        clearTimeout(monthlyTimeoutId);
      };  
    }
  }, []);

}

export default YearlyReminder;
