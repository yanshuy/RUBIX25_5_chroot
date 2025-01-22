import { EventHeader } from "./sections/EventHeaders";
import { EventSidebar } from "./sections/EventSidebar";
import { EventTabs } from "./sections/EventTabs";
import { EventTimeline } from "./sections/EventTimeline";
import { PrizesSection } from "./sections/PrizeSection";
import { FAQSection } from "./sections/Faqs";
import { ContactSection } from "./sections/ContactSection";

export default function HackathonInfo() {
  return (
    <div className="scroll-smooth">
      <figure className=" w-full h-[60vh]">
        <img className="object-cover size-full" src="https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/677756597a0f5_hackathon-technotronics.webp?d=1920x557" alt="hackathon banner" />
      </figure>
      <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto bg-white ">
        <EventHeader />
        <EventTabs />
        <div className="flex">
          <div className="flex-1 border-r grid grid-cols-1 gap-6 bg-slate-100 pr-4">
            <section id="timeline" className="rounded-lg bg-white mt-6">
              <EventTimeline />
            </section>
            <section id="contacts" className="rounded-lg bg-white">
              <ContactSection /></section>
            <section id="prizes" className="rounded-lg bg-white">
              <PrizesSection /></section>
            <section id="faqs" className="rounded-lg bg-white">
              <FAQSection /></section>

          </div>
          <EventSidebar />
        </div>
      </div>
    </div>
    </div>
  )
}
