import { Calendar, Heart, Share2 } from "lucide-react"
import { Button } from "../../../components/ui/button"

export function EventHeader() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex gap-4">
        <img
          src="https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/677756597a0f5_hackathon-technotronics.webp?d=1920x557"
          alt="Event banner"
          width={120}
          height={80}
          className="rounded-lg"
          
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-2">Hackathon: Technotronics</h1>
          <p className="text-muted-foreground">Dnyanprassarak Mandal's College and Research Centre, Goa</p>
        </div>
        <div className="flex items-start gap-2">
          <p className="text-2xl font-semibold">Free</p>
          <Button variant="ghost" size="icon">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Calendar className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
          Online
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Updated On: Jan 21, 2025
        </div>
      </div>

      <div className="flex gap-2">
        {["Hackathon", "College Festival", "Coding Challenge"].map((tag) => (
          <span
            key={tag}
            className="px-4 py-1 text-sm rounded-full border bg-background hover:bg-muted transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

