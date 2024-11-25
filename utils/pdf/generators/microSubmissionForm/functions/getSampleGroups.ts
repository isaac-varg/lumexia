import { IMicroFormInputs } from "@/app/quality/micro/new/_components/SampleDesignation";
import { TextUtils } from "@/utils/text";

export const getSampleGroups = (data: IMicroFormInputs): string[][] => {
    const groupSize = 5;
    const items: string[] = [];
    const result: string[][] = [];

    // Flatten the dictionary into a list of items with sequential numbering
    for (const [key, value] of Object.entries(data)) {
        const singularKey = TextUtils.capitalize(TextUtils.singularize(key));
        for (let i = 1; i <= value; i++) {
            items.push(`${singularKey} ${i}`);
        }
    }

    // Group the items into chunks of groupSize
    for (let i = 0; i < items.length; i += groupSize) {
        result.push(items.slice(i, i + groupSize));
    }

    return result;
}
