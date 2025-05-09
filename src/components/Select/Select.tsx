import * as RadixSelect from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import React from "react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helpText?: string;
  name?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  label,
  placeholder = "Select an option",
  disabled = false,
  required = false,
  error,
  helpText,
  name,
  className = "",
}) => {
  const handleValueChange = (val: string) => {
    onChange?.(val);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-brown mb-1">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        name={name}
      >
        <RadixSelect.Trigger
          className={`w-full flex items-center justify-between rounded-md border px-3 py-2 bg-cream text-brown text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blush/50 disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? "border-red-600" : "border-taupe"
          }`}
          aria-invalid={!!error}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="ml-2 text-taupe">
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="radix-select-trigger-width z-50 mt-1 rounded-md bg-cream shadow-lg border border-taupe">
            <RadixSelect.Viewport className="p-1">
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer select-none text-base text-brown hover:bg-blush/10 focus:bg-blush/20 data-[state=checked]:bg-blush/20 data-[disabled]:opacity-40 ${
                    option.disabled ? "cursor-not-allowed" : ""
                  }`}
                >
                  <RadixSelect.ItemIndicator>
                    <CheckIcon className="w-4 h-4 text-blush" />
                  </RadixSelect.ItemIndicator>
                  <RadixSelect.ItemText>
                    {option.label}
                  </RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {helpText && !error && (
        <p className="text-xs text-black mt-1">{helpText}</p>
      )}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default Select;
