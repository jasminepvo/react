import { ValidateDateInputProps } from "./types";

/**
 * Validates a date input against min/max range and excluded dates.
 * @param params - An object containing minDate, maxDate, formattedDate, excludeDates, and error messages.
 * @returns A specific error message if the date is out of range or excluded, otherwise an empty string.
 */
export const validateDateInput = ({
    minDate,
    maxDate,
    formattedDate,
    excludeDates,
    startDateErrorMessage,
    endDateErrorMessage,
    excludeDatesErrorMessage,
}: ValidateDateInputProps): string => {
    const typedDate = new Date(formattedDate);
    const isDateRange = minDate !== maxDate;
    const isExcludeDates = excludeDates?.some((date: Date) => 
        new Date(date).getTime() === typedDate.getTime()
    );

    if (isDateRange && typedDate < minDate) {
        return startDateErrorMessage || "Invalid date range";
    }

    if (isDateRange && typedDate > maxDate) {
        return endDateErrorMessage || "Invalid date range";
    }
    
    if (isExcludeDates) {       
        return excludeDatesErrorMessage || "Invalid date range";
    }

    return "";
}

/**
 * Checks if a string matches the MM/DD/YYYY date format.
 * @param testDate - The string to test.
 * @returns True if the string is a valid date format, false otherwise.
 */
export const validDateFormat = (testDate: string): boolean => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(testDate);
}

/**
 * Returns the initial input error message for the DatePicker.
 * @param params - An object containing required, selected, selectedDate, and error.
 * @returns The error message if the field is required and no date is set, otherwise an empty string or the provided error.
 */
export function getInitialInputError({
  required,
  selected,
  selectedDate,
  error,
}: {
  required: boolean;
  selected: Date | null | undefined;
  selectedDate: Date | null | undefined;
  error?: string;
}): string {
  if (required && !selected && !selectedDate) {
    return error || "This field is required";
  }
  return error || "";
}

/**
 * Formats the date input as the user types, inserting slashes and removing invalid characters.
 * @param value - The current input value
 * @returns The formatted input string in MM/DD/YYYY format
 */
export function formatDateInput(value: string): string {
  // Remove all non-digit characters
  let digits = value.replace(/\D/g, "");
  // Insert slash after MM
  if (digits.length > 2) digits = digits.slice(0, 2) + '/' + digits.slice(2);
  // Insert slash after MM/DD
  if (digits.length > 5) digits = digits.slice(0, 5) + '/' + digits.slice(5, 9);
  // Limit to 10 characters (MM/DD/YYYY)
  return digits.slice(0, 10);
}

/**
 * Returns the required field error message if the value is missing and the field is required.
 * @param date - The date value to check.
 * @param required - Whether the field is required.
 * @param error - Optional custom error message.
 * @returns The error message if required and date is missing, otherwise an empty string.
 */
export function getRequiredFieldError(date: Date | null | undefined, required: boolean, error?: string): string {
  return required && !date ? error || "This field is required" : "";
}