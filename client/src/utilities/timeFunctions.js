
// Create the current time for DB purposes
export const dateNow = () => {
    let currentDate = new Date();
    let timestamp = currentDate.toISOString();
  
    console.log("Created new item at date: - - - " + timestamp);
    return timestamp;
  };
