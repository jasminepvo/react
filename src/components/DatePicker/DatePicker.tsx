import { useState, useEffect, useCallback } from "react";
import { format, parse, isValid } from "date-fns";
import * as Popover from "@radix-ui/react-popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Calendar } from "../Calender";
import { Matcher, DateRange } from "react-day-picker";

type SelectionValue = Date | Date[] | DateRange | null;

export interface DatePickerProps {
  mode?: "single" | "multiple" | "range";
  value?: SelectionValue;
  onChange?: (value: SelectionValue) => void;
  label?: string;
  placeholder?: string;
  disclaimer?: string;
  disabled?: Matcher | Matcher[];
  required?: boolean;
  paymentDueDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  errorMessage?: string;
}

interface DateInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly: boolean;
  required?: boolean;
  id: string;
}

const DateInput = ({
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

interface DatePickerLabelProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  htmlFor: string;
}

const DatePickerLabel = ({
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

interface DateRangeInfoProps {
  minDate?: Date;
  maxDate?: Date;
  error?: string;
}

const DateRangeInfo = ({ minDate, maxDate, error }: DateRangeInfoProps) => {
  if ((!minDate && !maxDate) || error) return null;

  return (
    <div className="mt-1 text-xs text-taupe">
      {minDate && maxDate
        ? `Valid date range: ${format(minDate, "MM/dd/yyyy")} - ${format(
            maxDate,
            "MM/dd/yyyy"
          )}`
        : minDate
        ? `Minimum date: ${format(minDate, "MM/dd/yyyy")}`
        : maxDate
        ? `Maximum date: ${format(maxDate, "MM/dd/yyyy")}`
        : ""}
    </div>
  );
};

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="text-sm text-red-600 flex items-center gap-2">
    <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4" />
    {message}
  </p>
);

interface CalendarLegendProps {
  paymentDueDate?: Date;
}

const CalendarLegend = ({ paymentDueDate }: CalendarLegendProps) => (
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

const useDatePickerState = (props: DatePickerProps) => {
  const { value, mode, onChange, minDate, maxDate, errorMessage, required } =
    props;

  const [internalValue, setInternalValue] = useState<SelectionValue>(null);
  const [open, setOpen] = useState(false);
  const [tempSelectedValue, setTempSelectedValue] = useState<
    Date | Date[] | DateRange | undefined
  >(undefined);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string>("");

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const validateRequired = useCallback(() => {
    if (!required) {
      setError("");
      return;
    }

    if (mode === "single" && !selectedValue) {
      setError(errorMessage || "This field is required");
    } else if (
      mode === "multiple" &&
      (!selectedValue || (selectedValue as Date[]).length === 0)
    ) {
      setError(errorMessage || "At least one date is required");
    } else if (
      mode === "range" &&
      (!selectedValue || !(selectedValue as DateRange).from)
    ) {
      setError(errorMessage || "A date range is required");
    } else {
      setError("");
    }
  }, [required, selectedValue, mode, errorMessage, setError]);

  useEffect(() => {
    validateRequired();
  }, [validateRequired]);

  const formatSelectedValue = useCallback(() => {
    if (!selectedValue) return "";

    if (mode === "single" && selectedValue instanceof Date) {
      return format(selectedValue, "MM/dd/yyyy");
    } else if (mode === "multiple" && Array.isArray(selectedValue)) {
      return selectedValue.length > 0
        ? `${selectedValue.length} dates selected`
        : "";
    } else if (
      mode === "range" &&
      selectedValue &&
      typeof selectedValue === "object" &&
      "from" in selectedValue
    ) {
      if (selectedValue.from) {
        const fromStr = format(selectedValue.from, "MM/dd/yyyy");
        if (selectedValue.to) {
          const toStr = format(selectedValue.to, "MM/dd/yyyy");
          return `${fromStr} - ${toStr}`;
        }
        return `${fromStr} - ...`;
      }
    }
    return "";
  }, [selectedValue, mode]);

  useEffect(() => {
    setInputValue(formatSelectedValue());
  }, [formatSelectedValue]);

  const validateDate = (date: Date) => {
    if (minDate && date < minDate) {
      setError(
        errorMessage ||
          `Date must be on or after ${format(minDate, "MM/dd/yyyy")}`
      );
      return false;
    }
    if (maxDate && date > maxDate) {
      setError(
        errorMessage ||
          `Date must be on or before ${format(maxDate, "MM/dd/yyyy")}`
      );
      return false;
    }
    return true;
  };

  const handleCalendarSelect = (
    value: Date | Date[] | DateRange | undefined
  ) => {
    setTempSelectedValue(value);
    setError("");

    if (mode === "single" && value instanceof Date) {
      if (validateDate(value)) {
        handleConfirmDate();
      }
    }
  };

  const handleConfirmDate = () => {
    const valueToSave =
      tempSelectedValue === undefined ? null : tempSelectedValue;

    if (!isControlled) setInternalValue(valueToSave as SelectionValue);
    onChange?.(valueToSave as SelectionValue);
    setInputValue(formatSelectedValue());
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setError("");

    if (mode !== "single") return;

    value = value.replace(/[^\d/]/g, "");

    if (value.length === 2 && !inputValue.includes("/")) {
      value += "/";
    } else if (value.length === 5 && inputValue.length === 4) {
      value += "/";
    }

    if (value.length <= 10) {
      setInputValue(value);

      if (value.length === 10) {
        const parsedDate = parse(value, "MM/dd/yyyy", new Date());
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

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    mode = "single",
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
  } = useDatePickerState(props);

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
            readOnly={mode !== "single"}
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
                  mode={mode}
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
                    {mode === "multiple"
                      ? "s"
                      : mode === "range"
                      ? " Range"
                      : ""}
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
