"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

interface Discussion {
  id: number
  user: {
    name: string
    avatar?: string
    initials: string
  }
  question: string
  timeAgo: string
}

const discussions: Discussion[] = [
  {
    id: 1,
    user: {
      name: "Piyush Kumar",
      initials: "PK",
    },
    question: "i want ask that the event will organise online ?",
    timeAgo: "9 Hours Ago",
  },
  {
    id: 2,
    user: {
      name: "Rushikesh Hiray",
      initials: "RH",
    },
    question: "Is all rounds online?",
    timeAgo: "4 Days Ago",
  },
]

export function FAQSection() {
  const [question, setQuestion] = useState("")

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions/Discussions</h2>

      <div className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Ask a question (be specific)"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1"
          />
          <Button>Enter</Button>
        </div>

        <Tabs defaultValue="all-discussions">
          
          <TabsContent value="all-discussions">
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Avatar>
                        {discussion.user.avatar && <AvatarImage src={discussion.user.avatar} />}
                        <AvatarFallback>{discussion.user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{discussion.user.name}</h3>
                          <span className="text-sm text-muted-foreground">{discussion.timeAgo}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{discussion.question}</p>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

