export function EventTimeline() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Stages and Timelines</h2>
      <div className="relative pl-8 ml-4 pb-8 border-l-2 border-muted">
        <div className="absolute left-0 -translate-x-1/2 flex flex-col items-center">
          <div className="bg-blue-100 text-blue-900 font-semibold px-3 py-1 rounded-lg mb-1">24</div>
          <div className="text-sm text-muted-foreground">Jan 25</div>
          <div className="w-4 h-4 bg-primary rounded-full mt-2"></div>
        </div>
        <div className="ml-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            Problem statement
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-900">On Stop</span>
          </h3>
          <p className="text-muted-foreground mb-4">Problem statement will be displayed here once the round starts.</p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Start: 24 Jan 25, 10:00 AM IST</p>
            <p>End: 25 Jan 25, 10:00 AM IST</p>
          </div>
        </div>
      </div>
    </div>
  )
}

