import { useState, useEffect, useCallback } from "react";
import { format, parse, isValid } from "date-fns";
import * as Popover from "@radix-ui/react-popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Calendar } from "../Calender";
import { DateRange } from "react-day-picker";
import { BaseDatePickerProps, DateConstraints } from "./types";
import {
  DateInput,
  DatePickerLabel,
  DateRangeInfo,
  ErrorMessage,
  CalendarLegend,
} from "./components";

const DATE_FORMAT = "MM/dd/yyyy";

interface DatePickerSingleProps extends BaseDatePickerProps, DateConstraints {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  paymentDueDate?: Date;
}

const useDatePickerSingle = (props: DatePickerSingleProps) => {
  const { value, onChange, minDate, maxDate, errorMessage, required } = props;

  const [internalValue, setInternalValue] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [tempSelectedValue, setTempSelectedValue] = useState<Date | undefined>(
    undefined
  );
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string>("");

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const validateRequired = useCallback(() => {
    if (!required) {
      setError("");
      return;
    }

    if (!selectedValue) {
      setError(errorMessage || "This field is required");
    } else {
      setError("");
    }
  }, [required, selectedValue, errorMessage]);

  const formatSelectedValue = useCallback(() => {
    return selectedValue ? format(selectedValue, DATE_FORMAT) : "";
  }, [selectedValue]);

  useEffect(() => {
    validateRequired();
  }, [validateRequired]);

  useEffect(() => {
    setInputValue(formatSelectedValue());
  }, [formatSelectedValue]);

  const validateDate = (date: Date) => {
    if (minDate && date < minDate) {
      setError(
        errorMessage ||
          `Date must be on or after ${format(minDate, DATE_FORMAT)}`
      );
      return false;
    }
    if (maxDate && date > maxDate) {
      setError(
        errorMessage ||
          `Date must be on or before ${format(maxDate, DATE_FORMAT)}`
      );
      return false;
    }
    return true;
  };

  const handleCalendarSelect = (
    value: Date | DateRange | Date[] | undefined
  ) => {
    if (value instanceof Date || value === undefined) {
      setTempSelectedValue(value);
      setError("");

      if (value instanceof Date) {
        validateDate(value);
      }
    }
  };

  const handleConfirmDate = () => {
    if (tempSelectedValue instanceof Date && validateDate(tempSelectedValue)) {
      if (!isControlled) setInternalValue(tempSelectedValue);
      onChange?.(tempSelectedValue);
      setInputValue(formatSelectedValue());
      setOpen(false);
    } else if (tempSelectedValue === undefined) {
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
      setInputValue("");
      setOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setError("");

    value = value.replace(/[^\d/]/g, "");

    if (value.length === 2 && !inputValue.includes("/")) {
      value += "/";
    } else if (value.length === 5 && inputValue.length === 4) {
      value += "/";
    }

    if (value.length <= 10) {
      setInputValue(value);

      if (value.length === 10) {
        const parsedDate = parse(value, DATE_FORMAT, new Date());
        if (isValid(parsedDate) && validateDate(parsedDate)) {
          if (!isControlled) setInternalValue(parsedDate);
          onChange?.(parsedDate);
        }
      }
    }
  };

  return {
    open,
    setOpen,
    error,
    inputValue,
    selectedValue,
    tempSelectedValue,
    handleCalendarSelect,
    handleConfirmDate,
    handleInputChange,
  };
};

export const DatePickerSingle: React.FC<DatePickerSingleProps> = (props) => {
  const {
    label,
    placeholder,
    disclaimer,
    disabled,
    required,
    paymentDueDate,
    minDate,
    maxDate,
  } = props;

  const {
    open,
    setOpen,
    error,
    inputValue,
    selectedValue,
    tempSelectedValue,
    handleCalendarSelect,
    handleConfirmDate,
    handleInputChange,
  } = useDatePickerSingle(props);

  return (
    <div className="text-left">
      <div
        className={`rounded-lg border border-gray bg-cream px-2 py-1 text-lg focus:outline-none ${
          error ? "border border-red-600" : ""
        }`}
      >
        <DatePickerLabel
          label={label}
          required={required}
          error={!!error}
          htmlFor="date-input"
        />

        <div className="relative">
          <DateInput
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            readOnly={false}
            required={required}
            id="date-input"
          />

          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button
                className="absolute -top-1/4 right-3"
                type="button"
                aria-label="Open calendar"
              >
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className={`h-[20px] w-[17.5px] text-blush ${
                    error ? "text-red-600" : ""
                  }`}
                />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="w-[366px] h-[536px] rounded-2xl bg-cream p-6 shadow-lg">
                <Calendar
                  mode="single"
                  selected={tempSelectedValue || selectedValue || undefined}
                  onSelect={handleCalendarSelect}
                  showOutsideDays={true}
                  disabled={disabled}
                  required={required}
                  paymentDueDate={paymentDueDate}
                  minDate={minDate}
                  maxDate={maxDate}
                />
                <CalendarLegend paymentDueDate={paymentDueDate} />
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

        <DateRangeInfo minDate={minDate} maxDate={maxDate} error={error} />
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
};
