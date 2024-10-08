import { useEffect, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { useAppStore, useLLMStore } from "@/store";

export const LLMNode = ({ id, data }) => {
  const { setNodes, setEdges } = useReactFlow();

  const { formData, updateFormData, hasLLMError } = useLLMStore(); 

  // Generic change handler for all fields
  const handleLLMChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value); // Update Zustand store state
  };

  const deleteNode = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    setEdges((prevEdges) =>
      prevEdges.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  const handleSourceStyle = {
    transform: "translate(5px, 245px)",
    background: "#fff", // Change handle dot color
    border: "1px solid #7D5AC7", // Change handle border
    width: 10, // Increase the size of the dot (width and height)
    height: 10,
    borderRadius: "50%", // Keep the dot circular
  };
  const handleTargetStyle = {
    transform: "translate(-5px, 245px)",
    background: "#fff", // Change handle dot color
    border: "1px solid #7D5AC7", // Change handle border
    width: 10, // Increase the size of the dot (width and height)
    height: 10,
    borderRadius: "50%", // Keep the dot circular
  };

  const backgroundColor = {
    backgroundColor: hasLLMError
      ? '#FF5353' // Red if there is an error
      : Object.values(formData).every((field) => field !== '' && field !== null)
      ? '#0FA958' // Green if all fields are filled
      : '#666', // Default #CCC if some fields are missing
  };

  return (
    <div
      className="node_box"
      style={{
        border: `1px solid ${hasLLMError ? "#FF5353" : "#e5e7eb"}`, // Change border color based on error state
      }}
    >
      <div className="flex justify-between items-center p-3">
        <div className="node_title_container">
          <Image src="/llm.svg" alt="" width={20} height={20} />
          <span className="node_title">LLM Engine</span>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <div
            className="w-3 h-3 rounded-full bg-[#666]"
            style={backgroundColor}
          ></div>
          <IconButton onClick={deleteNode}>
            <CloseIcon sx={{ fontSize: 15, color: "#6f6c8b" }} />
          </IconButton>
        </div>
      </div>
      <div className="node_tag">Lorem ipsum sic dolar amet </div>
      <div className="node_label_container">
        <label className="node_label">
          Model Name <br />
          <select
            id="modelSelect"
            name="selectedModel"
            value={formData.selectedModel}
            onChange={handleLLMChange}
            className="node_select"
          >
            <option value="3.5">gpt-3.5</option>
            <option value="4.0">gpt-4.0</option>
            <option value="4.5">gpt-4.5</option>
            <option value="5.0">gpt-5.0</option>
          </select>
        </label>
        <label className="node_label">
          OpenAI API Base <br />
          <input
            className="node_input"
            type="text"
            name="apiLink"
            value={formData.apiLink}
            placeholder="Type Something"
            onChange={handleLLMChange}
          />
        </label>
        <label className="node_label">
          OpenAI API Key <br />
          <input
            className="node_input"
            type="password"
            name="apiKey"
            value={formData.apiKey}
            placeholder="Type Something"
            onChange={handleLLMChange}
          />
        </label>
        <label className="node_label">
          Max Tokens <br />
          <input
            className="node_input"
            type="text"
            name="maxTokens"
            value={formData.maxTokens}
            placeholder="Type Something"
            onChange={handleLLMChange}
          />
        </label>
        <label className="node_label">
          Temparature
          <br />
          <input
            className="node_input"
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleLLMChange}
            onWheel={(e) => {
              e.preventDefault();
            }}
            step="5"
            placeholder="0.5"
          />
        </label>
      </div>
      <div className="node_handle_container !justify-between">
        <div>
          <span className="node_handle_title">Input</span>
          <Handle
            type="target"
            position="left"
            id={`${id}-value`}
            style={handleTargetStyle}
          />
        </div>
        <div>
          <span className="node_handle_title">Output</span>
          <Handle
            type="source"
            position="right"
            id={`${id}-value`}
            style={handleSourceStyle}
          />
        </div>
      </div>
    </div>
  );
};
