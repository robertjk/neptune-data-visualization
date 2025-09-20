import { type ParseResult } from "papaparse";

type ChartData = [number[], number[]];

type CSVFileRow = [number, number];
type DataParseResult = ParseResult<CSVFileRow>;

export { type ChartData, type DataParseResult };
