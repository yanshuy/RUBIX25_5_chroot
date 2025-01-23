import { format, formatDate } from "date-fns";

export function EventTimeline({ data }) {
    return (
        <div className="p-6">
            <h2 className="mb-6 text-xl font-semibold">Stages and Timelines</h2>
            <div className="relative ml-4 border-l-2 border-muted pb-8 pl-8">
                <div className="absolute left-0 flex -translate-x-1/2 flex-col items-center">
                    <div className="mb-1 rounded-lg bg-blue-100 px-3 py-1 font-semibold text-blue-900">
                        {data &&
                            format(new Date(data.applicationOpenDate), "d")}
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">
                        {data &&
                            format(new Date(data.applicationOpenDate), "MMM")}
                    </div>
                </div>
                <div className="ml-8">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                        Application Opens
                        {/* <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-900">
                            On Stop
                        </span> */}
                    </h3>

                    <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                            {data &&
                                format(
                                    new Date(data.applicationOpenDate),
                                    "dd MMM yy, hh:mm a",
                                )}{" "}
                            IST
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative ml-4 border-l-2 border-muted pb-8 pl-8">
                <div className="absolute left-0 flex -translate-x-1/2 flex-col items-center">
                    <div className="mb-1 rounded-lg bg-blue-100 px-3 py-1 font-semibold text-blue-900">
                        {data &&
                            format(new Date(data.applicationCloseDate), "d")}
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">
                        {data &&
                            format(new Date(data.applicationCloseDate), "MMM")}
                    </div>
                </div>
                <div className="ml-8">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                        Application Opens
                        {/* <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-900">
                            On Stop
                        </span> */}
                    </h3>

                    <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                            {data &&
                                format(
                                    new Date(data.applicationOpenDate),
                                    "dd MMM yy, hh:mm a",
                                )}{" "}
                            IST
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
