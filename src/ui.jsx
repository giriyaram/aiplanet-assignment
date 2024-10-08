"use client";

import { useState, useRef, useCallback } from "react";
import { ReactFlow, Controls, Background, MiniMap } from "@xyflow/react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./components/nodes/InputNode";
import { OutputNode } from "./components/nodes/OutputNode";
import { LLMNode } from "./components/nodes/LLMNode";
import "@xyflow/react/dist/style.css";
import Image from "next/image";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
    {console.log("nodes: ", nodes.length)}
      <div ref={reactFlowWrapper} style={{ width: "100wv", height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background
            color="#0000010"
            gap={gridSize}
            style={{ backgroundColor: "#fafafa" }}
          />

          <Controls style={{marginLeft: "270px"}} />

          {/* hide if screen have any nodes */}
          {!nodes.length && (
            <div className="relative ">
            <div className="absolute h-[82vh] w-screen bg-transparent flex flex-col items-center justify-center z-10">
              <Image src="/drag.svg" alt="" width={78} height={78} />
              <span className="font-medium text-lg pt-10">
                Drag & drop to get started
              </span>
            </div>
          </div>
          )}
        </ReactFlow>
      </div>
    </>
  );
};
