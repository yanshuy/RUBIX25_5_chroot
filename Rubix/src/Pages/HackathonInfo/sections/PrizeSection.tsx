
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"

export function PrizesSection() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Rewards and Prizes</h2>
      <p className="text-muted-foreground mb-6">Winners will be awarded a prize of 5000</p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="relative overflow-clip">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Winner</h3>
              <p className="text-3xl font-bold">₹ 5,000</p>
            </div>
            <div className="w-24 absolute bottom-0 right-0">
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
              <h3 className="text-lg font-medium mb-2">Participation Certificate</h3>
              <Badge variant="secondary" className="mt-2">
                Certificate
              </Badge>
            </div>
            <div className="w-24 absolute bottom-0 right-0">
              <img
                src="https://d8it4huxumps7.cloudfront.net/uploads/images/667512bbe01e4_cashimageurls3.png?d=240x166"
                alt="Certificate"
                
                className="object-contain"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-sm text-muted-foreground mt-6">
        * All the prizes and certificate will be released within 2 days after the event is over
      </p>
    </div>
  )
}

