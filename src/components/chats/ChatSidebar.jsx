import { useChatStore } from "@/store";
import Image from "next/image";

const ChatSidebar = ({ chats, createNewChat }) => {
  const { activeChatId, setActiveChat } = useChatStore();

  return (
    <div className="flex h-screen">
        <aside className=" w-[296px] !bg-[#FAFAFB] p-4 !pt-8 flex flex-col gap-4 h-full  ">
      <div className="flex gap-3">
        <Image src="/logo.png" alt="logo" width={33} height={33} />
        <span className="font-bold text-lg">OpenAGI</span>
      </div>
{/* button to create a neww chat */}
      <button
        className="mt-4 flex gap-2 justify-center items-center bg-transparent text-black p-2  w-full border border-black rounded-lg"
        onClick={createNewChat}
      >
        <Image src="/plus.svg" alt="" width={15} height={15} />
        Start new chat
      </button>
      <h2 className="font-medium text-xs text-[#666]/50 uppercase tracking-wide my-4">Chat history</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`w-full flex gap-2 text-brand_gray text-sm p-2 rounded hover:bg-gray-300 cursor-pointer ${
              activeChatId === chat.id ? "bg-white !text-black shadow-sm" : ""
            }`}
            onClick={() => setActiveChat(chat.id)}
          >
            <Image src="/message.svg" alt="" width={15} height={15} className={`${activeChatId === chat.id ? " fill-black" : "fill-brand_gray"}`} />
            <span className="block overflow-hidden text-ellipsis whitespace-nowrap">{chat.name}</span>
          </li>
        ))}
      </ul>
      
    </aside>
    </div>
  );
};

export default ChatSidebar;
