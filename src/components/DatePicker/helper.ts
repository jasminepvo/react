import { ValidateDateInputProps } from "./types";
import { parse, isValid, format } from 'date-fns';

const INVALID_MSG = "Invalid date range";

// Supported date formats
export const SUPPORTED_FORMATS = ['MM/dd/yyyy', 'dd/MM/yyyy'] as const;
export type DateFormat = typeof SUPPORTED_FORMATS[number];

/**
 * Parses a date string using the specified format
 * @param value - The date string to parse
 * @param format - The format to parse with
 * @returns Parsed Date object or null if invalid
 */
export function parseDateWithFormat(
  value: string,
  format: DateFormat
): Date | null {
  console.log('🔍 parseDateWithFormat - Parsing value:', value, 'with format:', format);
  try {
    const parsed = parse(value, format, new Date());
    console.log('📅 parseDateWithFormat - Raw parsed result:', parsed);
    const isValidDate = isValid(parsed);
    console.log('✅ parseDateWithFormat - Is valid date:', isValidDate);
    return isValidDate ? parsed : null;
  } catch (error) {
    console.log('❌ parseDateWithFormat - Parsing failed with error:', error);
    return null;
  }
}

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
  console.log('🔍 validateDateInput - Validating date:', formattedDate);
  console.log('📅 validateDateInput - Min date:', minDate);
  console.log('📅 validateDateInput - Max date:', maxDate);
  console.log('📅 validateDateInput - Exclude dates:', excludeDates);

  const typedDate = new Date(formattedDate);
  console.log('📅 validateDateInput - Typed date:', typedDate);

  const isDateRange = minDate !== maxDate;
  console.log('🔍 validateDateInput - Is date range:', isDateRange);

  const isExcludeDates = excludeDates?.some((date: Date) =>
    new Date(date).getTime() === typedDate.getTime()
  );
  console.log('🔍 validateDateInput - Is in exclude dates:', isExcludeDates);

  if (isDateRange && typedDate < minDate) {
    console.log('❌ validateDateInput - Date is before min date');
    return startDateErrorMessage || INVALID_MSG;
  }

  if (isDateRange && typedDate > maxDate) {
    console.log('❌ validateDateInput - Date is after max date');
    return endDateErrorMessage || INVALID_MSG;
  }

  if (isExcludeDates) {
    console.log('❌ validateDateInput - Date is in exclude list');
    return excludeDatesErrorMessage || INVALID_MSG;
  }

  console.log('✅ validateDateInput - Date is valid');
  return "";
}

/**
 * Validates if a string matches the specified date format
 * @param testDate - The string to test
 * @param format - The format to check against
 * @returns True if the string matches the format, false otherwise
 */
export const validDateFormat = (
  testDate: string,
  format: DateFormat
): boolean => {
  console.log('🔍 validDateFormat - Testing date:', testDate, 'with format:', format);
  const result = parseDateWithFormat(testDate, format) !== null;
  console.log('✅ validDateFormat - Is valid format:', result);
  return result;
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
 * Formats a date according to the specified format
 * @param date - The date to format
 * @param formatStr - The format string (e.g., 'MM/dd/yyyy')
 * @returns Formatted date string
 */
export function formatDate(date: Date, formatStr: DateFormat): string {
  return format(date, formatStr);
}

/**
 * Formats the date input as the user types, inserting slashes and removing invalid characters.
 * @param value - The current input value
 * @param formatStr - The target format (defaults to 'MM/dd/yyyy')
 * @returns The formatted input string
 */
export function formatDateInput(value: string, formatStr: DateFormat = 'MM/dd/yyyy'): string {
  console.log('🔄 formatDateInput - Input value:', value, 'Format:', formatStr);

  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  console.log('🔢 formatDateInput - Extracted digits:', digits);

  // Handle empty input
  if (digits.length === 0) {
    console.log('📭 formatDateInput - Empty input, returning empty string');
    return "";
  }

  // Format based on the target format
  if (formatStr === 'MM/dd/yyyy') {
    let formatted = "";

    if (digits.length >= 1) {
      // Month: take first 2 digits
      const month = digits.slice(0, 2);
      formatted = month;
      console.log('📅 formatDateInput - Month part:', month);
    }

    if (digits.length >= 3) {
      // Day: take next 2 digits
      const day = digits.slice(2, 4);
      formatted = `${formatted}/${day}`;
      console.log('📅 formatDateInput - Day part:', day);
    }

    if (digits.length >= 5) {
      // Year: take next 4 digits
      const year = digits.slice(4, 8);
      formatted = `${formatted}/${year}`;
      console.log('📅 formatDateInput - Year part:', year);
    }

    // Limit to 10 characters (MM/DD/YYYY)
    const result = formatted.slice(0, 10);
    console.log('✨ formatDateInput - Final formatted result (MM/dd/yyyy):', result);
    return result;
  } else if (formatStr === 'dd/MM/yyyy') {
    let formatted = "";

    if (digits.length >= 1) {
      // Day: take first 2 digits
      const day = digits.slice(0, 2);
      formatted = day;
      console.log('📅 formatDateInput - Day part:', day);
    }

    if (digits.length >= 3) {
      // Month: take next 2 digits
      const month = digits.slice(2, 4);
      formatted = `${formatted}/${month}`;
      console.log('📅 formatDateInput - Month part:', month);
    }

    if (digits.length >= 5) {
      // Year: take next 4 digits
      const year = digits.slice(4, 8);
      formatted = `${formatted}/${year}`;
      console.log('📅 formatDateInput - Year part:', year);
    }

    // Limit to 10 characters (DD/MM/YYYY)
    const result = formatted.slice(0, 10);
    console.log('✨ formatDateInput - Final formatted result (dd/MM/yyyy):', result);
    return result;
  }

  console.log('⚠️ formatDateInput - Unsupported format, returning original value:', value);
  return value;
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