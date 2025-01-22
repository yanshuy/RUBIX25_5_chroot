import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface ContactPerson {
  initials: string
  name: string
  email: string
  phone: string
}

const contacts: ContactPerson[] = [
  {
    initials: "TA",
    name: "TaNish Salgaonkar",
    email: "2205050.stu@dmscollege.ac.in",
    phone: "+917620006806",
  },
  {
    initials: "AR",
    name: "Arshad Khan",
    email: "2205024.stu@dmscollege.ac.in",
    phone: "+917447374429",
  },
  {
    initials: "KR",
    name: "Krishnarao Rane",
    email: "krishnarao@dmscollege.ac.in",
    phone: "+919823220336",
  },
]

export function ContactSection() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Contact the organisers</h2>
      <div className="space-y-6">
        {contacts.map((contact) => (
          <Card key={contact.initials}>
            <CardContent className="flex items-start gap-4 p-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-100 text-blue-700">{contact.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

