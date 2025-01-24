import { Button } from "@adobe/react-spectrum";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useState } from "react";
import type { WeatherData } from "../../domain/Weather";
import styles from "./Table.module.css";

interface TableProps {
	data: WeatherData[];
	onPageChange: (start: number, end: number) => void;
	onDataChange: (updatedData: WeatherData) => void;
	onSaveChanges: () => void;
}

const Table: React.FC<TableProps> = ({
	data,
	onPageChange,
	onDataChange,
	onSaveChanges,
}) => {
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

	const columns: ColumnDef<WeatherData>[] = React.useMemo(
		() => [
			{
				header: "Date",
				accessorKey: "date",
			},
			{
				header: "Rainfall (mm)",
				accessorKey: "rainfall",
				cell: ({ getValue, row, column: { id }, table }) => {
					const initialValue = getValue() as number;
					const [value, setValue] = React.useState(initialValue);

					React.useEffect(() => {
						setValue(initialValue);
					}, [initialValue]);

					const onBlur = () => {
						table.options.meta?.updateData(row.original.id, id, value);
					};

					return (
						<input
							value={value}
							onChange={(e) => {
								const newValue = Math.max(0, Number(e.target.value));
								setValue(newValue);
								setHasUnsavedChanges(true);
							}}
							onBlur={onBlur}
							type="number"
							className={styles.tableInput}
							min="0"
						/>
					);
				},
			},
			{
				header: "Temperature (°C)",
				accessorKey: "temperature",
				cell: ({ getValue, row, column: { id }, table }) => {
					const initialValue = getValue() as number;
					const [value, setValue] = React.useState(initialValue);

					React.useEffect(() => {
						setValue(initialValue);
					}, [initialValue]);

					const onBlur = () => {
						table.options.meta?.updateData(row.original.id, id, value);
					};

					return (
						<input
							value={value}
							onChange={(e) => {
								const newValue = Math.max(0, Number(e.target.value));
								setValue(newValue);
								setHasUnsavedChanges(true);
							}}
							onBlur={onBlur}
							type="number"
							className={styles.tableInput}
							min="0"
						/>
					);
				},
			},
		],
		[],
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
		meta: {
			updateData: (id: string, columnId: string, value: number) => {
				const updatedData = data.find((item) => item.id === id);
				if (updatedData) {
					onDataChange({ ...updatedData, [columnId]: value });
				}
			},
		},
	});

	React.useEffect(() => {
		const { pageIndex, pageSize } = table.getState().pagination;
		const start = pageIndex * pageSize;
		const end = start + pageSize;
		onPageChange(start, end);
	}, [table.getState, onPageChange]);

	const handleSaveChanges = useCallback(() => {
		onSaveChanges();
		setHasUnsavedChanges(false);
	}, [onSaveChanges]);

	return (
		<div className={styles.wrapper}>
			<table className={styles.table}>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className={styles.headerCell}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className={styles.dataCell}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<Button
					variant="accent"
					onPress={() => table.previousPage()}
					isDisabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<span>
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</span>
				<Button
					variant="accent"
					onPress={() => table.nextPage()}
					isDisabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
			<div>
				<div>
					<span>Rows per page:</span>
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{[5, 10, 20].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{pageSize}
							</option>
						))}
					</select>
				</div>
				<Button
					variant="accent"
					style="fill"
					onPress={handleSaveChanges}
					isDisabled={!hasUnsavedChanges}
				>
					Save Changes
				</Button>
			</div>
		</div>
	);
};

export default Table;
