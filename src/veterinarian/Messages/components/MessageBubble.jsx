"use client"

import { Clock } from "lucide-react"

export default function MessageBubble({ message }) {
  return (
    <div
      className={`flex ${message.sender === "vet" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          message.sender === "vet" ? "text-white" : "bg-gray-100 text-gray-900"
        }`}
        style={message.sender === "vet" ? { backgroundColor: "#672e5b" } : {}}>
        <p className="text-sm">{message.message}</p>
        <div className="flex items-center mt-1">
          <Clock className="w-3 h-3 mr-1 opacity-70" />
          <span className="text-xs opacity-70">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );
}
