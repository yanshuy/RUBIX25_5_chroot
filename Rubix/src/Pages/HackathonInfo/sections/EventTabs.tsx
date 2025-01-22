
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"

const tabIds: Record<string,string> = {
  timeline: "Stages & Timeline",
  details: "Details",
  contacts: "Contacts",
  prizes: "Prizes",
  reviews: "Reviews",
  faqs: "FAQs & Discussions",
}
export function EventTabs() {
  return (
    <Tabs defaultValue="timeline" className="w-full">
      <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none">
        {Object.keys(tabIds).map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <a href={`#${tab}`}>{tabIds[tab]}</a>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}


