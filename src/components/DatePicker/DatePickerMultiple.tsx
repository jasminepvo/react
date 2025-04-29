import { useState, useEffect } from "react";
import { format } from "date-fns";
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
} from "./components";

interface DatePickerMultipleProps extends BaseDatePickerProps, DateConstraints {
  value?: Date[];
  onChange?: (value: Date[]) => void;
  maxDates?: number;
}

const useDatePickerMultiple = (props: DatePickerMultipleProps) => {
  const {
    value,
    onChange,
    minDate,
    maxDate,
    errorMessage,
    required,
    maxDates,
  } = props;

  const [internalValue, setInternalValue] = useState<Date[]>([]);
  const [open, setOpen] = useState(false);
  const [tempSelectedValue, setTempSelectedValue] = useState<
    Date[] | undefined
  >(undefined);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string>("");

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  useEffect(() => {
    validateRequired();
  }, [required, selectedValue]);

  useEffect(() => {
    setInputValue(formatSelectedValue());
  }, [selectedValue]);

  const validateRequired = () => {
    if (!required) {
      setError("");
      return;
    }

    if (!selectedValue || selectedValue.length === 0) {
      setError(errorMessage || "At least one date is required");
    } else {
      setError("");
    }
  };

  const formatSelectedValue = () => {
    return selectedValue && selectedValue.length > 0
      ? `${selectedValue.length} dates selected`
      : "";
  };

  const validateDates = (dates: Date[]) => {
    if (maxDates && dates.length > maxDates) {
      setError(`Maximum ${maxDates} dates can be selected`);
      return false;
    }

    if (minDate && dates.some((date) => date < minDate)) {
      setError(
        errorMessage ||
          `All dates must be on or after ${format(minDate, "MM/dd/yyyy")}`
      );
      return false;
    }
    if (maxDate && dates.some((date) => date > maxDate)) {
      setError(
        errorMessage ||
          `All dates must be on or before ${format(maxDate, "MM/dd/yyyy")}`
      );
      return false;
    }
    return true;
  };

  const handleCalendarSelect = (
    value: Date | Date[] | DateRange | undefined
  ) => {
    setTempSelectedValue(Array.isArray(value) ? value : undefined);
    setError("");
  };

  const handleConfirmDate = () => {
    const valueToSave = tempSelectedValue || [];

    if (validateDates(valueToSave)) {
      if (!isControlled) setInternalValue(valueToSave);
      onChange?.(valueToSave);
      setInputValue(formatSelectedValue());
      setOpen(false);
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
  };
};

export const DatePickerMultiple: React.FC<DatePickerMultipleProps> = (
  props
) => {
  const {
    label,
    placeholder,
    disclaimer,
    disabled,
    required,
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
  } = useDatePickerMultiple(props);

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
            onChange={() => {}}
            placeholder={placeholder}
            readOnly={true}
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
                  mode="multiple"
                  selected={tempSelectedValue || selectedValue || undefined}
                  onSelect={handleCalendarSelect}
                  showOutsideDays={true}
                  disabled={disabled}
                  required={required}
                  minDate={minDate}
                  maxDate={maxDate}
                />
                <p className="text-xs text-taupe">{disclaimer}</p>
                <div className="absolute bottom-6 right-6">
                  <button
                    type="button"
                    className="w-[138px] rounded-md p-4 text-sm font-semibold uppercase text-taupe hover:text-cream hover:bg-blush"
                    onClick={handleConfirmDate}
                  >
                    Select Dates
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
