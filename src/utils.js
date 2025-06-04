export const idGeneratingFunction = () => {
  let stringGenerator =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let randomString = "";

  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * stringGenerator.length);

    randomString += stringGenerator[randomIndex];
  }

  return randomString;
};
