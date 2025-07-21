import { ActionIcon, Popover, TextInput } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import jalaliday from "jalali-plugin-dayjs";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

dayjs.extend(jalaliday);
dayjs.extend(isBetween);

const isLeapYear = (year: number) => {
	const cycle = year % 33;
	return [1, 5, 9, 13, 17, 22, 26, 30].includes(cycle);
};

const generateDaysInMonth = (year: number, month: number) => {
	if (month <= 6) return 31;
	else if (month <= 11) return 30;
	else return isLeapYear(year) ? 30 : 29;
};

const persianMonths = [
	"فروردین",
	"اردیبهشت",
	"خرداد",
	"تیر",
	"مرداد",
	"شهریور",
	"مهر",
	"آبان",
	"آذر",
	"دی",
	"بهمن",
	"اسفند",
];
const persianWeeks = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export interface DatePickerClassNames {
	container?: string;
	input?: string;
	popup?: string;
	header?: string;
	weeks?: string;
	weekItem?: string;
	days?: string;
	day?: string;
	selectedDay?: string;
	holiday?: string;
	today?: string;
	monthsGrid?: string;
	monthItem?: string;
	selectedMonth?: string;
	yearsGrid?: string;
	yearItem?: string;
	selectedYear?: string;
	arrow?: string;
}

export interface DatePickerProps {
	onChange: (date: string | string[]) => void;
	value: string | string[] | null;
	type?: "single" | "range";
	disabled?: boolean;
	label?: string;
	placeholder?: string;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	dir?: "rtl" | "ltr";
	className?: string;
	classNames?: DatePickerClassNames;
	maxDate?: string;
}

const SizeMap = {
	xs: { base: "text-xs", header: "text-sm" },
	sm: { base: "text-sm", header: "text-base" },
	md: { base: "text-base", header: "text-lg" },
	lg: { base: "text-lg", header: "text-xl" },
	xl: { base: "text-xl", header: "text-2xl" },
};

const DatePicker: React.FC<DatePickerProps> = ({
	onChange,
	value,
	type = "single",
	disabled = false,
	label,
	placeholder = "تاریخ انتخاب کنید",
	size = "md",
	className,
	classNames = {},
	maxDate,
}) => {
	const isRange = type === "range";

	const getInitialDate = () => {
		if (isRange && Array.isArray(value) && value.length === 2) {
			return value[0] ? dayjs(value[0]).calendar("jalali") : null;
		} else if (!isRange && typeof value === "string") {
			return value ? dayjs(value).calendar("jalali") : null;
		}
		return null;
	};

	const initialDate = getInitialDate();

	const [selectedDate, setSelectedDate] = useState<{
		year: number;
		month: number;
		day: number;
	} | null>(
		initialDate
			? {
					year: initialDate.year(),
					month: initialDate.month(),
					day: initialDate.date(),
			  }
			: null
	);

	const [rangeStart, setRangeStart] = useState<{
		year: number;
		month: number;
		day: number;
	} | null>(null);
	const [rangeEnd, setRangeEnd] = useState<{
		year: number;
		month: number;
		day: number;
	} | null>(null);

	const [tempRangeStart, setTempRangeStart] = useState<{
		year: number;
		month: number;
		day: number;
	} | null>(null);
	const [tempRangeEnd, setTempRangeEnd] = useState<{
		year: number;
		month: number;
		day: number;
	} | null>(null);

	// Add hover state for preview
	const [hoveredDate, setHoveredDate] = useState<{
		year: number;
		month: number;
		day: number;
	} | null>(null);

	const getInitialYearAndMonth = () => {
		if (isRange && Array.isArray(value) && value.length === 2 && value[0]) {
			const startDate = dayjs(value[0]).calendar("jalali");
			return {
				year: startDate.year(),
				month: startDate.month() + 1,
			};
		} else if (!isRange && typeof value === "string" && value) {
			const date = dayjs(value).calendar("jalali");
			return {
				year: date.year(),
				month: date.month() + 1,
			};
		} else {
			const today = dayjs().calendar("jalali");
			return {
				year: today.year(),
				month: today.month() + 1,
			};
		}
	};

	const initialYearAndMonth = getInitialYearAndMonth();
	const [currentYear, setCurrentYear] = useState(initialYearAndMonth.year);
	const [currentMonth, setCurrentMonth] = useState(initialYearAndMonth.month);
	const [view, setView] = useState<"day" | "month" | "year">("day");

	useEffect(() => {
		if (isRange && Array.isArray(value) && value.length === 2) {
			if (value[0]) {
				const startDate = dayjs(value[0]).calendar("jalali");
				const startObj = {
					year: startDate.year(),
					month: startDate.month() + 1,
					day: startDate.date(),
				};
				setRangeStart(startObj);
				setTempRangeStart(startObj);
			}
			if (value[1]) {
				const endDate = dayjs(value[1]).calendar("jalali");
				const endObj = {
					year: endDate.year(),
					month: endDate.month() + 1,
					day: endDate.date(),
				};
				setRangeEnd(endObj);
				setTempRangeEnd(endObj);
			}
		}
	}, [value, isRange]);

	useEffect(() => {
		if (!isRange && typeof value === "string") {
			if (value) {
				const date = dayjs(value).calendar("jalali");
				setSelectedDate({
					year: date.year(),
					month: date.month() + 1,
					day: date.date(),
				});
			} else {
				setSelectedDate(null);
			}
		}
	}, [value, isRange]);

	useEffect(() => {
		if (isRange) {
			const start = tempRangeStart || rangeStart;
			if (start) {
				setCurrentYear(start.year);
				setCurrentMonth(start.month);
			} else {
				const today = dayjs().calendar("jalali");
				setCurrentYear(today.year());
				setCurrentMonth(today.month() + 1);
			}
		} else if (selectedDate) {
			setCurrentYear(selectedDate.year);
			setCurrentMonth(selectedDate.month);
		}
	}, [selectedDate, isRange, tempRangeStart, rangeStart]);

	const today = dayjs().calendar("jalali");
	const currentJalaliYear = today.year();
	const currentJalaliMonth = today.month() + 1;
	const currentJalaliDay = today.date();

	const maxJalaliDate = maxDate ? dayjs(maxDate).calendar("jalali") : null;

	const getDisplayText = () => {
		if (isRange) {
			if (Array.isArray(value) && value.length === 2) {
				const start = value[0]
					? dayjs(value[0]).calendar("jalali").format("YYYY/MM/DD")
					: "";
				const end = value[1]
					? dayjs(value[1]).calendar("jalali").format("YYYY/MM/DD")
					: "";
				if (start && end) {
					return `${start} - ${end}`;
				} else if (start) {
					return `${start} - انتخاب کنید`;
				}
			}
			return placeholder;
		} else {
			return selectedDate
				? `${selectedDate.year}/${String(selectedDate.month).padStart(
						2,
						"0"
				  )}/${String(selectedDate.day).padStart(2, "0")}`
				: placeholder;
		}
	};

	const displayedDate = getDisplayText();

	const isHoliday = (year: number, month: number, day: number) => {
		const date = dayjs()
			.calendar("jalali")
			.year(year)
			.month(month - 1)
			.date(day);

		return date.day() === 5;
	};

	const isDateDisabled = (year: number, month: number, day: number) => {
		if (!maxJalaliDate) return false;

		const currentDate = dayjs()
			.calendar("jalali")
			.year(year)
			.month(month - 1)
			.date(day);

		return currentDate.isAfter(maxJalaliDate);
	};

	const isDateInRange = (year: number, month: number, day: number) => {
		if (!isRange) return false;

		const start = tempRangeStart || rangeStart;
		const end = tempRangeEnd || rangeEnd;

		if (!start || !end) return false;

		const currentDate = dayjs()
			.calendar("jalali")
			.year(year)
			.month(month - 1)
			.date(day);

		const startDate = dayjs()
			.calendar("jalali")
			.year(start.year)
			.month(start.month - 1)
			.date(start.day);

		const endDate = dayjs()
			.calendar("jalali")
			.year(end.year)
			.month(end.month - 1)
			.date(end.day);

		return currentDate.isBetween(startDate, endDate, "day", "[]");
	};

	// Add function to check if date is in hover preview range
	const isDateInHoverRange = (year: number, month: number, day: number) => {
		if (!isRange || !tempRangeStart || !hoveredDate) return false;

		const currentDate = dayjs()
			.calendar("jalali")
			.year(year)
			.month(month - 1)
			.date(day);

		const startDate = dayjs()
			.calendar("jalali")
			.year(tempRangeStart.year)
			.month(tempRangeStart.month - 1)
			.date(tempRangeStart.day);

		const hoverDate = dayjs()
			.calendar("jalali")
			.year(hoveredDate.year)
			.month(hoveredDate.month - 1)
			.date(hoveredDate.day);

		// Determine the actual start and end for the hover range
		const actualStart = startDate.isBefore(hoverDate) ? startDate : hoverDate;
		const actualEnd = startDate.isBefore(hoverDate) ? hoverDate : startDate;

		return currentDate.isBetween(actualStart, actualEnd, "day", "[]");
	};

	const isRangeBoundary = (year: number, month: number, day: number) => {
		if (!isRange) return false;

		const start = tempRangeStart || rangeStart;
		const end = tempRangeEnd || rangeEnd;

		if (
			start &&
			year === start.year &&
			month === start.month &&
			day === start.day
		) {
			return "start";
		}
		if (end && year === end.year && month === end.month && day === end.day) {
			return "end";
		}
		return false;
	};

	// Add function to check if date is a hover boundary
	const isHoverBoundary = (year: number, month: number, day: number) => {
		if (!isRange || !tempRangeStart || !hoveredDate) return false;

		if (
			year === tempRangeStart.year &&
			month === tempRangeStart.month &&
			day === tempRangeStart.day
		) {
			return "start";
		}
		if (
			year === hoveredDate.year &&
			month === hoveredDate.month &&
			day === hoveredDate.day
		) {
			return "end";
		}
		return false;
	};

	const getWeekDayOffset = (year: number, month: number) => {
		const jalaliDate = dayjs()
			.calendar("jalali")
			.locale("fa")
			.year(year)
			.month(month - 1)
			.startOf("month")
			.format("dd");

		if (jalaliDate === "ش") {
			return 0;
		} else if (jalaliDate === "ی") {
			return 1;
		} else if (jalaliDate === "د") {
			return 2;
		} else if (jalaliDate === "س") {
			return 3;
		} else if (jalaliDate === "چ") {
			return 4;
		} else if (jalaliDate === "پ") {
			return 5;
		} else if (jalaliDate === "ج") {
			return 6;
		}

		return 0;
	};

	const defaultClasses = {
		container: cn("relative", classNames.container),
		input: cn(SizeMap[size].base, classNames.input),
		popup: cn(
			"absolute mt-1 z-50 rounded-md border border-gray-200 bg-white  shadow-lg ",
			classNames.popup
		),
		header: cn("flex items-center justify-between pb-2", classNames.header),
		weeks: cn("grid grid-cols-7 pb-3", classNames.weeks),
		weekItem: cn(
			"text-center text-sm font-medium text-[#868e96] ",
			classNames.weekItem
		),
		days: cn("grid grid-cols-7 space-y-[1px] space-x-[1px]", classNames.days),
		day: cn(
			"flex h-[36px] w-[36px] items-center justify-center text-sm font-medium transition-colors hover:bg-[#f1f3f5] hover:text-[#495057] cursor-pointer",
			classNames.day
		),
		selectedDay: cn(
			"bg-[#228be6] text-white! hover:bg-[#1c7ed6]",
			classNames.selectedDay
		),
		holiday: cn("text-red-600", classNames.holiday),
		today: cn("border-[#228be6] border-2  rounded-md", classNames.today),
		monthsGrid: cn("grid grid-cols-3 ", classNames.monthsGrid),
		monthItem: cn(
			"rounded-md py-3 text-center text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 cursor-pointer ",
			classNames.monthItem
		),
		selectedMonth: cn(
			"bg-[#228be6] text-white hover:text-white hover:bg-[#1c7ed6] ",
			classNames.selectedMonth
		),
		yearsGrid: cn(
			"grid grid-cols-3 max-h-[300px] overflow-y-auto",
			classNames.yearsGrid
		),
		yearItem: cn(
			"rounded-md py-3 text-center text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 cursor-pointer ",
			classNames.yearItem
		),
		selectedYear: cn(
			"bg-[#228be6] text-white hover:text-white hover:bg-[#1c7ed6] ",
			classNames.selectedYear
		),
		arrow: cn(
			"flex h-[36px] w-[36px] items-center justify-center rounded-md transition-colors hover:bg-[#f1f3f5] hover:text-[#495057] cursor-pointer ",
			classNames.arrow
		),
	};

	const daysInMonth = generateDaysInMonth(currentYear, currentMonth);
	const days = Array.from({ length: daysInMonth }, (_, day) => ({
		year: currentYear,
		month: currentMonth,
		day: day + 1,
	}));

	const weekDayOffset = getWeekDayOffset(currentYear, currentMonth);

	const handleSelectDate = (day: {
		year: number;
		month: number;
		day: number;
	}) => {
		if (isDateDisabled(day.year, day.month, day.day)) {
			return;
		}

		if (isRange) {
			if (!tempRangeStart || (tempRangeStart && tempRangeEnd)) {
				setTempRangeStart(day);
				setTempRangeEnd(null);
				setHoveredDate(null); // Clear hover when selecting first date
			} else {
				const startDate = dayjs()
					.calendar("jalali")
					.year(tempRangeStart.year)
					.month(tempRangeStart.month - 1)
					.date(tempRangeStart.day);

				const endDate = dayjs()
					.calendar("jalali")
					.year(day.year)
					.month(day.month - 1)
					.date(day.day);

				if (startDate.isAfter(endDate)) {
					setTempRangeStart(day);
					setTempRangeEnd(tempRangeStart);
				} else {
					setTempRangeEnd(day);
				}
				setHoveredDate(null); // Clear hover when selection is complete
			}
		} else {
			setSelectedDate(day);
			if (typeof onChange === "function") {
				onChange(
					dayjs()
						.calendar("jalali")
						.year(day.year)
						.month(day.month - 1)
						.date(day.day)
						.calendar("gregory")
						.format("YYYY-MM-DD")
				);
			}
		}
	};

	const handlePopoverClose = () => {
		if (isRange && tempRangeStart && tempRangeEnd) {
			// Check if the dates actually changed
			const startChanged =
				!rangeStart ||
				rangeStart.year !== tempRangeStart.year ||
				rangeStart.month !== tempRangeStart.month ||
				rangeStart.day !== tempRangeStart.day;

			const endChanged =
				!rangeEnd ||
				rangeEnd.year !== tempRangeEnd.year ||
				rangeEnd.month !== tempRangeEnd.month ||
				rangeEnd.day !== tempRangeEnd.day;

			if (startChanged || endChanged) {
				setRangeStart(tempRangeStart);
				setRangeEnd(tempRangeEnd);

				const startDateStr = dayjs()
					.calendar("jalali")
					.year(tempRangeStart.year)
					.month(tempRangeStart.month - 1)
					.date(tempRangeStart.day)
					.calendar("gregory")
					.format("YYYY-MM-DD");

				const endDateStr = dayjs()
					.calendar("jalali")
					.year(tempRangeEnd.year)
					.month(tempRangeEnd.month - 1)
					.date(tempRangeEnd.day)
					.calendar("gregory")
					.format("YYYY-MM-DD");

				if (typeof onChange === "function") {
					onChange([startDateStr, endDateStr]);
				}
			}
		}
		// Clear hover state when closing
		setHoveredDate(null);
	};

	const handleNextMonth = () => {
		if (currentMonth === 12) {
			setCurrentMonth(1);
			setCurrentYear(currentYear + 1);
		} else {
			setCurrentMonth(currentMonth + 1);
		}
	};

	const handlePrevMonth = () => {
		if (currentMonth === 1) {
			setCurrentMonth(12);
			setCurrentYear(currentYear - 1);
		} else {
			setCurrentMonth(currentMonth - 1);
		}
	};

	return (
		<div className={cn(defaultClasses.container, className)}>
			<Popover
				position="bottom"
				withArrow
				width={293}
				offset={2}
				clickOutsideEvents={["mouseup", "touchend"]}
				onClose={handlePopoverClose}
			>
				<Popover.Target>
					<TextInput
						label={label}
						value={displayedDate}
						readOnly
						classNames={{
							input: cn(defaultClasses.input, classNames.input),
						}}
					/>
				</Popover.Target>
				<Popover.Dropdown className={defaultClasses.popup}>
					{!disabled && (
						<>
							<div className={defaultClasses.header}>
								<ActionIcon
									variant="subtle"
									color="black"
									size="lg"
									onClick={handlePrevMonth}
									className={defaultClasses.arrow}
								>
									<IconChevronRight size={16} stroke={1.5} />
								</ActionIcon>
								<div className="flex items-center gap-2">
									<span
										className="cursor-pointer font-medium transition-colors hover:text-[#228be6]"
										onClick={() => setView("month")}
									>
										{persianMonths[currentMonth - 1]}
									</span>
									<span className="text-[#868e96]">/</span>
									<span
										className="cursor-pointer font-medium transition-colors hover:text-[#228be6]"
										onClick={() => setView("year")}
									>
										{currentYear}
									</span>
								</div>
								<ActionIcon
									variant="subtle"
									size="lg"
									color="black"
									onClick={handleNextMonth}
									className={defaultClasses.arrow}
								>
									<IconChevronLeft size={16} stroke={1.5} />
								</ActionIcon>
							</div>
							{view === "day" && (
								<>
									<div className={defaultClasses.weeks}>
										{persianWeeks.map((week) => (
											<div key={week} className={defaultClasses.weekItem}>
												{week}
											</div>
										))}
									</div>
									<div className={defaultClasses.days}>
										{Array.from({ length: weekDayOffset }, (_, i) => (
											<div key={`empty-${i}`} />
										))}
										{days.map((day) => {
											const isDisabled = isDateDisabled(
												day.year,
												day.month,
												day.day
											);
											const inRange = isDateInRange(
												day.year,
												day.month,
												day.day
											);
											const inHoverRange = isDateInHoverRange(
												day.year,
												day.month,
												day.day
											);
											const boundary = isRangeBoundary(
												day.year,
												day.month,
												day.day
											);
											const hoverBoundary = isHoverBoundary(
												day.year,
												day.month,
												day.day
											);
											const isSelected =
												!isRange &&
												selectedDate?.year === day.year &&
												selectedDate?.month === day.month &&
												selectedDate?.day === day.day;

											return (
												<div
													key={`${day.year}-${day.month}-${day.day}`}
													className={cn(
														defaultClasses.day,
														isHoliday(day.year, day.month, day.day)
															? defaultClasses.holiday
															: "",
														isSelected ? defaultClasses.selectedDay : "",
														// Show hover range when hovering and no end date is selected (Mantine style)
														inHoverRange &&
															!tempRangeEnd &&
															!boundary &&
															!hoverBoundary
															? "bg-[#e7f5ff] text-[#1971c2]"
															: "",
														// Show selected range when both dates are selected (Mantine style)
														inRange && !boundary && tempRangeEnd
															? "bg-[#e7f5ff] text-[#1971c2]"
															: "",
														boundary === "start"
															? "rounded-none! rounded-r-md! bg-[#228be6] text-white! hover:bg-[#1c7ed6] hover:text-white!"
															: "",
														boundary === "end"
															? "rounded-none! rounded-l-md! bg-[#228be6] text-white! hover:bg-[#1c7ed6] hover:text-white!"
															: "",
														hoverBoundary === "start"
															? "rounded-none! rounded-r-md! bg-[#339af0]"
															: "",
														hoverBoundary === "end"
															? "rounded-none! rounded-l-md! bg-[#339af0]"
															: "",
														currentJalaliYear === day.year &&
															currentJalaliMonth === day.month &&
															currentJalaliDay === day.day
															? defaultClasses.today
															: "",
														isDisabled
															? "cursor-not-allowed text-gray-300 hover:bg-transparent"
															: ""
													)}
													onClick={() => !isDisabled && handleSelectDate(day)}
													onMouseEnter={() => {
														if (
															isRange &&
															tempRangeStart &&
															!tempRangeEnd &&
															!isDisabled
														) {
															setHoveredDate(day);
														}
													}}
													onMouseLeave={() => {
														if (isRange && !tempRangeEnd) {
															setHoveredDate(null);
														}
													}}
												>
													{day.day}
												</div>
											);
										})}
									</div>
								</>
							)}
							{view === "month" && (
								<div className={defaultClasses.monthsGrid}>
									{persianMonths.map((month, index) => (
										<div
											key={month}
											className={cn(
												defaultClasses.monthItem,
												currentMonth === index + 1
													? defaultClasses.selectedMonth
													: ""
											)}
											onClick={() => {
												setCurrentMonth(index + 1);
												setView("day");
											}}
										>
											{month}
										</div>
									))}
								</div>
							)}
							{view === "year" && (
								<div className={defaultClasses.yearsGrid}>
									{Array.from({ length: 110 }, (_, i) => currentYear - 100 + i)
										.sort((a, b) => b - a)
										.map((year) => (
											<div
												key={year}
												className={cn(
													defaultClasses.yearItem,
													currentYear === year
														? defaultClasses.selectedYear
														: ""
												)}
												onClick={() => {
													setCurrentYear(year);
													setView("month");
												}}
											>
												{year}
											</div>
										))}
								</div>
							)}
						</>
					)}
				</Popover.Dropdown>
			</Popover>
		</div>
	);
};

export default DatePicker;
