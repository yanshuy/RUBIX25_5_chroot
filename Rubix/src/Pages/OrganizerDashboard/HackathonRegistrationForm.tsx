import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { endOfDay, format, formatISO, getISODay } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import useAuth from "../../hook/useAuth"
import { baseUrl } from "../../App"


const cn = (...classes: string[]) => classes.filter(Boolean).join(" ")

const toast = (options: { title: string; description: string; variant?: string }) => {
  console.log(`Toast: ${options.title} - ${options.description}`)
}


export function HackathonRegistrationForm() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic-info")
  
  
  const {auth} = useAuth();
  const form = useForm({
    defaultValues: {
      hackathonName: "",
      themes: ["No Restrictions"],
      about: "",
      prizePool: "",
      city: "",
      collegeName: "",
      minMembers: 1,
      maxMembers: 1,
      totalParticipants: 1,
      hackathonWebsite: "",
      members: [
        { name: "", email: "", phone: "" },
        { name: "", email: "", phone: "" },
      ],
      profilePhoto: null,
      coverPhoto: null,
      applicationOpenDate: null,
      applicationCloseDate: null,
      hackathonBeginDate: null,
      hackathonEndDate: null,
    },
  })

  const onSubmit = async (values: any) => {
    console.log("Form values:", values);
    
    try {
      setLoading(true)
      const formData = new FormData()

      if (values.profilePhoto) {
        formData.append("profilePhoto", values.profilePhoto)
      }
      if (values.coverPhoto) {
        formData.append("coverPhoto", values.coverPhoto)
      }

      Object.keys(values).forEach((key) => {
        if (key !== "profilePhoto" && key !== "coverPhoto") {
          formData.append(key, typeof values[key] === "object" ? JSON.stringify(values[key]) : values[key])
        }
      })
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(`https://live-merely-drum.ngrok-free.app/api/core/hackathons/`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  body: formData,
});

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      toast({
        title: "Success",
        description: "Hackathon registration submitted successfully",
      })
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit registration. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const TabsTrigger = ({ value, label }: { value: string; label: string }) => (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out",
        activeTab === value 
          ? "bg-black text-white shadow-md" 
          : "text-gray-600 hover:bg-gray-100",
      )}
      onClick={() => setActiveTab(value)}
    >
      {label}
    </button>
  )

  const FormField = ({ label, name, children }: { label: string; name: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <label htmlFor={name} className="block  text-sm font-medium text-gray-800">
        {label}
      </label>
      {children}
      {form.formState.errors[name] && (
        <p className="text-sm text-red-600">{form.formState.errors[name]?.message}</p>
      )}
    </div>
  )

  const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
    <input
      ref={ref}
      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm 
                 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors duration-200"
      {...props}
    />
  ))

  const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    (props, ref) => (
      <textarea
        ref={ref}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm 
                   focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
        {...props}
      />
    ),
  )

  const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      className={cn(
        "inline-flex justify-center py-2 px-6 border border-transparent shadow-md text-sm font-medium rounded-lg",
        "text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
        "transition-all duration-200 ease-in-out",
        props.disabled && "opacity-50 cursor-not-allowed"
      )}
      {...props}
    >
      {children}
    </button>
  )

  const TagInput = ({ tags, setTags }: { tags: string[]; setTags: (tags: string[]) => void }) => {
    const [input, setInput] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && input) {
        e.preventDefault()
        if (!tags.includes(input.trim())) {
          setTags([...tags, input.trim()])
        }
        setInput("")
      }
    }

    const removeTag = (tag: string) => {
      setTags(tags.filter((t) => t !== tag))
    }

    return (
      <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
          >
            {tag}
            <button type="button" className="ml-2 hover:text-gray-600" onClick={() => removeTag(tag)}>
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
  type="text"
  value={input}
  onChange={handleInputChange}
  onKeyDown={handleInputKeyDown}
  className="flex-grow border-none shadow-none focus:outline-none focus:ring-0 focus:ring-black text-sm"
  placeholder="Add a theme tag..."
/>

      </div>
    )
  }

  const DatePicker = ({ value, onChange }: { value: string | null; onChange: (string: string | null) => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg shadow-sm 
                     focus:outline-none focus:ring-1 focus:ring-black focus:border-black
                     transition-colors duration-200"
      >
        {value ? format(value, "PPP p") : <span className="text-gray-400">Pick a date and time</span>}
        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </button>
      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200"
          style={{ marginBottom: '1rem' }} 
        >
          <input
            type="datetime-local"
            className="block w-full px-4 py-2 text-gray-900 border rounded-lg focus:ring-1 focus:ring-black focus:border-black"
            value={value ? value.slice(0, 19) : ""} 
            onChange={(e) => {
              const newDate = e.target.value ? new Date(e.target.value) : null
              const isoString = newDate ? newDate.toISOString().slice(0, 19) : null 
              onChange(isoString)
              setIsOpen(false) 
            }}
          />
        </div>
      )}
    </div>
  )
}





  const tabs = [
    {
      value: "basic-info",
      label: "Basic Info",
      content: (
        <div className="space-y-6">
          <FormField label="Hackathon Name" name="hackathonName">
            <Input {...form.register("hackathonName")} placeholder="Enter hackathon name" />
          </FormField>
          <FormField label="Themes" name="themes">
            <Controller
              name="themes"
              control={form.control}
              render={({ field }) => <TagInput tags={field.value} setTags={(newTags) => field.onChange(newTags)} />}
            />
          </FormField>
          <FormField label="About Hackathon" name="about">
            <Textarea {...form.register("about")} placeholder="Describe your hackathon" rows={4} />
          </FormField>
          <FormField label="Prize Pool" name="prizePool">
            <Input {...form.register("prizePool")} placeholder="Enter prize pool" />
          </FormField>
          <FormField label="City" name="city">
            <Input {...form.register("city")} placeholder="Enter city name" />
          </FormField>
          <FormField label="College Name" name="collegeName">
            <Input {...form.register("collegeName")} placeholder="Enter college name" />
          </FormField>
        </div>
      ),
    },
    {
      value: "media",
      label: "Media",
      content: (
        <div className="space-y-4">
          <FormField label="Profile Photo" name="profilePhoto">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => form.setValue("profilePhoto", e.target.files?.[0] || null)}
            />
          </FormField>
          <FormField label="Cover Photo" name="coverPhoto">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => form.setValue("coverPhoto", e.target.files?.[0] || null)}
            />
          </FormField>
          <FormField label="Hackathon Website" name="hackathonWebsite">
            <Input {...form.register("hackathonWebsite")} type="url" placeholder="https://yourhackathon.com" />
          </FormField>
        </div>
      ),
    },
    {
      value: "participants",
      label: "Participants",
      content: (
        <div className="space-y-4">
          <FormField label="Min Members" name="minMembers">
            <Input {...form.register("minMembers")} type="number" />
          </FormField>
          <FormField label="Max Members" name="maxMembers">
            <Input {...form.register("maxMembers")} type="number" />
          </FormField>
          <FormField label="Total Participants" name="totalParticipants">
            <Input {...form.register("totalParticipants")} type="number" />
          </FormField>
        </div>
      ),
    },
    {
      value: "dates",
      label: "Dates",
      content: (
        <div className="space-y-4">
          {["applicationOpenDate", "applicationCloseDate", "hackathonBeginDate", "hackathonEndDate"].map((date) => (
            <FormField
              key={date}
              label={date.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              name={date}
            >
              <Controller
                name={date}
                control={form.control}
                render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
              />
            </FormField>
          ))}
        </div>
      ),
    },
    {
      value: "members",
      label: "Members",
      content: (
        <div className="space-y-8">
          {[0, 1].map((index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold">Member {index + 1}</h3>
              <FormField label="Name" name={`members.${index}.name`}>
                <Input {...form.register(`members.${index}.name`)} placeholder="Enter member name" />
              </FormField>
              <FormField label="Email" name={`members.${index}.email`}>
                <Input {...form.register(`members.${index}.email`)} type="email" placeholder="Enter member email" />
              </FormField>
              <FormField label="Phone" name={`members.${index}.phone`}>
                <Input
                  {...form.register(`members.${index}.phone`)}
                  type="tel"
                  placeholder="Enter member phone number"
                />
              </FormField>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="max-w-[80vw] mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Hackathon Registration</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Fill out the form to register your hackathon</p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5  sm:p-12">
              <div className="mb-4">
                <nav className="flex space-x-4" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} label={tab.label} />
                  ))}
                </nav>
              </div>
              <div className="mt-4">{tabs.find((tab) => tab.value === activeTab)?.content}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>
        </div>
      </form>
    </div>
  )
}

