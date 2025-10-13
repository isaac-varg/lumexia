import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { useState } from "react"
import { importQcRecords } from "@/actions/quality/qc/records/import"
import Alert from "@/components/Alert"
import useDialog from "@/hooks/useDialog"

const Import = () => {
  const { qcItemParameters } = useItemSelection()
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const { showDialog, resetDialogContext } = useDialog()
  const [errorContent, setErrorContent] = useState('');

  const generateFormat = () => {
    const examinationTypes = ['In-Process', 'Finished Product', 'Dry']
    const parameterResults = qcItemParameters.map(ip => {
      const inputDefinitions = ip.parameter.inputDefinitions.map(id => {
        return ({
          id: id.id,
          name: id.name,
          required: id.required,
          value: '<value>',
        })
      });

      return ({
        parameterId: ip.parameter.id,
        parameterName: ip.parameter.name,
        itemParameterId: ip.id,
        value: '<value>',
        inputDefinitions,
      })
    })
    const format = [{
      "lotNumber": '<lotNumber>',
      "examinationType": `<${examinationTypes.join(" OR ")}>`,
      parameterResults,
    }]

    const jsonString = JSON.stringify(format, null, 4);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qc_import_format.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const handleImport = async () => {

    try {
      setIsImporting(true);
      const data = JSON.parse(importData);
      const result = await importQcRecords(data);
      if (result.success) {
        setImportData('');
      } else {
        showDialog('importQualityError')
        setErrorContent(result.message)
      }
    } catch (error) {
      showDialog('importQualityError')
      setErrorContent(error as string);
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <Card.Root>
      <Alert.Root identifier='importQualityError'>
        <Alert.Content
          title="Import Failed"
          action={() => resetDialogContext()}
          actionLabel="Close"
          actionColor="warning"
        >
          {errorContent}
        </Alert.Content>
      </Alert.Root>

      <p className="font-poppins text-lg text-base-content">This is meant to import legacy data into Lumexia. Not as a way to record examinations.</p>
      <p className="font-poppins text-lg text-base-content">First, generate the input format using the button below. Then populate your import data using this schema. Finally, paste into the import field and click import. Errors will appear in console.</p>


      <div className="flex gap-2">
        <button onClick={generateFormat} className="btn btn-secondary"> Generate Import Format </button>
      </div>
      <div className="form-control">
        <label className="label">
        </label>
        <textarea
          className="textarea w-full textarea-bordered h-64"
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          placeholder="Paste your JSON array here..."
        />
      </div>
      <button
        onClick={handleImport}
        className="btn btn-primary"
        disabled={isImporting || !importData}
      >
        {isImporting ? 'Importing...' : 'Import'}
      </button>
    </Card.Root>
  )
}

export default Import
