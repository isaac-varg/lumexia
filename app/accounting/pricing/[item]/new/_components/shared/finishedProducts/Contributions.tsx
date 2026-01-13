import { usePricingPurchasedSelection } from "@/store/pricingPurchasedSlice"
import { usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, Position, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect } from "react";

const Contributions = () => {

  const { totalCostPerLb, selectedFinishedProduct, } = usePricingSharedSelection()
  const { pricingData, lastPrice } = usePricingPurchasedSelection()

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (!pricingData) return;

    const xNodeId = 'product-cost';
    const yNodeId = 'bb-node';

    const xNode: Node = {
      id: xNodeId,
      position: { x: 0, y: 0 },
      data: {
        label: (
          <div className="text-left text-xs">
             <div className="font-bold border-b pb-1 mb-1">Product Cost</div>
             <div className="font-semibold">Total: ${totalCostPerLb.toFixed(4)}</div>
             <div className="text-gray-500 mt-1 space-y-0.5">
               <div>Last Price: ${lastPrice?.pricePerUnit?.toFixed(4) ?? 'N/A'}</div>
               <div>Arrival: ${pricingData.arrivalCost?.toFixed(4) ?? '0.0000'}</div>
               <div>Unforeseen: ${pricingData.unforeseenDifficultiesCost?.toFixed(4) ?? '0.0000'}</div>
             </div>
          </div>
        )
      },
      sourcePosition: Position.Right,
      style: { minWidth: 160 }
    };

    const auxBreakdown = (selectedFinishedProduct?.auxiliaries as any)?.breakdown || [];
    const auxStartTop = 150;
    const auxSpacing = 100;

    const yNode: Node = {
      id: yNodeId,
      position: { x: 400, y: auxBreakdown.length > 0 ? (auxStartTop + (auxBreakdown.length - 1) * auxSpacing) / 2 : 50 },
      data: { 
        label: (
            <div className="p-2 font-bold text-center">
                BB
            </div>
        ) 
      },
      targetPosition: Position.Left,
      style: { width: 80 }
    };

    const generatedNodes: Node[] = [xNode, yNode];
    const generatedEdges: Edge[] = [
      { 
        id: `${xNodeId}-${yNodeId}`, 
        source: xNodeId, 
        target: yNodeId, 
        animated: true,
        style: { strokeWidth: 2 } 
      }
    ];

    auxBreakdown.forEach((aux: any, index: number) => {
      const auxNodeId = `aux-${aux.auxiliaryId || index}`;
      generatedNodes.push({
        id: auxNodeId,
        position: { x: 0, y: auxStartTop + (index * auxSpacing) },
        data: { label: aux.name },
        sourcePosition: Position.Right,
        style: { minWidth: 160 }
      });

      generatedEdges.push({
        id: `${auxNodeId}-${yNodeId}`,
        source: auxNodeId,
        target: yNodeId,
        animated: true,
        style: { strokeWidth: 2 }
      });
    });

    setNodes(generatedNodes);
    setEdges(generatedEdges);

  }, [pricingData, selectedFinishedProduct, totalCostPerLb, lastPrice, setNodes, setEdges]);

  return (
    <div className="h-[600px] w-full border rounded-lg overflow-hidden bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ 
            padding: 0.2,
            maxZoom: 1.2
        }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Contributions


