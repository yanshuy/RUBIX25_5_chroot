import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

export function PrizesSection({ data }) {
    return (
        <div className="p-6">
            <h2 className="mb-6 text-xl font-semibold">Rewards and Prizes</h2>
            <p className="mb-6 text-muted-foreground">
                Winners will be awarded a prize of ₹{data?.prizePool}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="relative overflow-clip">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <h3 className="mb-2 text-lg font-medium">Winner</h3>
                            <p className="text-3xl font-bold">
                                ₹ {data?.prizePool}
                            </p>
                        </div>
                        <div className="absolute bottom-0 right-0 w-24">
                            <img
                                src="https://d8it4huxumps7.cloudfront.net/uploads/images/667512bbe01e4_cashimageurls3.png?d=240x166"
                                alt="Prize money"
                                className="object-contain"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-clip">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <h3 className="mb-2 text-lg font-medium">
                                Participation Certificate
                            </h3>
                            <Badge variant="secondary" className="mt-2">
                                Certificate
                            </Badge>
                        </div>
                        <div className="absolute bottom-0 right-0 w-24">
                            <img
                                src="https://d8it4huxumps7.cloudfront.net/uploads/images/667512bbe01e4_cashimageurls3.png?d=240x166"
                                alt="Certificate"
                                className="object-contain"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
                * All the prizes and certificate will be released within 2 days
                after the event is over
            </p>
        </div>
    );
}
