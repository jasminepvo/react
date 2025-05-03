import { useRef, useState } from "react";
import type { JSX } from "react";
import { format, parse, isValid } from "date-fns";
import * as Popover from "@radix-ui/react-popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Calendar } from "./Calender";
import { validateDateInput, validDateFormat } from "./helper";
import { DatePickerProps, SelectionValue } from "./types";

const DatePicker = ({
  className = "",
  startDate,
  endDate,
  excludeDates = [],
  isReadOnly = false,
  required = false,
  selected,
  onChange,
  placeholder = "",
  helpText,
  idTextfield,
  name,
  startDateErrorMessage,
  endDateErrorMessage,
  excludeDatesErrorMessage,
  error,
  label,
  disclaimer,
  disabled,
  paymentDueDate,
  showOutsideDays = true,
}: DatePickerProps): JSX.Element => {
  const [internalValue, setInternalValue] = useState<SelectionValue>(null);
  const [open, setOpen] = useState(false);
  const [tempSelectedValue, setTempSelectedValue] = useState<Date | undefined>(
    undefined
  );
  const [inputValue, setInputValue] = useState(() => {
    const value = selected || internalValue;
    return value ? format(value, "MM/dd/yyyy") : "";
  });
  const [inputError, setInputError] = useState(() => {
    return required && !selected && !internalValue
      ? error || "This field is required"
      : error || "";
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = selected !== undefined;
  const selectedValue = isControlled ? selected : internalValue;

  const handleCalendarSelect = (value: Date | undefined) => {
    setTempSelectedValue(value);
    setInputError(""); // Clear any previous errors

    if (value) {
      const validationError = validateDateInput({
        minDate: startDate || new Date(0),
        maxDate: endDate || new Date(8640000000000000),
        formattedDate: format(value, "MM/dd/yyyy"),
        excludeDates,
        startDateErrorMessage,
        endDateErrorMessage,
        excludeDatesErrorMessage,
      });

      if (validationError) {
        setInputError(validationError);
        return;
      }
      setTempSelectedValue(value);
    }
  };

  const handleConfirmDate = () => {
    const valueToSave = tempSelectedValue ?? null;

    if (!isControlled) {
      setInternalValue(valueToSave);
    }
    onChange?.(valueToSave);

    setInputValue(valueToSave ? format(valueToSave, "MM/dd/yyyy") : "");
    setInputError(
      required && !valueToSave ? error || "This field is required" : ""
    );
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;

    let value = e.target.value;
    setInputError(""); // Clear any previous errors

    // Remove any non-digit characters except for slashes
    value = value.replace(/[^\d/]/g, "");

    // Format as user types: MM/DD/YYYY
    if (value.length === 2 && !value.includes("/")) {
      value += "/";
    } else if (value.length === 5 && value.length > inputValue.length) {
      value += "/";
    }

    // Prevent more than 10 characters (MM/DD/YYYY)
    if (value.length <= 10) {
      setInputValue(value);

      // Try to parse the date if we have enough characters
      if (value.length === 10 && validDateFormat(value)) {
        const parsedDate = parse(value, "MM/dd/yyyy", new Date());
        if (isValid(parsedDate)) {
          const validationError = validateDateInput({
            minDate: startDate || new Date(0),
            maxDate: endDate || new Date(8640000000000000),
            formattedDate: value,
            excludeDates,
            startDateErrorMessage,
            endDateErrorMessage,
            excludeDatesErrorMessage,
          });

          if (validationError) {
            setInputError(validationError);
          } else {
            if (!isControlled) {
              setInternalValue(parsedDate);
            }
            onChange?.(parsedDate);
            setInputError(
              required && !parsedDate ? error || "This field is required" : ""
            );
          }
        }
      }
    }
  };

  return (
    <div className="text-left">
      <div
        className={`rounded-lg border border-gray bg-cream px-2 py-1 text-lg focus:outline-none ${
          inputError ? "border border-red-600" : ""
        } ${className}`}
      >
        {label && (
          <label
            htmlFor={idTextfield || "date-input"}
            className={`block text-xs font-normal text-taupe ${
              inputError ? "text-red-600" : ""
            }`}
          >
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            type="text"
            id={idTextfield || "date-input"}
            name={name}
            className="w-full bg-transparent focus:outline-none text-brown"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            ref={inputRef}
            required={required}
            readOnly={isReadOnly}
          />

          <Popover.Root
            open={open && !isReadOnly}
            onOpenChange={(isOpen) => {
              // Prevent closing when clicking outside
              if (!isOpen) return;
              setOpen(isOpen);
            }}
          >
            <Popover.Trigger asChild>
              <button
                className="absolute -top-1/4 right-3"
                type="button"
                aria-label="Open calendar"
                disabled={isReadOnly}
              >
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className={`h-[20px] w-[17.5px] text-blush ${
                    inputError ? "text-red-600" : ""
                  }`}
                />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="w-[366px] h-[536px] rounded-2xl bg-cream p-6 shadow-lg">
                <Calendar
                  selected={tempSelectedValue || selectedValue || undefined}
                  onSelect={handleCalendarSelect}
                  disabled={disabled}
                  required={required}
                  minDate={startDate}
                  maxDate={endDate}
                  paymentDueDate={paymentDueDate}
                  showOutsideDays={showOutsideDays}
                />
                {/* Legend */}
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
                <p className="text-xs text-taupe">{disclaimer}</p>
                <div className="absolute bottom-6 right-6">
                  <button
                    type="button"
                    className="w-[138px] rounded-md p-4 text-sm font-semibold uppercase text-taupe hover:text-cream hover:bg-blush"
                    onClick={handleConfirmDate}
                  >
                    Select Date
                  </button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        {/* {(startDate || endDate) && !inputError && (
          <div className="mt-1 text-xs text-taupe">
            {startDate && endDate
              ? `Valid date range: ${format(
                  startDate,
                  "MM/dd/yyyy"
                )} - ${format(endDate, "MM/dd/yyyy")}`
              : startDate
              ? `Minimum date: ${format(startDate, "MM/dd/yyyy")}`
              : endDate
              ? `Maximum date: ${format(endDate, "MM/dd/yyyy")}`
              : ""}
          </div>
        )} */}
      </div>
      {helpText && !inputError && (
        <p className="mt-1 ml-1 text-xs text-black">{helpText}</p>
      )}
      {inputError && (
        <p className="text-sm text-red-600 flex items-center gap-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4" />
          {inputError}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
