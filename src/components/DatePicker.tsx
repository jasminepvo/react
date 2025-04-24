import { useRef, useState, useEffect } from "react";
import { format, parse, isValid } from "date-fns";
import * as Popover from "@radix-ui/react-popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Calendar } from "./Calender";
import { Matcher, DateRange } from "react-day-picker";

type SelectionValue = Date | Date[] | DateRange | null;

export interface DatePickerProps {
  mode?: "single" | "multiple" | "range";
  value?: SelectionValue;
  onChange?: (value: SelectionValue) => void;
  label?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  disclaimer?: string;
  disabled?: Matcher | Matcher[];
  required?: boolean;
  paymentDueDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  mode = "single",
  value,
  onChange,
  label,
  placeholder = "MM/DD/YYYY",
  min,
  max,
  disclaimer,
  disabled,
  required,
  paymentDueDate,
}) => {
  const [internalValue, setInternalValue] = useState<SelectionValue>(null);
  const [open, setOpen] = useState(false);
  const [tempSelectedValue, setTempSelectedValue] = useState<
    Date | Date[] | DateRange | undefined
  >(undefined);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  // Format for display
  const formatSelectedValue = () => {
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
  };

  // Initialize input value when selected date changes
  useEffect(() => {
    setInputValue(formatSelectedValue());
  }, [selectedValue]);

  const handleCalendarSelect = (
    value: Date | Date[] | DateRange | undefined
  ) => {
    setTempSelectedValue(value);

    // For single mode, we can also auto-confirm
    if (mode === "single" && value instanceof Date) {
      handleConfirmDate();
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

    if (mode !== "single") {
      // For multiple and range, just show the text field as read-only
      return;
    }

    // Remove any non-digit characters except for slashes
    value = value.replace(/[^\d/]/g, "");

    // Format as user types: MM/DD/YYYY
    if (value.length === 2 && !inputValue.includes("/")) {
      value += "/";
    } else if (value.length === 5 && inputValue.length === 4) {
      value += "/";
    }

    // Prevent more than 10 characters (MM/DD/YYYY)
    if (value.length <= 10) {
      setInputValue(value);

      // Try to parse the date if we have enough characters
      if (value.length === 10) {
        const parsedDate = parse(value, "MM/dd/yyyy", new Date());
        if (isValid(parsedDate)) {
          if (!isControlled) setInternalValue(parsedDate);
          onChange?.(parsedDate);
        }
      }
    }
  };

  return (
    <div className="text-left">
      <div className="rounded-lg border border-gray bg-cream px-2 py-1 text-lg focus:outline-none">
        {label && (
          <label
            htmlFor="date-input"
            className="block text-xs font-normal text-taupe"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type="text"
            id="date-input"
            className="w-full bg-transparent focus:outline-none text-brown"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            ref={inputRef}
            min={min}
            max={max}
            readOnly={mode !== "single"}
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
                  className="h-[20px] w-[17.5px] text-blush"
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
      </div>
    </div>
  );
};
