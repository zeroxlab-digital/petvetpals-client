"use client"

import { useState } from "react"
import ConversationsList from "./components/ConversationsList"
import ChatArea from "./components/ChatArea"

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      ownerName: "Sarah Johnson",
      petName: "Buddy",
      lastMessage: "Thank you for the checkup today! Buddy is doing much better.",
      timestamp: "2 hours ago",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
    {
      id: 2,
      ownerName: "Mike Chen",
      petName: "Whiskers",
      lastMessage: "Is it normal for cats to sleep 16 hours a day?",
      timestamp: "5 hours ago",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
    },
    {
      id: 3,
      ownerName: "Emma Davis",
      petName: "Luna",
      lastMessage: "When should we schedule the follow-up for Luna's surgery?",
      timestamp: "1 day ago",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "owner",
      message: "Hi Dr. Smith, I'm concerned about Buddy's appetite lately.",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "vet",
      message: "Hello Sarah! I understand your concern. Can you tell me more about what you've observed?",
      timestamp: "10:35 AM",
    },
    {
      id: 3,
      sender: "owner",
      message: "He's been eating about half of his usual amount for the past 3 days.",
      timestamp: "10:37 AM",
    },
    {
      id: 4,
      sender: "vet",
      message: "That's definitely worth monitoring. Has his energy level changed as well?",
      timestamp: "10:40 AM",
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // TODO: API call - sendMessage(selectedChat.id, newMessage) using RTK Query
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleCallOwner = (ownerId) => {
    // TODO: API call - initiateCall(ownerId) using RTK Query
    alert(`Calling ${selectedChat?.ownerName}...`)
  }

  const handleVideoCall = (ownerId) => {
    // TODO: API call - initiateVideoCall(ownerId) using RTK Query
    alert(`Starting video call with ${selectedChat?.ownerName}...`)
  }

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">
        <ConversationsList
          conversations={conversations}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat} />

        <ChatArea
          selectedChat={selectedChat}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
          onCallOwner={handleCallOwner}
          onVideoCall={handleVideoCall} />
      </div>
    </div>
  );
}
