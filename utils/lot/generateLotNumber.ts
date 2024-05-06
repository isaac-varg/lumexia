// generates a lot compliant with company lot nomenclature
// where <SKU>.<RANDOM CHARACTER><2 RANDOM INTEGERS><MONTH CODE CHARACTER><DD><YY>
// e.g., BASE1234.A12A0124 is item with SKU BASE1234 from Januyary 01 2024

import { getCharacterFromCode } from "../general/getCharacterFromCode";
import { getLeadingZeros } from "../general/getLeadingZeros";
import { getRandomIntBetween } from "../general/getRandomIntBetween";

export const generateLotNumber = (referenceCode: string, lotDate?: Date | null) => {
    const date = lotDate || new Date();

    // Separate date components
    let year = date.getFullYear().toString().substring(2, 4);
    let day = getLeadingZeros(date.getDate(), 2);
    let month = date.getMonth();
  
    // generate number letter
    let randomLetter = getCharacterFromCode(getRandomIntBetween(65, 90));
  
    // generate random number with two digits (for leading zeros)
    let randomNumber = getLeadingZeros(getRandomIntBetween(0, 99), 2);
  
    // retrieve month code
    let characterCode = 65 + month; // remember month is zero indexed
    let monthCode = getCharacterFromCode(characterCode);
  
    // Build lot/batch number
  
    let lot = referenceCode + "." + randomLetter + randomNumber + monthCode + day + year;
    return lot;
  };