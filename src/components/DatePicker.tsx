import { useRef, useState } from "react";
import { format } from "date-fns";
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
  // ...add more as needed
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label = "Payment Date",
  placeholder = "MM/DD/YYYY",
  min,
  max,
}) => {
  const [internalDate, setInternalDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const selectedDate = isControlled ? value : internalDate;

  const handleDateChange = (date: Date | undefined) => {
    if (!isControlled) setInternalDate(date || null);
    onChange?.(date || null);
    setOpen(false);
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
            value={selectedDate ? format(selectedDate, "MM/dd/yyyy") : ""}
            placeholder={placeholder}
            readOnly
            ref={inputRef}
            min={min}
            max={max}
          />

          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button
                className="absolute -top-1/r right-3"
                type="button"
                aria-label="Open calendar"
              >
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="h-[20px] w-[20px] text-blush"
                />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="w-[300px] rounded-lg border border-gray bg-cream p-4 shadow-md">
                <Calendar
                  selected={selectedDate || undefined}
                  onSelect={handleDateChange}
                />
                <div className="mt-6 mb-4 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded bg-blush"></span>
                    <span className="text-taupe">Selected payment date</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded border border-gray"></span>
                    <span className="text-taupe">Payment due</span>
                  </div>
                </div>
                <p className="text-xs text-taupe">
                  The payment date is the date of payment. The payment due date
                  is the date of payment.
                </p>
                <div className="sticky bottom-0 bg-cream p-4">
                  <button className="w-full rounded-md bg-blush px-4 py-2 text-cream hover:bg-brown">
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
