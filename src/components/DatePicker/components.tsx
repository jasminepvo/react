import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {
  DateInputProps,
  DatePickerLabelProps,
  DateRangeInfoProps,
  ErrorMessageProps,
  CalendarLegendProps,
} from "./types";

export const DateInput = ({
  value,
  onChange,
  placeholder,
  readOnly,
  required,
  id,
}: DateInputProps) => (
  <input
    type="text"
    id={id}
    className="w-full bg-transparent focus:outline-none text-brown"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    readOnly={readOnly}
    required={required}
  />
);

export const DatePickerLabel = ({
  label,
  required,
  error,
  htmlFor,
}: DatePickerLabelProps) => {
  if (!label) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={`block text-xs font-normal text-taupe ${
        error ? "text-red-600" : ""
      }`}
    >
      {label}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
  );
};

export const DateRangeInfo = ({
  minDate,
  maxDate,
  error,
}: DateRangeInfoProps) => {
  if ((!minDate && !maxDate) || error) return null;

  const getDateRangeText = () => {
    if (minDate && maxDate) {
      return `Valid date range: ${format(minDate, "MM/dd/yyyy")} - ${format(
        maxDate,
        "MM/dd/yyyy"
      )}`;
    }
    if (minDate) {
      return `Minimum date: ${format(minDate, "MM/dd/yyyy")}`;
    }
    if (maxDate) {
      return `Maximum date: ${format(maxDate, "MM/dd/yyyy")}`;
    }
    return "";
  };

  return <div className="mt-1 text-xs text-taupe">{getDateRangeText()}</div>;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="text-sm text-red-600 flex items-center gap-2">
    <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4" />
    {message}
  </p>
);

export const CalendarLegend = ({ paymentDueDate }: CalendarLegendProps) => (
  <div className="my-6 flex items-center gap-6">
    <div className="flex items-center gap-2">
      <span className="inline-block h-4 w-4 rounded bg-blush"></span>
      <span className="text-sm">Selected payment date</span>
    </div>
    {paymentDueDate && (
      <div className="flex items-center gap-2">
        <span className="inline-block h-4 w-4 rounded border-2 border-blush"></span>
        <span className="text-sm">Payment due</span>
      </div>
    )}
  </div>
);
