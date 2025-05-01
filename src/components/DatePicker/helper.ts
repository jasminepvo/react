import { ValidateDateInputProps } from "./types";

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

export const validDateFormat = (testDate: string): boolean => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(testDate);
}