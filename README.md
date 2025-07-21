# @mehdiraized/dates

A beautiful Persian (Jalali) date picker component for React with Mantine UI support.

[🌐 **Live Demo & Documentation**](https://mehdiraized.github.io/dates)

[📦 **NPM Package**](https://www.npmjs.com/package/@mehdiraized/dates)

## Features

- 🗓️ Persian (Jalali) calendar support
- 📅 Single date and date range selection
- 🎨 Fully customizable with Tailwind CSS classes
- 📱 Responsive design
- ♿ Accessibility features
- 🎯 TypeScript support
- 🎨 Mantine UI integration

## Quick Start

### Installation

```bash
npm install @mehdiraized/dates
```

### Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-dom @mantine/core @tabler/icons-react dayjs
```

### Basic Usage

```tsx
import { DatePicker } from "@mehdiraized/dates";
import { useState } from "react";

function App() {
	const [date, setDate] = useState<string | null>(null);

	return (
		<DatePicker
			value={date}
			onChange={setDate}
			placeholder="تاریخ انتخاب کنید"
		/>
	);
}
```

### Date Range Selection

```tsx
import { DatePicker } from "@mehdiraized/dates";
import { useState } from "react";

function App() {
	const [dateRange, setDateRange] = useState<string[]>([]);

	return (
		<DatePicker
			type="range"
			value={dateRange}
			onChange={setDateRange}
			placeholder="محدوده تاریخ انتخاب کنید"
		/>
	);
}
```

## Documentation

For complete documentation, examples, and live demos, visit:

**[🌐 Live Documentation](https://mehdiraized.github.io/dates)**

## Props

### DatePickerProps

| Prop          | Type                                   | Default               | Description                            |
| ------------- | -------------------------------------- | --------------------- | -------------------------------------- |
| `onChange`    | `(date: string \| string[]) => void`   | -                     | Callback function when date changes    |
| `value`       | `string \| string[] \| null`           | -                     | Selected date(s)                       |
| `type`        | `'single' \| 'range'`                  | `'single'`            | Type of date selection                 |
| `disabled`    | `boolean`                              | `false`               | Whether the picker is disabled         |
| `label`       | `string`                               | -                     | Label for the input                    |
| `placeholder` | `string`                               | `'تاریخ انتخاب کنید'` | Placeholder text                       |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`                | Size of the picker                     |
| `dir`         | `'rtl' \| 'ltr'`                       | -                     | Text direction                         |
| `className`   | `string`                               | -                     | Additional CSS classes                 |
| `classNames`  | `DatePickerClassNames`                 | -                     | Custom class names for different parts |
| `maxDate`     | `string`                               | -                     | Maximum selectable date                |

## Examples

### With Form Validation

```tsx
import { DatePicker } from "@mehdiraized/dates";
import { useForm } from "@mantine/form";

function App() {
	const form = useForm({
		initialValues: {
			birthDate: "",
		},
		validate: {
			birthDate: (value) => (!value ? "تاریخ تولد الزامی است" : null),
		},
	});

	return (
		<form onSubmit={form.onSubmit(console.log)}>
			<DatePicker
				label="تاریخ تولد"
				placeholder="تاریخ تولد خود را انتخاب کنید"
				value={form.values.birthDate}
				onChange={(value) => form.setFieldValue("birthDate", value as string)}
				error={form.errors.birthDate}
			/>
		</form>
	);
}
```

### Custom Styling

```tsx
import { DatePicker } from "@mehdiraized/dates";

function App() {
	return (
		<DatePicker
			value={date}
			onChange={setDate}
			size="lg"
			classNames={{
				container: "my-custom-container",
				input: "my-custom-input",
				day: "my-custom-day",
				selectedDay: "my-custom-selected-day",
			}}
		/>
	);
}
```

## Date Format

The component accepts and returns dates in ISO format (`YYYY-MM-DD`). Internally, it converts between Gregorian and Jalali calendars.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Mehdi Rezaei](https://github.com/mehdiraized)
