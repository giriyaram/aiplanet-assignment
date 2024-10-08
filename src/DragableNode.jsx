"use client";

import Image from "next/image";

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
    <div  
      style={{ padding: '0.5rem 1rem', borderRadius: '8px', borderColor:'#94A3B8', }}
      className=" cursor-grab min-w-[80px] flex gap-3 items-center justify-between rounded-md border border-[#94A3B8] "
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <div className="flex gap-3 items-center justify-start">
        {icon}
        <span className="text-[#6f6c8b] text-sm">{label}</span>
      </div>

      <div>
        <Image src="/more.svg" alt="" width={12} height={12} />
      </div>
    </div>
    </>
  );
};
