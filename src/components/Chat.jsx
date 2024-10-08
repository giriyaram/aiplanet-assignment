"use client";
import { useChatIconStore } from '@/store';
import Image from 'next/image'
import React from 'react'


const Chat = () => {
  const chatEnabled = useChatIconStore((state) => state.isChatEnabled);
  return (
    <div className='relative'>
      <div className='fixed bottom-4 right-4 h-32 w-32 bg-transparent flex items-center justify-center z-10'>
        <button
          disabled={!chatEnabled}
          onClick={() => chatEnabled && window.open('/chat', '_blank')}
          style={{
            cursor: chatEnabled ? 'pointer' : 'not-allowed',
            opacity: chatEnabled ? 1 : 0.5,
          }}
          className='focus:outline-none'
        >
          <Image src="/chat.svg" alt="Chat" width={50} height={50} />
        </button>
      </div>
    </div>
  );
};

export default Chat