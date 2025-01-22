export default function Rules() {
    return (
        <div className="mx-auto max-w-3xl p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Hackathon Rules
            </h2>
            <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        1
                    </span>
                    <span>
                        All participants must be registered and part of a team.
                    </span>
                </li>
                <li className="flex items-start">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        2
                    </span>
                    <span>
                        Projects must be started and completed during the
                        hackathon period.
                    </span>
                </li>
                <li className="flex items-start">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        3
                    </span>
                    <span>
                        Use of open-source libraries and APIs is allowed and
                        encouraged.
                    </span>
                </li>
                <li className="flex items-start">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        4
                    </span>
                    <span>
                        All code must be original and created during the event.
                    </span>
                </li>
                <li className="flex items-start">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        5
                    </span>
                    <span>
                        Teams must submit their projects before the deadline for
                        judging.
                    </span>
                </li>
            </ul>
        </div>
    );
}
