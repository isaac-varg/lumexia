"use client";

import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem";
import { ExaminationResults } from "@/app/quality/qc/examination/new/[lotNumber]/_actions/getResults";
import Card from "@/components/Card";
import SectionTitle from "@/components/Text/SectionTitle";
import { useState } from "react";

type Props = {
  itemParameters: QcItemParameter[];
  results: Map<string, ExaminationResults>;
};

const ResultsView = ({ itemParameters, results }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    itemParameters.length > 0 ? itemParameters[0].id : null
  );

  const selected = itemParameters.find((ip) => ip.id === selectedId) || null;
  const selectedResult = selected ? results.get(selected.id) : null;

  return (
    <div className="grid grid-cols-3 gap-y-6 gap-x-12">
      <div className="flex flex-col gap-4">
        <SectionTitle>Parameters</SectionTitle>

        <Card.Root>
          <div className="grid grid-cols-1 gap-2">
            {itemParameters.map((ip) => {
              const isSelected = ip.id === selectedId;
              const hasResult = results.has(ip.id);
              return (
                <button
                  key={ip.id}
                  className={`btn ${isSelected ? "btn-accent" : "btn-secondary btn-outline"} ${hasResult ? "" : "btn-ghost opacity-50"}`}
                  onClick={() => setSelectedId(ip.id)}
                >
                  {ip.parameter.name}
                </button>
              );
            })}
          </div>
        </Card.Root>
      </div>

      <div className="flex flex-col gap-6 col-span-2">
        <SectionTitle>
          {selected?.parameter.name || "Please select a parameter"}
        </SectionTitle>

        <div className="flex flex-col gap-6">
          <Card.Root>
            <SectionTitle size="small">Specification</SectionTitle>

            {(!selected || selected.specifications.length === 0) && (
              <p className="font-medium text-xl text-base-content font-poppins">
                A specification has not yet been set for this product.
              </p>
            )}
          </Card.Root>

          <Card.Root>
            <SectionTitle size="small">Recorded Value</SectionTitle>

            {!selectedResult ? (
              <p className="font-medium text-xl text-base-content/50 font-poppins">
                No result recorded for this parameter.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-poppins text-sm font-medium text-base-content/60 uppercase">
                    {selected?.parameter.name} ({selected?.parameter.uom})
                  </label>
                  <p className="font-poppins text-xl font-medium bg-base-200/40 rounded-xl px-4 py-3">
                    {selectedResult.value}
                  </p>
                </div>

                {selectedResult.parameterInputResults.map((inputResult) => {
                  const inputDef =
                    selected?.parameter.inputDefinitions.find(
                      (def) => def.id === inputResult.parameterInputDefinitionId
                    );
                  return (
                    <div key={inputResult.id} className="flex flex-col gap-1">
                      <label className="font-poppins text-sm font-medium text-base-content/60 uppercase">
                        {inputDef?.name || "Input"}{" "}
                        {inputDef?.unit ? `(${inputDef.unit})` : ""}
                      </label>
                      <p className="font-poppins text-xl font-medium bg-base-200/40 rounded-xl px-4 py-3">
                        {inputResult.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </Card.Root>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
