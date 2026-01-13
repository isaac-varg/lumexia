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

    // Data preparation
    const fillQuantity = selectedFinishedProduct?.fillQuantity || 0;
    const productFillCostTotal = totalCostPerLb * fillQuantity;
    const auxBreakdown = (selectedFinishedProduct?.auxiliaries as any)?.breakdown || [];
    const auxTotalCost = (selectedFinishedProduct?.auxiliaries as any)?.total || 0;
    const difficultyCost = selectedFinishedProduct?.difficultyAdjustmentCost || 0;
    const shippingCost = selectedFinishedProduct?.freeShippingCost || 0;
    
    // -- Nodes Definition --

    // Layer 1A: Inputs to Product Cost (Top Left)
    const inputNodes: Node[] = [
      {
        id: 'input-base-price',
        position: { x: 0, y: 0 },
        data: { 
          label: (
            <div className="text-xs">
              <div className="font-semibold mb-1">Base Price</div>
              <div>${lastPrice?.pricePerUnit?.toFixed(4) ?? '0.0000'} /lb</div>
            </div>
          )
        },
        sourcePosition: Position.Right,
        style: { minWidth: 120, fontSize: '10px' }
      },
      {
        id: 'input-arrival',
        position: { x: 0, y: 100 },
        data: { 
          label: (
            <div className="text-xs">
              <div className="font-semibold mb-1">Arrival Cost</div>
              <div>${pricingData.arrivalCost?.toFixed(4) ?? '0.0000'} /lb</div>
            </div>
          )
        },
        sourcePosition: Position.Right,
        style: { minWidth: 120, fontSize: '10px' }
      },
      {
        id: 'input-unforeseen',
        position: { x: 0, y: 200 },
        data: { 
          label: (
            <div className="text-xs">
              <div className="font-semibold mb-1">Unforeseen</div>
              <div>${pricingData.unforeseenDifficultiesCost?.toFixed(4) ?? '0.0000'} /lb</div>
            </div>
          )
        },
        sourcePosition: Position.Right,
        style: { minWidth: 120, fontSize: '10px' }
      }
    ];

    // Layer 1B: Auxiliary Inputs (Bottom Left)
    const auxStartTop = 350; 
    const auxSpacing = 100;

    const auxInputNodes: Node[] = auxBreakdown.map((aux: any, index: number) => ({
      id: `aux-${aux.auxiliaryId || index}`,
      position: { x: 0, y: auxStartTop + (index * auxSpacing) },
      data: { 
        label: (
          <div className="text-xs">
            <div className="font-semibold">{aux.name}</div>
            <div>${aux.lineTotal?.toFixed(4)}</div>
          </div>
        )
      },
      sourcePosition: Position.Right,
      style: { minWidth: 140 }
    }));

    // Layer 2: Intermediate Summaries & Other Costs (Middle)
    
    // Node 2A: Product Fill Cost
    const productFillNodeId = 'product-fill-cost';
    const productFillNode: Node = {
      id: productFillNodeId,
      position: { x: 350, y: 100 },
      data: {
        label: (
          <div className="text-left text-xs">
             <div className="font-bold border-b pb-1 mb-1">Product Fill Cost</div>
             <div className="font-semibold text-sm">${productFillCostTotal.toFixed(4)}</div>
             <div className="text-gray-500 mt-1 text-[10px]">
               {fillQuantity} lbs @ ${totalCostPerLb.toFixed(4)}/lb
             </div>
          </div>
        )
      },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      style: { minWidth: 160 }
    };

    // Node 2B: Total Auxiliaries Cost
    const totalAuxNodeId = 'total-aux-cost';
    // Center it vertically based on the aux inputs
    const auxCenterY = auxInputNodes.length > 0 
      ? auxStartTop + ((auxInputNodes.length - 1) * auxSpacing) / 2
      : auxStartTop;

    const totalAuxNode: Node = {
      id: totalAuxNodeId,
      position: { x: 350, y: auxCenterY },
      data: {
        label: (
          <div className="text-left text-xs">
             <div className="font-bold border-b pb-1 mb-1">Total Auxiliaries</div>
             <div className="font-semibold text-sm">${auxTotalCost.toFixed(4)}</div>
          </div>
        )
      },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      style: { minWidth: 140 }
    };

    // Node 2C: Difficulty Adjustment (if exists)
    const difficultyNodeId = 'difficulty-cost';
    // Place below Total Aux
    const difficultyNodeY = auxCenterY + 120;
    const difficultyNode: Node | null = difficultyCost > 0 ? {
      id: difficultyNodeId,
      position: { x: 350, y: difficultyNodeY },
      data: {
        label: (
          <div className="text-left text-xs">
             <div className="font-bold border-b pb-1 mb-1">Difficulty Adj.</div>
             <div className="font-semibold text-sm">${difficultyCost.toFixed(4)}</div>
          </div>
        )
      },
      sourcePosition: Position.Right,
      style: { minWidth: 140 }
    } : null;

    // Node 2D: Free Shipping (if exists)
    const shippingNodeId = 'shipping-cost';
    // Place below Difficulty
    const shippingNodeY = difficultyNodeY + (difficultyNode ? 100 : 0);
    const shippingNode: Node | null = shippingCost > 0 ? {
      id: shippingNodeId,
      position: { x: 350, y: shippingNodeY },
      data: {
        label: (
          <div className="text-left text-xs">
             <div className="font-bold border-b pb-1 mb-1">Free Shipping</div>
             <div className="font-semibold text-sm">${shippingCost.toFixed(4)}</div>
          </div>
        )
      },
      sourcePosition: Position.Right,
      style: { minWidth: 140 }
    } : null;

    // Layer 3: Final Node (Right)
    const filledContainerNodeId = 'filled-container-cost';
    
    // Calculate vertical center of all feeding nodes
    let feedNodesY = [productFillNode.position.y];
    if (auxBreakdown.length > 0) feedNodesY.push(totalAuxNode.position.y);
    if (difficultyNode) feedNodesY.push(difficultyNode.position.y);
    if (shippingNode) feedNodesY.push(shippingNode.position.y);
    
    const finalNodeY = feedNodesY.reduce((a, b) => a + b, 0) / feedNodesY.length;
    
    // Sum of displayed components
    const totalDisplayedCost = productFillCostTotal + auxTotalCost + difficultyCost + shippingCost;

    const filledContainerNode: Node = {
      id: filledContainerNodeId,
      position: { x: 700, y: finalNodeY }, 
      data: { 
        label: (
            <div className="text-xs p-2">
                <div className="font-bold border-b pb-1 mb-1 text-center">Filled Container Cost</div>
                <div className="font-bold text-center text-sm">${totalDisplayedCost.toFixed(4)}</div>
            </div>
        ) 
      },
      targetPosition: Position.Left,
      style: { minWidth: 150 }
    };


    // -- Edges Definition --
    const generatedEdges: Edge[] = [];
    const edgeStyle = { strokeWidth: 2, stroke: '#b1b1b7' };

    // 1. Inputs -> Product Fill Cost
    inputNodes.forEach(node => {
      generatedEdges.push({
        id: `${node.id}-${productFillNodeId}`,
        source: node.id,
        target: productFillNodeId,
        animated: true,
        style: edgeStyle
      });
    });

    // 2. Aux Inputs -> Total Aux Cost
    auxInputNodes.forEach(node => {
      generatedEdges.push({
        id: `${node.id}-${totalAuxNodeId}`,
        source: node.id,
        target: totalAuxNodeId,
        animated: true,
        style: edgeStyle
      });
    });

    // 3. Product Fill Cost -> Filled Container
    generatedEdges.push({
        id: `${productFillNodeId}-${filledContainerNodeId}`,
        source: productFillNodeId,
        target: filledContainerNodeId,
        animated: true,
        style: { strokeWidth: 3, stroke: '#555' }
    });

    // 4. Total Aux Cost -> Filled Container
    if (auxBreakdown.length > 0) {
        generatedEdges.push({
            id: `${totalAuxNodeId}-${filledContainerNodeId}`,
            source: totalAuxNodeId,
            target: filledContainerNodeId,
            animated: true,
            style: { strokeWidth: 3, stroke: '#555' }
        });
    }

    // 5. Difficulty -> Filled Container
    if (difficultyNode) {
        generatedEdges.push({
            id: `${difficultyNodeId}-${filledContainerNodeId}`,
            source: difficultyNodeId,
            target: filledContainerNodeId,
            animated: true,
            style: { strokeWidth: 3, stroke: '#555' }
        });
    }

    // 6. Shipping -> Filled Container
    if (shippingNode) {
        generatedEdges.push({
            id: `${shippingNodeId}-${filledContainerNodeId}`,
            source: shippingNodeId,
            target: filledContainerNodeId,
            animated: true,
            style: { strokeWidth: 3, stroke: '#555' }
        });
    }

    const activeNodes = [...inputNodes, productFillNode];
    if (auxBreakdown.length > 0) {
        activeNodes.push(...auxInputNodes, totalAuxNode);
    }
    if (difficultyNode) activeNodes.push(difficultyNode);
    if (shippingNode) activeNodes.push(shippingNode);
    
    activeNodes.push(filledContainerNode);

    setNodes(activeNodes);
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


