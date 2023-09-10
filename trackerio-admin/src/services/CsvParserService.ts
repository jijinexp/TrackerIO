import Papa from "papaparse";

class CsvParserService {
    async parseToCsv(file: File): Promise<Array<Record<string, any>>> {
        return new Promise<Array<Record<string, any>>>((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (result: Papa.ParseResult<Record<string, any>[] | PromiseLike<Record<string, any>[]>>) => {
                    resolve(result.data)
                },
                error: (error) => {
                    reject(error.message);
                },
            });
        });
    }
}

export default new CsvParserService();
