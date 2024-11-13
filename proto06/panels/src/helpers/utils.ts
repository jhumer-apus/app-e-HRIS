import dayjs, {ConfigType} from "dayjs";
import { BeautifyObject, ObjectFlat } from "../types";
import { useEffect, useState } from "react";


// totalDays represents the number of days you want to convert, considering 8 working hours per day. 
// The function convertDaysToHHMM() is used to convert the days into the hh:mm format based on the 
// assumption of 8 working hours per day. The resulting formatted time is then displayed 
// in the component.

export const convertDaysToHHMM = (days: number): string => {
  const workingHoursPerDay = 8;
  const totalMinutes = Math.floor(days * workingHoursPerDay * 60);

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minsString = mins.toString().padStart(2, '0');

  return `${hoursString}:${minsString}`;
}

export const capitalize = (str:string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);

}

// This function takes the minutes as input and performs the following steps:
// Divides the total minutes by 60 to get the hours.
// Calculates the remaining minutes by taking the modulus (remainder) of the total minutes divided by 60.
// Converts the hours and minutes into string format using toString().
// Pads the hours and minutes strings with leading zeros using padStart() to ensure a consistent format.
// Returns the formatted string in the hh:mm format.

export const convertMinutesToHHMM = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minsString = mins.toString().padStart(2, '0');

  return `${hoursString}:${minsString}`;
}

// If the truncated string is longer than the limit, 
// the function searches for the last occurrence of a space character (' ') 
// within the limit and removes everything after that.

export const limitString = (str: string): string => {
  const maxLength = 18;
  let limitedString = str.substring(0, maxLength);

  // Trim any trailing spaces if the string is longer than the limit
  if (limitedString.length > maxLength) {
    let lastSpaceIndex = limitedString.lastIndexOf(' ');
    limitedString = limitedString.substring(0, lastSpaceIndex);
  }

  return limitedString;
}


// Function to compute the duration in hours between two dates
export const computeDurationInHours = (start: ConfigType, end: ConfigType): number => {
  const startTime = dayjs(start);
  const endTime = dayjs(end);
  const durationInMilliseconds = endTime.diff(startTime);
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
  return Math.abs(durationInHours);
};




/**
  @author Ms. Universe Matty <3 
  https://github.com/Mattttyyyy
  @description 
  It takes an object and an optional prefix string as arguments.
  It reduces the input object into a new object that is flat (no nested objects).
  For each key in the input object, it checks if the corresponding value is an object.
  If the value is an object, it recursively calls flatten on the value, prepending the current key to the prefix.
  If the value is not an object, it adds the key-value pair to the accumulated object, prepending the current key to the prefix. It returns the accumulated object, which is flat.
*/

export const flattenObject = (obj: ObjectFlat, prefix = ''): ObjectFlat => {
  return Object.keys(obj).reduce((acc: {[key: string]: any}, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !(obj[k] instanceof Date)) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

/**
@author Ms. World Matty <3
https://github.com/Mattttyyyy
@abstract 
How to use: Pass any json message unto this function to stringify it while optimizing the string a bit.
@requires any JSON Object
const jsonString = '{"obt_total_hours":["This field is required."]}';
const jsonObject = JSON.parse(jsonString);
const beautifiedOutput = beautifyJSON(jsonObject);
console.log(beautifiedOutput);
@returns
"obt total hours : This field is required."
*/ 
export const beautifyJSON = (jsonObj: BeautifyObject) => {
  let beautifiedString = '';
  for (const key in jsonObj) {
    if (jsonObj.hasOwnProperty(key)) {
      const formattedKey = key.replace('_', ' ');
      const value = typeof jsonObj[key] === 'string' ? jsonObj[key] : jsonObj[key][0];
      beautifiedString += `${formattedKey} : ${value}\n`;
    }
  }
  return beautifiedString.trim();
}



export const findExistingKey = <T extends object>(PassedObject: T, keysToCheck: (keyof T)[]): keyof T => {
  for (const key of keysToCheck) {
      if (key in PassedObject) {
          return key;
      }
  }
  throw console.error('No Key Found');
}


export const checkDevice = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(()=> {

    if(window.navigator.userAgent){
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(window.navigator.userAgent))
    }
  }, [window.navigator.userAgent])

  return (
    {
      isMobile
    }
  )
}

export const getLast3Char = (string: string) => string.slice(-3)


type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
/**
@author Ms. Galaxy Matty <3
https://github.com/Mattttyyyy
@abstract 
There's a lot of local state in the codebase, redeclaring them one by one is a bit of a work.
@requires
a setState type of a local useState, which you can pass an array of fields to modify, and an array of values to put it in. 
Please note that this function assumes that the fields and values arrays are of the same length and that the types of the values in the values array are assignable to the corresponding fields in the state. You might want to add some error checking to handle cases where these assumptions are not met. Also, this function does not check if the fields exist in the state object, so you’ll need to ensure that you only pass valid field names. If you want to make it safer, you could add some type checking or use a library like lodash’s set function to safely set the values.
@returns
void. Because it works as a setState function invoked.
*/ 
export const clearFields = <T>(setState: SetState<T>, fields: (keyof T)[], values: any[]): void => {
  setState((prevState: T) => {
    const newState = { ...prevState };
    fields.forEach((field, index) => {
      newState[field] = values[index];
    });
    return newState;
  });
};

export const cleanTextNumber = (val:string) => {
  return val.replace(/\D/g, '')
}

export const mobileNoFormat = (number:string) => number.replace(/^0/, '')