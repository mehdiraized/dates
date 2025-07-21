import React, { useState } from "react";
import {
	Container,
	Title,
	Paper,
	Stack,
	Text,
	Code,
	Divider,
} from "@mantine/core";
import { DatePicker } from "@mehdiraized/dates";

function App() {
	const [singleDate, setSingleDate] = useState<string | null>(null);
	const [dateRange, setDateRange] = useState<string[]>([]);

	return (
		<Container size="lg" py="xl">
			<Title order={1} mb="xl" ta="center">
				📅 @mehdiraized/dates Demo
			</Title>

			<Stack gap="xl">
				{/* Single Date Picker */}
				<Paper p="md" withBorder>
					<Title order={3} mb="md">
						انتخاب تاریخ تکی
					</Title>
					<DatePicker
						value={singleDate}
						onChange={setSingleDate}
						placeholder="تاریخ مورد نظر را انتخاب کنید"
						label="تاریخ تولد"
						size="md"
					/>
					<Text size="sm" c="dimmed" mt="xs">
						تاریخ انتخاب شده:{" "}
						<Code>{singleDate || "هیچ تاریخی انتخاب نشده"}</Code>
					</Text>
				</Paper>

				<Divider />

				{/* Date Range Picker */}
				<Paper p="md" withBorder>
					<Title order={3} mb="md">
						انتخاب محدوده تاریخ
					</Title>
					<DatePicker
						type="range"
						value={dateRange}
						onChange={setDateRange}
						placeholder="محدوده تاریخ انتخاب کنید"
						label="محدوده سفر"
						size="md"
					/>
					<Text size="sm" c="dimmed" mt="xs">
						محدوده انتخاب شده:{" "}
						<Code>
							{dateRange.length > 0
								? `${dateRange[0]} تا ${dateRange[1]}`
								: "هیچ محدوده‌ای انتخاب نشده"}
						</Code>
					</Text>
				</Paper>

				<Divider />

				{/* Different Sizes */}
				<Paper p="md" withBorder>
					<Title order={3} mb="md">
						اندازه‌های مختلف
					</Title>
					<Stack gap="md">
						<DatePicker
							value={null}
							onChange={() => {}}
							placeholder="اندازه کوچک"
							size="xs"
						/>
						<DatePicker
							value={null}
							onChange={() => {}}
							placeholder="اندازه متوسط"
							size="md"
						/>
						<DatePicker
							value={null}
							onChange={() => {}}
							placeholder="اندازه بزرگ"
							size="lg"
						/>
					</Stack>
				</Paper>

				<Divider />

				{/* Disabled State */}
				<Paper p="md" withBorder>
					<Title order={3} mb="md">
						حالت غیرفعال
					</Title>
					<DatePicker
						value={null}
						onChange={() => {}}
						placeholder="غیرفعال"
						disabled
						label="تاریخ غیرفعال"
					/>
				</Paper>

				<Divider />

				{/* With Max Date */}
				<Paper p="md" withBorder>
					<Title order={3} mb="md">
						با محدودیت تاریخ
					</Title>
					<DatePicker
						value={null}
						onChange={() => {}}
						placeholder="حداکثر تا امروز"
						label="تاریخ گذشته"
						maxDate={new Date().toISOString().split("T")[0]}
					/>
				</Paper>
			</Stack>
		</Container>
	);
}

export default App;
