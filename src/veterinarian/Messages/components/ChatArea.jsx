"use client"

import { Card, CardContent, CardHeader } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Textarea } from "../../../components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { MessageSquare, Phone, Video, Send, PawPrint } from "lucide-react"
import MessageBubble from "./MessageBubble"

export default function ChatArea({
  selectedChat,
  messages,
  newMessage,
  setNewMessage,
  onSendMessage,
  onCallOwner,
  onVideoCall,
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  if (!selectedChat) {
    return (
      <div className="lg:w-2/3">
        <Card className="h-full border-0 shadow-lg flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
            <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:w-2/3">
      <Card className="h-full border-0 shadow-lg flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  <PawPrint className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedChat.ownerName}</h3>
                <p className="text-sm text-gray-600">Pet: {selectedChat.petName}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onCallOwner(selectedChat.id)}>
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onVideoCall(selectedChat.id)}>
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </CardContent>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-h-[40px] max-h-[120px]" />
            <Button style={{ backgroundColor: "#672e5b" }} onClick={onSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
