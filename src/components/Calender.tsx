import { DayPicker } from "react-day-picker";

type CalendarProps = {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  classNames?: Record<string, string>;
  showOutsideDays?: boolean;
};

export const Calendar = ({
  classNames = {},
  selected,
  onSelect,
  showOutsideDays = true,

  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      showOutsideDays={showOutsideDays}
      {...props}
      classNames={{
        day: "h-11 w-11 text-brown/70 text-base p-0 font-light aria-selected:opacity-100 hover:bg-gray/20 rounded-sm pointer",
        month_grid: "w-100%",
        month_caption: "text-base text-brown",
        month: "space-y-4 text-center",
        nav: "flex items-center justify-between w-full absolute left-0 right-0 px-6 top-6",
        button_previous:
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-taupe",
        button_next:
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-taupe",
        weekdays: "text-base font-extrabold w-4 h-6 text-brown",
        disabled: "text-gray hover:bg-gray/10",
        hidden: "invisible",
        outside: "opacity-50",
        today: "text-blush font-bold!",
        selected: "bg-blush text-taupe hover:bg-taupe rounded-sm",
        ...classNames,
      }}
    />
  );
};
