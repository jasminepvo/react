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
                  selected={selectedDate || undefined}
                  onSelect={handleDateChange}
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
                <p className="text-xs text-taupe">
                  In order for your payment to be credited today, please select today's date as the payment date and submit your payment before 11:59 PM EST. Please note that payments received after 11:59 PM EST will be credited the next business day.
                </p>
                <div className="absolute bottom-6 right-6">
                  <button type="button" className="w-[138px] rounded-md p-4 text-sm font-semibold uppercase text-taupe hover:text-cream hover:bg-blush">
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
