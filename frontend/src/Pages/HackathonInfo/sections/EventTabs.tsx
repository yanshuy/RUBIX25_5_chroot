import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";

const tabIds: Record<string, string> = {
    timeline: "Stages & Timeline",
    details: "Details",
    contacts: "Contacts",
    prizes: "Prizes",
    faqs: "FAQs & Discussions",
};
export function EventTabs() {
    return (
        <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
                {Object.keys(tabIds).map((tab) => (
                    <TabsTrigger
                        key={tab}
                        value={tab}
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                    >
                        <a href={`#${tab}`}>{tabIds[tab]}</a>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
