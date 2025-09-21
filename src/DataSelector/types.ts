import { type ParseResult } from "papaparse";

type CSVFileRow = [number, number];
type DataParseResult = ParseResult<CSVFileRow>;

export { type DataParseResult };
