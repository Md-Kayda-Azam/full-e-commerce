/**
 * Email Validate
 * @param {*} email
 * @returns
 */
export const isEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
