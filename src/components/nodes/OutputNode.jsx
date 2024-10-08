import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

export const OutputNode = ({ id, data }) => {
  const { setNodes, setEdges } = useReactFlow();

  const deleteNode = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    setEdges((prevEdges) =>
      prevEdges.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  const [currOutput, setCurrOutput] = useState();

  const handleNameChange = (e) => {
    setCurrOutput(e.target.value);
  };


  const handleStyle = {
    transform: "translate(-5px, 83px)",
    background: "#fff", // Change handle dot color
    border: "1px solid #7D5AC7", // Change handle border
    width: 10, // Increase the size of the dot (width and height)
    height: 10,
    borderRadius: "50%", // Keep the dot circular
  };

     // Determine the background color based on the error state
     const backgroundColor = {backgroundColor: currOutput ? '#0FA958' : '#666' }

  return (
    <div className="node_box">
      <div className="flex justify-between items-center p-3">
        <div className="node_title_container">
          <Image src="/output.svg" alt="" width={20} height={20} />
          <span className="node_title">Output</span>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#666]" style={backgroundColor}></div>
        <IconButton onClick={deleteNode}>
          <CloseIcon sx={{ fontSize: 15, color: "#6f6c8b" }} />
        </IconButton>
        </div>
      </div>
      <div className="node_tag">Lorem ipsum sic dolar amet </div>
      <div className="node_label_container">
        <label className="node_label">
          Output Response <br />
          <input
            className="node_input"
            type="text"
            value={currOutput}
            placeholder="Type Something.."
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div className="node_handle_container !justify-between">
        <span className="node_handle_title">LLM Engine</span>
        <Handle type="target" position="left" id={`${id}-value`} style={handleStyle} />
      </div>
    </div>
  );
};
