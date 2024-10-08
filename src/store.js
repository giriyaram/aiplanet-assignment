// store.js

import { createWithEqualityFn } from "zustand/traditional";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "@xyflow/react";

export const useChatStore = createWithEqualityFn((set) => ({
  chats: [
    { id: 1, name: "Create 10 poems for a scenar..", messages: [] },
    { id: 2, name: "Generate a poem on designin..", messages: [] },
    { id: 3, name: "Create 5 liner poem", messages: [] },
  ],
  activeChatId: 1, // Default to the first chat
  chatCount: 3, // To track the number of chats

  // Action to create a new chat
  createNewChat: () => {
    set((state) => {
      const newChatId = state.chatCount + 1;
      const newChat = {
        id: newChatId,
        name: `New Conversation ${newChatId}`,
        messages: [],
      };
      return {
        chats: [...state.chats, newChat],
        activeChatId: newChatId,
        chatCount: newChatId,
      };
    });
  },

  // Action to set the active chat
  setActiveChat: (chatId) => set({ activeChatId: chatId }),

  // Action to send a message in the active chat
  sendMessage: (message) =>
    set((state) => {
      const botResponse = "This is a response from the bot `The sun peeks, golden, bright, Over mountains, bathed in light. Sleepy clouds, in hues of rose, Slowly wake, as morning grows. Dewdrops gleam on grass so green, Birdsong fills the air, serene. A gentle breeze, a whispered sigh, As nature wakes beneath the sky. Hopeful heart, with joy you soar, A brand new day, to live once more.`"; // Mock bot response
      return {
        chats: state.chats.map((chat) =>
          chat.id === state.activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { text: message, sender: "user" },
                  { text: botResponse, sender: "bot" },
                ],
              }
            : chat
        ),
      };
    }),
}));

export const useChatIconStore = createWithEqualityFn((set) => ({
  isChatEnabled: false,
  setChatEnabled: (value) => set({ isChatEnabled: value }),
}));

export const useLLMStore = createWithEqualityFn((set) => ({
  formData: {
    selectedModel: "3.5",
    apiLink: "",
    apiKey: "",
    maxTokens: "",
    temperature: 0.5,
  },
  hasLLMError: false,
  setLLMError: (value) => set({ hasLLMError: value }),

  // Update individual fields
  updateFormData: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  // Validation function
  validateForm: () => {
    set((state) => {
      const allFieldsFilled = Object.values(state.formData).every(
        (field) => field !== ""
      );
      return { hasLLMError: !allFieldsFilled };
    });
  },
}));

export const useAppStore = createWithEqualityFn((set) => ({
  // Input Node Fields
  hasInput: false, // Initially, no input
  setHasInput: (value) => set({ hasInput: value }),

  // Input Node Error State
  hasInputError: false, 
  setInputError: (error) => set({ hasInputError: error }),

}));

export const useStore = createWithEqualityFn((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
}));
