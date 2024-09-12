module.exports.handleApiError = (error, context = "") => {
  if (error.response) {
    // Server responded with a status other than 2xx
    throw new Error(
      `Error: Request failed with status code ${error.response.status} for ${context}`
    );
  } else if (error.request) {
    // No response was received
    throw new Error(`Error: No response received from server for ${context}`);
  } else {
    // Something happened in setting up the request
    throw new Error(
      `Error: Operation failed for ${context} - ${error.message}`
    );
  }
};
