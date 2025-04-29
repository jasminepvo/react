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

interface DatePickerRangeProps extends BaseDatePickerProps, DateConstraints {
  value?: DateRange;
  onChange?: (value: DateRange) => void;
  minRange?: number;
  maxRange?: number;
}

const useDatePickerRange = (props: DatePickerRangeProps) => {
  const {
    value,
    onChange,
    minDate,
    maxDate,
    errorMessage,
    required,
    minRange,
    maxRange,
  } = props;

  const [internalValue, setInternalValue] = useState<DateRange>({});
  const [open, setOpen] = useState(false);
  const [tempSelectedValue, setTempSelectedValue] = useState<
    DateRange | undefined
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

    if (!selectedValue || !selectedValue.from) {
      setError(errorMessage || "A date range is required");
    } else {
      setError("");
    }
  };

  const formatSelectedValue = () => {
    if (!selectedValue || !selectedValue.from) return "";

    const fromStr = format(selectedValue.from, "MM/dd/yyyy");
    if (selectedValue.to) {
      const toStr = format(selectedValue.to, "MM/dd/yyyy");
      return `${fromStr} - ${toStr}`;
    }
    return `${fromStr} - ...`;
  };

  const validateRange = (range: DateRange) => {
    if (!range.from || !range.to) return true;

    const days = Math.ceil(
      (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (minRange && days < minRange) {
      setError(`Range must be at least ${minRange} days`);
      return false;
    }

    if (maxRange && days > maxRange) {
      setError(`Range cannot exceed ${maxRange} days`);
      return false;
    }

    if (minDate && range.from < minDate) {
      setError(
        errorMessage ||
          `Start date must be on or after ${format(minDate, "MM/dd/yyyy")}`
      );
      return false;
    }

    if (maxDate && range.to > maxDate) {
      setError(
        errorMessage ||
          `End date must be on or before ${format(maxDate, "MM/dd/yyyy")}`
      );
      return false;
    }

    return true;
  };

  const handleCalendarSelect = (value: DateRange | undefined) => {
    setTempSelectedValue(value);
    setError("");
  };

  const handleConfirmDate = () => {
    const valueToSave = tempSelectedValue || {};

    if (validateRange(valueToSave)) {
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

export const DatePickerRange: React.FC<DatePickerRangeProps> = (props) => {
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
  } = useDatePickerRange(props);

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
                  mode="range"
                  selected={tempSelectedValue || selectedValue}
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
                    Select Range
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
