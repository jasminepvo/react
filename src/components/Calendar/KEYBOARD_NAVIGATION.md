# Calendar Keyboard Navigation

The Calendar component now supports full keyboard navigation, making it accessible to users who rely on keyboard input and screen readers.

## Supported Keys

### Navigation Keys

- **Arrow Keys (← → ↑ ↓)**: Navigate between dates in the calendar grid
  - Left/Right: Move between days in the same week
  - Up/Down: Move between weeks (same day of week)
- **Home**: Jump to the first date in the current month view
- **End**: Jump to the last date in the current month view

### Action Keys

- **Enter** or **Space**: Select the currently focused date
- **Escape**: Close the calendar popover (when used within DateField)
- **Tab**: Navigate between interactive elements (navigation buttons, selects, etc.)

## Implementation Details

### Focus Management

The Calendar component automatically manages focus:

1. **Initial Focus**: When the calendar opens, the first date in the current month view is focused
2. **Focus Tracking**: The component tracks which date is currently focused using the `focusedDate` state
3. **Visual Indicators**: The focused date is highlighted with a distinct background color
4. **Tab Index**: Only the focused date has `tabIndex={0}`, all others have `tabIndex={-1}`

### Keyboard Event Handling

Keyboard events are handled at the Calendar context level and passed down to individual date buttons:

```tsx
const handleKeyDown = useCallback(
  (event: React.KeyboardEvent, currentDate: Date) => {
    // Navigation logic for arrow keys, Home, End
    // Action logic for Enter, Space, Escape
  },
  [dependencies]
);
```

### Accessibility Features

- **ARIA Labels**: Each date button has descriptive ARIA labels
- **ARIA Roles**: Proper grid roles for screen reader compatibility
- **ARIA Selected**: Selected dates are marked with `aria-selected="true"`
- **Focus Indicators**: High contrast visual focus indicators
- **Keyboard Only**: Full functionality available without mouse

## Usage Examples

### Standalone Calendar

```tsx
<Calendar
  selectedDate={selectedDate}
  onSelectDate={setSelectedDate}
  defaultMonth={new Date()}
>
  <Calendar.Grid>
    <Calendar.GridHeader />
    <Calendar.GridBody />
  </Calendar.Grid>
</Calendar>
```

### DateField with Calendar Popup

```tsx
<DateField value={date} onDateChange={setDate}>
  <DateField.Input />
  <DateField.Popover>
    <DateField.Trigger />
    <DateField.PopoverPanel>
      <DateField.Calendar>
        <Calendar.Grid>
          <Calendar.GridHeader />
          <Calendar.GridBody />
        </Calendar.Grid>
      </DateField.Calendar>
    </DateField.PopoverPanel>
  </DateField.Popover>
</DateField>
```

## Testing

The keyboard navigation functionality is thoroughly tested with:

- Unit tests for all keyboard interactions
- Focus management tests
- Accessibility compliance tests
- Cross-browser compatibility tests

Run the tests with:

```bash
npm test CalendarKeyboardNavigation
```

## Browser Support

Keyboard navigation is supported in all modern browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## WCAG Compliance

The implementation follows WCAG 2.1 AA guidelines:

- **2.1.1 Keyboard**: All functionality is available from a keyboard
- **2.4.3 Focus Order**: Focus order follows a logical sequence
- **2.4.7 Focus Visible**: Focus indicators are clearly visible
- **4.1.2 Name, Role, Value**: All interactive elements have proper ARIA attributes

## Future Enhancements

Planned improvements include:

- **Page Up/Down**: Navigate between months
- **Ctrl + Arrow Keys**: Navigate between months
- **Custom Keyboard Shortcuts**: Configurable keyboard mappings
- **Voice Navigation**: Enhanced screen reader support
