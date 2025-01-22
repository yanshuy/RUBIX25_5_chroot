import { Users, Eye, Calendar } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Progress } from "../../../components/ui/progress"

export function EventSidebar() {
  return (
    <div className="w-80 p-6 space-y-6">
      <Button className="w-full" size="lg">
        Register
      </Button>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-sm text-muted-foreground">Registered</div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>588 / 1000</span>
              <span className="text-blue-600">(Limited Slots)</span>
            </div>
            <Progress value={58.8} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-sm text-muted-foreground">Team Size</div>
          </div>
          <div className="font-medium">2 - 3 Members</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-sm text-muted-foreground">Impressions</div>
          </div>
          <div className="font-medium">44,888</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-sm text-muted-foreground">Registration Deadline</div>
          </div>
          <div className="font-medium">23 Jan 25, 11:59 AM IST</div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Eligibility</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Engineering Students</li>
            <li>Postgraduate</li>
            <li>Undergraduate</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Refer & Win</h3>
          <p className="text-sm text-muted-foreground">MacBook, iPhone, Apple Watch</p>
        </div>
      </div>
    </div>
  )
}

