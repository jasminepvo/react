import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select, SelectOption } from "./Select";

const options: SelectOption[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3", disabled: true },
  { label: "Option 4", value: "option4" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered, top",
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: `
A Select component built with [Radix UI Select](https://www.radix-ui.com/primitives/docs/components/select) and Tailwind CSS. Supports accessibility, keyboard navigation, and custom styling.

### Features
- Customizable options
- Controlled and uncontrolled usage
- Error and help text
- Disabled and required states
- Accessible and keyboard-friendly
        `,
      },
    },
  },
  args: {
    options,
    placeholder: "Select an option",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Choose an option",
  },
};

export const WithError: Story = {
  args: {
    label: "Choose an option",
    error: "This field is required.",
  },
};

export const WithHelpText: Story = {
  args: {
    label: "Choose an option",
    helpText: "You can only select one option.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Choose an option",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Choose an option",
    required: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    function ControlledSelect(props: typeof args) {
      const [value, setValue] = useState<string | undefined>("option2");
      return (
        <Select
          {...props}
          value={value}
          onChange={setValue}
          label="Controlled Select"
          helpText={`Current value: ${value}`}
        />
      );
    }
    return <ControlledSelect {...args} />;
  },
};
