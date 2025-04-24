import { useRef, useState, useEffect } from "react";
import { format, parse, isValid } from "date-fns";
import * as Popover from "@radix-ui/react-popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Calendar } from "./Calender";

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  disclaimer?: string;
  // ...add more as needed
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = "MM/DD/YYYY",
  min,
  max,
  disclaimer,
}) => {
  const [internalDate, setInternalDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | undefined>(
    undefined
  );
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const selectedDate = isControlled ? value : internalDate;

  // Initialize input value when selected date changes
  useEffect(() => {
    if (selectedDate) {
      setInputValue(format(selectedDate, "MM/dd/yyyy"));
    }
  }, [selectedDate]);

  const handleCalendarSelect = (date: Date | undefined) => {
    setTempSelectedDate(date);
  };

  const handleConfirmDate = () => {
    const dateToSave = tempSelectedDate || null;
    if (!isControlled) setInternalDate(dateToSave);
    onChange?.(dateToSave);

    if (dateToSave) {
      setInputValue(format(dateToSave, "MM/dd/yyyy"));
    }

    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

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
          if (!isControlled) setInternalDate(parsedDate);
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
                  selected={tempSelectedDate || selectedDate || undefined}
                  onSelect={handleCalendarSelect}
                  showOutsideDays={true}
                />
                {/* Legend */}
                <div className="my-6 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded bg-blush"></span>
                    <span className="text-sm">Selected payment date</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded border border-blush"></span>
                    <span className="text-sm">Payment due</span>
                  </div>
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
      </div>
    </div>
  );
};
