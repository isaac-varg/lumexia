
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
                yearGroup.data.push({ x: item.createdAt, y: parseFloat(item.price.toFixed(3)) });
            });
        }

        result.push(yearGroup);
    }

    return result;
}

