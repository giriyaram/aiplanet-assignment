import { useState } from "react";
import { Handle, useReactFlow } from "@xyflow/react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { useAppStore} from "@/store";

  export const InputNode = ({ id }) => {
  const { setNodes, setEdges } = useReactFlow();

  const {setHasInput, hasInputError} = useAppStore();

  const deleteNode = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    setEdges((prevEdges) =>
      prevEdges.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  const [currInput, setcurrInput] = useState();

  const handleInputChange = (e) => {
    setcurrInput(e.target.value);
    if (e.target.value) {
      setHasInput(true);  // Set hasInput to true when input is provided
    } else {
      setHasInput(false); // Set hasInput to false when input is empty
    }
  };

   // Determine the background color based on the error state
   const backgroundColor = {backgroundColor: hasInputError ? '#FF5353' : (currInput ? '#0FA958' : '#666' )}

  const handleStyle = {
    transform: "translate(5px, 83px)",
    background: "#fff", // Change handle dot color
    border: "1px solid #7D5AC7", // Change handle border
    width: 10, // Increase the size of the dot (width and height)
    height: 10,
    borderRadius: "50%", // Keep the dot circular
  };

  return (
    <div className="node_box" style={{
      border: `1px solid ${hasInputError ? '#FF5353' : '#e5e7eb'}`,  // Change border color based on error state
    }}>
      <div className="flex justify-between items-center p-3">
        <div className="node_title_container">
          <Image src="/input.svg" alt="" width={20} height={20} />
          <span className="node_title">Input</span>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#666]" style={backgroundColor}></div>
        <IconButton onClick={deleteNode}>
          <CloseIcon sx={{ fontSize: 15, color: "#6f6c8b" }} />
        </IconButton>
        </div>
      </div>
      <div className="node_tag">Write the input/ question you want to ask</div>
      <div className="node_label_container">
        <label className="node_label">
          Input <br />
          <input
            className="node_input"
            type="text"
            value={currInput}
            placeholder="Type Something.."
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="node_handle_container">
        <span className="node_handle_title">LLM Engine</span>
        <Handle type="source" position="right" id={`${id}-value`} style={handleStyle} />
      </div>
    </div>
  );
};
