module.exports.filterStringTH = (str) => {
  let result = "";
  const regex = /^[a-zA-Zก-ฮะาิีึืุูเแโำใไ่้๋็ั๊์ ]$/;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];

    if (regex.test(c)) {
      result += c;
    }
  }

  return result;
};

module.exports.filterStringEN = (str) => {
  let result = "";
  const regex = /^[a-zA-Z]$/;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];

    if (regex.test(c)) {
      result += c;
    }
  }

  return result;
};

module.exports.filterStringNumber = (str) => {
  let result = "";
  const regex = /^[0-9]$/;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];

    if (regex.test(c)) {
      result += c;
    }
  }

  return result;
};

module.exports.filterStringParentTH = (str) => {
  // Remove any text within parentheses (including the parentheses themselves)
  str = str.replace(/\(.*?\)/g, "");

  let result = "";
  const regex = /^[a-zA-Zก-ฮะาิีึืุูเแโำใไ่้๋็ั๊์ ]$/;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];

    if (regex.test(c)) {
      result += c;
    }
  }

  return result.trim();
};

module.exports.formatPhoneNumberMap = (phoneNumbers) => {
  return phoneNumbers.map((number) => {
    // Remove all non-numeric characters except dashes
    let cleanedNumber = number.replace(/[^\d-]/g, "");
    // Add hyphen after the area code (assumes the first 2 or 3 digits are the area code)
    if (cleanedNumber.length === 10) {
      // e.g., "028921873"
      return cleanedNumber.replace(/(\d{2})(\d+)/, "$1-$2");
    } else if (cleanedNumber.length === 11) {
      // e.g., "0819251393"
      return cleanedNumber.replace(/(\d{3})(\d+)/, "$1-$2");
    } else {
      return cleanedNumber; // Return the number as-is if it doesn't match expected length
    }
  });
};

module.exports.formatPhoneNumber = (number) => {
  let cleanedNumber = number.replace(/[^\d-]/g, "");
  if (cleanedNumber.length === 10) {
    // e.g., "028921873"
    return cleanedNumber.replace(/(\d{2})(\d+)/, "$1-$2");
  } else if (cleanedNumber.length === 11) {
    // e.g., "0819251393"
    return cleanedNumber.replace(/(\d{3})(\d+)/, "$1-$2");
  } else {
    return cleanedNumber; // Return the number as-is if it doesn't match expected length
  }
};

module.exports.trimObjectStrings = (obj) => {
  const trimmedObject = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      trimmedObject[key] = obj[key].trim();
    } else {
      trimmedObject[key] = obj[key]; // Keep non-string values as is
    }
  }
  return trimmedObject;
};
