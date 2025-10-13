import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { useState } from "react"

const Import = () => {

  const { qcItemParameters } = useItemSelection()
  const [formatButtonText, setFormatButtonText] = useState('Generate Import Format');
  const generateFormat = () => {

    const examinationTypes = ['In-Proces', 'Finished Product']
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
        value: '<value>',
        inputDefinitions,
      })
    })
    const format = {
      parameterResults,
      "examinationType": `<${examinationTypes.join(", OR ")}>`,
      "lotNumber": "",
    }

    handleCopy(format);
  }



  const handleCopy = async (copy: any) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(copy, null, 4));
      setFormatButtonText('Copied');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    } finally {

      setTimeout(() => setFormatButtonText('Generate Import Format'), 5000)
    }
  };

  return (
    <Card.Root>
      <p className="font-poppins text-lg text-base-content">This is meant to import legacy data into Lumexia. Not as a way to record examinations.</p>

      <button onClick={generateFormat} className="btn btn-secondary"> {formatButtonText} </button>



    </Card.Root>
  )
}

export default Import
