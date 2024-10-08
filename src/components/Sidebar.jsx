import { DraggableNode } from "@/DragableNode";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  return (
    <div className="relative z-20">
      <div className="flex flex-col gap-4 absolute w-60 h-[85vh] m-4 p-4 bg-white rounded-2xl">
        <span className="font-medium text-lg ">Components</span>
        <div className="w-full h-[1px] bg-black/20"></div>
        <span className="text-sm text-[#44444450] ">Drag and Drop</span>
        {/* Nodes */}
        <div className="flex flex-col gap-3">
          <DraggableNode
            type="customInput"
            label="Input"
            icon={<Image src="/input.svg" alt="input" width={12} height={12} />}
          />

          <DraggableNode
            type="llm"
            label="LLM Engine"
            icon={<Image src="/llm.svg" alt="input" width={12} height={12} />}
          />

          <DraggableNode
            type="customOutput"
            label="Output"
            icon={<Image src="/output.svg" alt="input" width={12} height={12} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
