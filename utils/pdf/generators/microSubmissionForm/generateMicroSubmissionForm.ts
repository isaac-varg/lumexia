import { IMicroFormInputs } from "@/app/quality/micro/new/_components/SampleDesignation";
import { IBprForSSF } from "@/app/quality/micro/new/_functions/getBprs";
import { getSampleGroups } from "./functions/getSampleGroups";
import { createMicroSubmissionPDF } from "./functions/createMicroSubmissionPDF";
import jsPDF from "jspdf";
import microSubmissionActions from "@/actions/quality/microSubmissionActions";

export const generateMicroSubmissionForm = async (bpr: IBprForSSF, samples: IMicroFormInputs) => {
    const groupedSamples = getSampleGroups(samples);

    let pdf = new jsPDF({
        orientation: "l",
        format: [459, 354.6818],
        unit: "px",
    });

    // Create an array of promises
    const promises = groupedSamples.map(async (group, index) => {
        const submission = await microSubmissionActions.createNew({
            bprId: bpr.bprId,
        });
        const submissionNumber = await submission.submissionNumber;

        await createMicroSubmissionPDF(group, index, bpr, submissionNumber, pdf);
    });

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(promises);

    pdf.save(`SSF.pdf`);
}
