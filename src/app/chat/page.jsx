"use client";

import ChatContainer from '@/components/chats/ChatContainer';
import ChatSidebar from '@/components/chats/ChatSidebar';
import { useChatStore } from '@/store';
import React from 'react';


const ChatPage = () => {
  const { chats, activeChatId, createNewChat, sendMessage } = useChatStore();

  return (
    <div className="h-screen flex">
      <ChatSidebar 
        chats={chats} 
        activeChatId={activeChatId} 
        createNewChat={createNewChat}
      />
      <ChatContainer 
        chats={chats} 
        activeChatId={activeChatId} 
        onSendMessage={sendMessage} 
      />
    </div>
  );
};

export default ChatPage;
