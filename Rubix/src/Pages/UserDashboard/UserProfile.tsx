"use client"

import { useState } from "react"
import { Bell, Moon, Plus, Search, Upload, User2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Separator } from "../../components/ui/separator"
import Sigmaimg from "../../assets/sigma.png"
import useAuth from "../../hook/useAuth"

interface skill{
  id: string
  name: string
}

export default function UserProfile() {
  const [skills, setskills] = useState<skill[]>([
    { id: "1", name: "UI Design" },
    { id: "2", name: "Framer" },
    { id: "4", name: "UX" },
    { id: "6", name: "Mobile Apps" },
  ])
  

  const removeskill = (id: string) => {
    setskills(skills.filter((skill) => skill.id !== id))
  }

  const {auth} = useAuth()

  return (
    <div className="container py-6 px-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Edit User Profile</h1>
          <Button variant="link" className="text-blue-500 font-normal">
            Preview →
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Moon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-6 grid grid-cols-2 gap-6">
        <div className="grid gap-6">
            {/* Photo Upload Section */}
            <Card>
            <CardContent className="p-0">
                <div className="relative">
                <div className="h-32 bg-gradient-to-r from-pink-300 via-purple-400 to-orange-400" />
                <div className="absolute left-6 -bottom-12">
                    <div className="relative w-24 h-24">
                    <img
                        src={Sigmaimg}
                        alt="Profile photo"
                        className="rounded-full border-4 border-white object-cover h-full w-full"
                    />
                    </div>
                </div>
                </div>
                <div className="px-6 pb-6 pt-16">
                <h2 className="font-medium mb-1">Your Photo</h2>
                <p className="text-sm text-muted-foreground mb-4">This will be displayed on your profile</p>
                <div className="flex gap-2">
                    <Button variant="outline">Upload New</Button>
                    <Button>Save</Button>
                </div>
                </div>
            </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
            <CardContent className="p-6">
                <h2 className="font-medium mb-4">Personal Information</h2>
                <div className="space-y-4">
                <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Ayman Shaltoni" className="mt-1.5" />
                </div>
                <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" defaultValue="Aymanshaltoni@gmail.com" className="mt-1.5" />
                </div>
                <div>
                    <Label htmlFor="mobile">Mobile number</Label>
                    <Input id="mobile" defaultValue="+966 550293123" className="mt-1.5" />
                </div>
                <div>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Senior Product designer" className="mt-1.5" />
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
        <div className="grid gap-6 py-0 !m-0">
            {/* Bio */}
            <Card>
            <CardContent className="p-6">
                <h2 className="font-medium mb-4">Bio</h2>
                <Textarea
                className="min-h-[100px] resize-none"
                defaultValue="Hey, I'm a product designer specialized in user interface designs (Web & Mobile) with 10 years of experience, Last year I have been ranked as a top-rated designer on Upwork working for over +3,750 hours with high clients satisfaction, on-time delivery and top quality output."
                />
            </CardContent>
            </Card>

            {/* Skills */}
            <Card>
            <CardContent className="p-6">
                <h2 className="font-medium mb-4">Skills</h2>
                <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                    <div
                        key={skill.id}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
                    >
                        {skill.name}
                        <button onClick={() => removeskill(skill.id)} className="hover:text-blue-900">
                        <X className="h-3 w-3" />
                        </button>
                    </div>
                    ))}
                </div>
                <div className="flex">
                    <label className="w-full flex justify-center items-center pr-1 relative">
                        <Search className="absolute left-3" size={20} color="grey"/>
                        <Input placeholder="Enter your skills" className="pl-11 w-full" onChange={(e:Input)=>{setskills(e.currentTarget.value)}}/>
                    </label>
                    <button onClick={() => setskills([...skills, { id: Date.now().toString(), name: "New Skill" }])}>
                        <Plus className="h-8 w-8 p-1 rounded-lg bg-blue-700 text-white" />
                    </button>
                </div>
                </div>
            </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
            <CardContent className="p-6">
                <h2 className="font-medium mb-4">Social Media accounts</h2>
                <div className="space-y-4">
                <Input defaultValue="https://twitter.com/ShaltOni" />
                <Input defaultValue="https://instagram.com/shaltoni" />
                <Input defaultValue="https://www.linkedin.com/in/aymanshaltoni/" />
                <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add more
                </Button>
                </div>
            </CardContent>
            </Card>
        </div>

        {/* Education */}
        <Card className="col-span-2 !m-0">
        <CardContent className="p-6">
        <div className="space-y-4">
             <h2 className="text-xl font-semibold">Education</h2>
             <div className="grid gap-4">
               <div className="grid gap-2">
                 <Label htmlFor="school">School/University</Label>
                 <Input id="school" placeholder="Enter school name" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                   <Label htmlFor="degree">Degree</Label>
                   <Select>
                     <SelectTrigger id="degree">
                       <SelectValue placeholder="Select degree" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="bachelors">Bachelor's</SelectItem>
                       <SelectItem value="masters">Master's</SelectItem>
                       <SelectItem value="phd">Ph.D.</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="gradYear">Graduation Year</Label>
                   <Input id="gradYear" type="number" placeholder="YYYY" />
                 </div>
               </div>
             </div>
             <Button variant="outline" className="w-full">
               + Add more education
             </Button>
           </div>
        </CardContent>
        </Card>

        {/* Experience */}
        <Card className="col-span-2 !m-0">
        <CardContent className="p-6">
        <div className="space-y-4">
             <h2 className="text-xl font-semibold">Experience</h2>
             <div className="grid gap-4">
               <div className="grid gap-2">
                 <Label htmlFor="company">Company</Label>
                 <Input id="company" placeholder="Enter company name" />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="position">Position</Label>
                 <Input id="position" placeholder="Enter your position" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                   <Label htmlFor="startDate">Start Date</Label>
                   <Input id="startDate" type="month" />
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="endDate">End Date</Label>
                   <Input id="endDate" type="month" />
                 </div>
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="description">Description</Label>
                 <Textarea id="description" placeholder="Describe your role and achievements..." />
               </div>
             </div>
             <Button variant="outline" className="w-full">
               + Add more experience
             </Button>
        </div>
        </CardContent>
        </Card>


        {/* Resume Upload */}
        <Card className="col-span-2 !m-0">
        <CardContent className="p-6">
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Resume</h2>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag and drop your resume here, or click to browse</p>
                <Button variant="outline" asChild>
                <label>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    Upload Resume
                </label>
                </Button>
            </div>
            </div>
        </div>
        </CardContent>
        </Card>

        <div className="flex justify-end gap-4 col-span-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
        </div>
        
      </div>
    </div>
  )
}