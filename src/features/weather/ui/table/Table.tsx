import { Button } from "@adobe/react-spectrum";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import type { WeatherData } from "../../domain/Weather";
import styles from "./Table.module.css";

interface TableProps {
	data: WeatherData[];
	onPageChange: (start: number, end: number) => void;
	onDataChange: (updatedData: WeatherData) => void;
}

const Table: React.FC<TableProps> = ({ data, onPageChange, onDataChange }) => {
	const columns: ColumnDef<WeatherData>[] = React.useMemo(
		() => [
			{
				header: "Date",
				accessorKey: "date",
			},
			{
				header: "Rainfall (mm)",
				accessorKey: "rainfall",
				cell: ({ getValue, row, column: { id } }) => {
					const initialValue = getValue() as number;
					const [value, setValue] = React.useState(initialValue);

					React.useEffect(() => {
						setValue(initialValue);
					}, [initialValue]);

					const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
						const newValue = Math.max(0, Number(e.target.value));
						setValue(newValue);

						onDataChange({ ...row.original, [id]: newValue });
					};

					return (
						<input value={value} onChange={onChange} type="number" min="0" />
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

					const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
						const newValue = Math.max(0, Number(e.target.value));
						setValue(newValue);

						onDataChange({ ...row.original, [id]: newValue });
					};

					return (
						<input value={value} onChange={onChange} type="number" min="0" />
					);
				},
			},
		],
		[onDataChange],
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
	});

	useEffect(() => {
		const { pageIndex, pageSize } = table.getState().pagination;
		const start = pageIndex * pageSize;
		const end = start + pageSize;
		onPageChange(start, end);
	}, [onPageChange, table.getState]);

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
			</div>
		</div>
	);
};

export default Table;
