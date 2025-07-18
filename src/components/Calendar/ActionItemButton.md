# ActionItemButton Component

The `ActionItemButton` component is now enhanced with a custom hook that automatically detects its context and works seamlessly in both DateField and Calendar usage patterns.

## Features

- **Automatic Context Detection**: The component automatically detects whether it's being used within a DateField or Calendar context
- **Error Handling**: Throws a clear error message if used outside of both contexts
- **Context Prioritization**: DateField context takes precedence over Calendar context
- **Developer-Friendly**: No need to manually specify which context to use

## Usage Patterns

### 1. Within DateField.Calendar

```tsx
<DateField value={date} onDateChange={setDate}>
  <DateField.Input />
  <DateField.Popover>
    <DateField.Trigger />
    <DateField.PopoverPanel>
      <DateField.Calendar>
        {/* ActionItemButton automatically detects DateField context */}
        <Calendar.ActionItemButton onClick={handleSubmit}>
          Submit
        </Calendar.ActionItemButton>
      </DateField.Calendar>
    </DateField.PopoverPanel>
  </DateField.Popover>
</DateField>
```

### 2. Within Standalone Calendar

```tsx
<Calendar selectedDate={selectedDate} onSelectDate={handleSelect}>
  {/* ActionItemButton automatically detects Calendar context */}
  <Calendar.ActionItemButton onClick={handleAction}>
    Custom Action
  </Calendar.ActionItemButton>
</Calendar>
```

## How It Works

The `useActionItemContext` hook:

1. **Checks DateField Context First**: Looks for `DateFieldContext` in the component tree
2. **Falls Back to Calendar Context**: If no DateField context is found, looks for `CalendarContext`
3. **Throws Error**: If neither context is found, throws a descriptive error

```tsx
const { contextType } = useActionItemContext();
// Returns: { contextType: 'dateField' | 'calendar' }
```

## Benefits

- **Single Component**: One button component works in both contexts
- **No Configuration**: No need to pass context-specific props
- **Clear Error Messages**: Helpful error messages when used incorrectly
- **Future-Proof**: Easy to extend with additional context-specific behavior
- **Composition-Friendly**: Follows the composition-first principles

## Error Handling

If the component is used outside of both contexts, it will throw:

```
Error: ActionItemButton must be used within either DateField.Calendar or Calendar component
```

This makes debugging much easier and provides clear guidance to developers.
