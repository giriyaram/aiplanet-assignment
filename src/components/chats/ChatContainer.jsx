import Image from "next/image";
import { useState } from "react";

const ChatContainer = ({ chats, activeChatId, onSendMessage }) => {
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const [prompt, setPrompt] = useState("");

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };
  const handleSendMessage = (message) => {
    if (message.trim()) {
      onSendMessage(message);
    }
  };

  return (
    <div className="flex flex-col  flex-1 p-4 h-screen bg-[#FAFAFB]  relative">
      <div className="flex items-center justify-center gap-2  h-16 w-full fixed border-b border-[#E3E6EA] bg-white z-20 -mr-4">
        <Image src="/gala_add.png" alt="" width={35} height={35} />
        <h2 className="font-medium text-xl">AI Assistant</h2>
      </div>
      <div className="bg-white p-4 !pt-24 rounded-lg h-full overflow-y-auto">
        <div className="chat-messages">
          {activeChat?.messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[800px] bg-white shadow-lg fixed bottom-10 flex items-center justify-between p-4 rounded-xl border border-black/5 ">
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Write your message"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(e.target.value);
                  e.target.value = ""; // Clear the input field
                }
              }}
            />

            <button onClick={handleSendMessage(prompt)}>
              <Image src="/send.svg" alt="" height={30} width={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
