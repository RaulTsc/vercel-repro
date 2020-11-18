import { LANGUAGE } from "../app/interfaces";

const getMessages = async (language: LANGUAGE) => {
  try {
    return require(`../lang/${language}.json`);
  } catch (error) {
    console.error(error);
    return require(`../lang/en-US.json`);
  }
};

export default getMessages;
