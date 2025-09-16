/**
 * Processes a string to replace our tokens ([SPACE])
 * @param {string} inputText - The text from the feature file (e.g., "[SPACE]my_user[SPACE]").
 * @returns {string} The processed string (e.g., " my_user ").
 */
export const processString = (inputText) => {
  return inputText.replace(/\[SPACE\]/g, ' ');
};