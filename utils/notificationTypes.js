export const notificationTypes = {
  /*affiliate notifications*/
  "become affiliate":
    "Welcome! You are now part of the KreateSell Affiliate Marketing Program.",

  "affiliate request": (name, productName) => {
    return `${name} has approved your request to promote ${productName}. Best of luck!`;
  },

  /*kreator notifications*/
  "approve affiliate": name => {
    return `You have an affiliate request note from ${name}. Take a look!`;
  },
};
