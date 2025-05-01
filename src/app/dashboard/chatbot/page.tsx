'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


interface ChatMessage {
  role: 'user' | 'bot'
  text: string
  isLoading?: boolean
}

const ChatBotPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Function to clean markdown formatting from text
  const cleanMarkdown = (text: string) => {
    return text
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\*/g, '')   // Remove italic markdown
      .replace(/###/g, '')  // Remove heading markdown
      .replace(/\[\]/g, '') // Remove empty brackets
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with just their text
      .replace(/---/g, '')  // Remove horizontal rules
      .replace(/^\s*[0-9]+\.\s*/gm, '') // Remove numbered lists
      .replace(/^\s*-\s*/gm, '') // Remove bullet points
      .replace(/^\s*#\s*/gm, '') // Remove # headers
      .replace(/`/g, '')    // Remove code ticks
      .replace(/\n{3,}/g, '\n\n') // Replace multiple new lines with just two
      .trim();
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return
    setError('')
    setIsLoading(true)

    // Update UI immediately with user's message
    const updatedMessages: ChatMessage[] = [
      ...messages, 
      { role: 'user', text: currentMessage }
    ]
    
    // Add loading message from bot
    updatedMessages.push({ role: 'bot', text: 'Processing...', isLoading: true })
    setMessages(updatedMessages)
    
    // Clear input field
    setCurrentMessage('')

    try {
      const payload: { prompt: string; session_id?: string } = {
        prompt: currentMessage,
      }
      if (sessionId) {
        payload.session_id = sessionId
      }

      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Something went wrong')
        // Remove loading message
        setMessages(messages => messages.filter(msg => !msg.isLoading))
        return
      }

      // Save the session ID if it's the first message
      if (!sessionId && data.session_id) {
        setSessionId(data.session_id)
      }

      // Get the response text and clean it
      const responseText = data.reply || data.content
      const cleanedText = cleanMarkdown(responseText)

      // Replace loading message with actual response
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.isLoading ? { role: 'bot', text: cleanedText } : msg
        )
      )
    } catch (err) {
      console.error(err)
      setError('Network or server error')
      // Remove loading message
      setMessages(messages => messages.filter(msg => !msg.isLoading))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="bg-gray-800 border-amber-500/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-100 flex items-center justify-between">
            <span>Trade Compliance Assistant</span>
            {sessionId && (
              <span className="text-xs text-amber-400/60">Session: {sessionId.substring(0, 8)}...</span>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="h-[500px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-gray-700/20">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-amber-100/50 text-center">
                  Ask me anything about trade regulations, documentation requirements, or compliance concerns.
                </p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 rounded-br-none' 
                        : 'bg-gray-700 text-amber-100 rounded-bl-none'
                    }`}
                  >
                    {msg.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span className="text-amber-100/70">{msg.text}</span>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))
            )}
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-3 rounded-md">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="flex w-full space-x-2">
            <Input
              className="flex-1 bg-gray-700 border-amber-500/30 focus:border-amber-400 text-amber-100"
              placeholder="Type your message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !currentMessage.trim()}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 hover:from-amber-400 hover:to-orange-500"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ChatBotPage