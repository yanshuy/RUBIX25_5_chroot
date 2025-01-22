import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


interface TabData {
  value: string
  label: string
  content: React.ReactNode
}

interface TabbedFormProps {
  tabs: TabData[]
  onSubmit: () => void
}

export function TabbedForm({ tabs, onSubmit }: TabbedFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-8"
    >
      <Card>
        <CardHeader>
          <CardTitle   ><p className="text-2xl">Hackathon Registration</p></CardTitle>
          <CardDescription>Fill out the form to register your hackathon</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={tabs[0].value} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </form>
  )
}

