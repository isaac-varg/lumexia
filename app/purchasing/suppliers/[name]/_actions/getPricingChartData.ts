import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { DateTime } from "luxon";

interface DataItem {
    price: number  
    createdAt: Date;
}

interface InputData {
    [year: string]: {
        [month: string]: DataItem[];
    };
}

interface TransformedDataItem {
    x: Date;
    y: number;
}

interface YearGroup {
    name: any;
    data: TransformedDataItem[];
}

export const getPricingChartData  = (input: InputData): YearGroup[] => {
    const result: YearGroup[] = [];

    for (const year in input) {
        const yearGroup: YearGroup = { name: year, data: [] };

        for (const month in input[year]) {
            input[year][month].forEach(item => {
                yearGroup.data.push({ x:DateTime.fromJSDate(item.createdAt).toFormat("DD") as any, y: parseFloat(toFracitonalDigits.curreny(item.price)) });
            });
        }

        result.push(yearGroup);
    }

    return result;
}

