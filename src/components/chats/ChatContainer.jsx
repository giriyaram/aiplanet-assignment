import Image from "next/image";
import { useState } from "react";

const ChatContainer = ({ chats, activeChatId, onSendMessage }) => {
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const [prompt, setPrompt] = useState("");

  const handlePromptChange = (e) => {
    if(prompt.trim()){
        setPrompt('');
    }
  };
  const handleSendMessage = (message) => {
    if (message.trim()) {
      onSendMessage(message);
    }
  };

  return (
    <div className="flex flex-col  flex-1 p-4 h-screen bg-[#FAFAFB]  relative">
      <div className="flex items-center justify-center gap-2  h-16 w-full fixed border-b rounded-t-xl border-[#E3E6EA] bg-white z-20 -mr-4">
        <Image src="/gala_add.png" alt="" width={35} height={35} />
        <h2 className="font-medium text-xl">AI Assistant</h2>
      </div>
      <div className="bg-white p-4 !pt-24 rounded-lg h-full overflow-y-auto">
        <div className="chat-messages">
          {activeChat?.messages.map((message, index) => (
            <div key={index} className={`flex items-start mb-4 `}>
              <div
                className={`p-3 rounded-lg max-w-3xl text-base text-[#444] flex gap-3 ${
                  message.sender === "user" ? "bg-white" : "bg-[#F7F8FA]"
                }`}
              >
                {/* Profile Image */}
                {message.sender !== "user" && (
                  <div className="mr-2 flex-shrink-0">
                    <Image
                      src="/gala_add.png"
                      alt="Bot Profile"
                      width={30}
                      height={30}
                    />
                  </div>
                )}
                {/* Profile Image for User */}
                {message.sender === "user" && (
                  <div className="mr-2 flex-shrink-0">
                    <Image
                      src="/s.svg"
                      alt="User Profile"
                      width={30}
                      height={30}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-5">
                  {message.text}

                  {message.sender !== "user" && (
                    <div className="flex gap-3">
                      <Image src="/Reload.svg" alt="" width={18} height={18} />
                      <Image src="/Copy.svg" alt="" width={18} height={18} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[800px] bg-white shadow-lg fixed bottom-10 flex items-center justify-between p-4 rounded-xl border border-black/5 ">
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Write your message"
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(e.target.value);
                  e.target.value = ""; // Clear the input field
                }
              }}
            />

            <button
              onClick={handlePromptChange} // Handle message send when button clicked
              disabled={!prompt.trim()}
            >
              <Image src="/send.svg" alt="" height={30} width={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
