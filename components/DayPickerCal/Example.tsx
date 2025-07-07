import DayPickerCal from './DayPickerCal';
import { useState } from 'react';

export function DayPickerExample() {
  const [selected, setSelected] = useState<Date | undefined>();

  return (
    <DayPickerCal mode='single' selected={selected} onSelect={setSelected}>
      <DayPickerCal.Nav />
      <DayPickerCal.MonthCaption />
      <DayPickerCal.Weekdays />
      <DayPickerCal.MonthGrid>
        <DayPickerCal.Weeks>
          <DayPickerCal.Week>
            <DayPickerCal.Day />
          </DayPickerCal.Week>
        </DayPickerCal.Weeks>
      </DayPickerCal.MonthGrid>
      <DayPickerCal.Footer />
    </DayPickerCal>
  );
}
