import React, { useState, useEffect, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { endOfDay, format, formatISO, getISODay } from "date-fns";
import { CalendarIcon, X, ChevronLeft } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { baseUrl } from "../../App";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";

export const calculateTabProgress = (values, tabName) => {
  const tabFields = {
    "basic-info": ["hackathonName", "themes", "about", "prizePool", "city", "collegeName"],
    media: ["profilePhoto", "coverPhoto", "hackathonWebsite"],
    participants: ["minMembers", "maxMembers", "totalParticipants"],
    dates: ["applicationOpenDate", "applicationCloseDate", "hackathonBeginDate", "hackathonEndDate"],
    members: ["members"],
  };

  const fields = tabFields[tabName];
  if (!fields) return 0;

  let filledFields = 0;
  const totalFields = fields.length;

  fields.forEach((field) => {
    if (field === "themes") {
      if (values[field]?.some((theme) => theme.trim())) filledFields++;
    } else if (field === "members") {
      if (values[field]?.some((member) => member.name?.trim() && member.email?.trim() && member.phone?.trim()))
        filledFields++;
    } else if (typeof values[field] === "string" && values[field]?.trim()) {
      filledFields++;
    } else if (typeof values[field] === "number" && values[field] > 0) {
      filledFields++;
    } else if (values[field]) {
      filledFields++;
    }
  });

  return Math.round((filledFields / totalFields) * 100);
};

export const calculateTotalProgress = (tabProgresses) => {
  const totalProgress = Object.values(tabProgresses).reduce((sum, progress) => sum + progress, 0);
  return Math.round(totalProgress / Object.keys(tabProgresses).length);
};

const cn = (...classes) => classes.filter(Boolean).join(" ");

const toast = (options) => {
  console.log(`Toast: ${options.title} - ${options.description}`);
};

export function OrganizeHackathonForm() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic-info");
  const [progress, setProgress] = useState(0);
  const [tabProgresses, setTabProgresses] = useState({
    "basic-info": 0,
    media: 0,
    participants: 0,
    dates: 0,
    members: 0,
  });

  const { auth } = useAuth();
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
  });

  const { watch, getValues } = form;
  const activeInputRef = useRef(null);

  const updateProgress = useCallback(
    debounce((tabName) => {
      const newTabProgress = calculateTabProgress(getValues(), tabName);
      setTabProgresses((prev) => ({
        ...prev,
        [tabName]: newTabProgress,
      }));
      setProgress(
        calculateTotalProgress({ ...tabProgresses, [tabName]: newTabProgress })
      );
    }, 300),
    [tabProgresses, getValues]
  );

  useEffect(() => {
    const subscription = watch(() => {
      const activeElement = document.activeElement;
      if (activeElement?.tagName === "INPUT" || activeElement?.tagName === "TEXTAREA") {
        activeInputRef.current = activeElement;
      }
      updateProgress("basic-info");
    });

    return () => subscription.unsubscribe();
  }, [watch, updateProgress]);

  useEffect(() => {
    if (activeInputRef.current) {
      activeInputRef.current.focus();
    }
  }, [progress]);

  const handleTabChange = (newTab) => {
    updateProgress(activeTab);
    setActiveTab(newTab);
    updateProgress(newTab);
  };

  const onSubmit = async (values: any) => {
    console.log("Form values:", values)
    console.log("Progress:", progress)

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
      const accessToken = localStorage.getItem("accessToken")

      const response = await fetch(`https://live-merely-drum.ngrok-free.app/api/core/hackathons/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })

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
        activeTab === value ? "bg-black text-white shadow-md" : "text-gray-600 hover:bg-gray-100",
      )}
      onClick={() => handleTabChange(value)}
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
      {form.formState.errors[name] && <p className="text-sm text-red-600">{form.formState.errors[name]?.message}</p>}
    </div>
  )

  const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
    <input
      ref={ref}
      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm 
                 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors duration-200"
      onFocus={(e) => (activeInputRef.current = e.target)}
      {...props}
    />
  ))

  const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    (props, ref) => (
      <textarea
        ref={ref}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm 
                   focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
        onFocus={(e) => (activeInputRef.current = e.target)}
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
        props.disabled && "opacity-50 cursor-not-allowed",
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

  const DatePicker = ({
    value,
    onChange,
  }: {
    value: string | null;
    onChange: (value: string | null) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      const isoValue = newValue ? new Date(newValue).toISOString() : null; 
      onChange(isoValue); 
      setIsOpen(false);
    };
  
  
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg shadow-sm 
                     focus:outline-none focus:ring-1 focus:ring-black focus:border-black
                     transition-colors duration-200"
        >
          {value ? (
            format(new Date(value), "PPP p")
          ) : (
            <span className="text-gray-400">Pick a date and time</span>
          )}
          <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </button>
        {isOpen && (
          <div
            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200"
          >
            <input
              type="datetime-local"
              className="block w-full px-4 py-2 text-gray-900 border rounded-lg focus:ring-1 focus:ring-black focus:border-black"
              value={value || ""}
              onChange={handleDateChange}
            />
          </div>
        )}
      </div>
    );
  };

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
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                console.log("Selected file:", file); // Debugging step
                form.setValue("profilePhoto", file);
              }}
            />
          </FormField>
          <FormField label="Cover Photo" name="coverPhoto">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                console.log("Selected cover photo:", file); // Debugging step
                form.setValue("coverPhoto", file);
              }}
              
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
    <div className="p-10">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-10">
        <SetupHeader
          userName="Devansh Dayanandan Nair"
          progressPercentage={progress}
          onSaveLater={() => console.log("Save for later")}
          onFinish={() => console.log("Finish setup")}
        />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white overflow-hidden sm:rounded-lg">
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-12">
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
    </div>
  )
}

interface SetupHeaderProps {
  userName: string
  progressPercentage: number
  onSaveLater?: () => void
  onFinish?: () => void
}

const SetupHeader = ({ userName, progressPercentage, onSaveLater, onFinish }: SetupHeaderProps) => {

  const navigate = useNavigate()

  return (
    <div className="w-full bg-white border-b border-slate-400">
      <div className="max-w-7xl mx-auto p-4">
        <button
          onClick={() => {onSaveLater(); navigate(-1)}}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Save and finish later
        </button>

        <div className="grid grid-cols-3 items-center gap-8">
          <div className="col-span-1">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{userName}</h1>
            <p className="text-gray-600">
              Need help setting up? Email us,{" "}
              <a href="mailto:community@devfolio.co" className="text-blue-600 hover:text-blue-700 underline">
                community@devfolio.co
              </a>
            </p>
          </div>

          <div className="col-span-1 flex flex-col items-center">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-semibold text-emerald-500">{progressPercentage}%</span>
              <span className="text-gray-600">Set up complete</span>
            </div>
            <Progress value={progressPercentage} className="w-full h-2 bg-gray-200" />
          </div>

          <div className="col-span-1">
            <Button
              onClick={onFinish}
              disabled={progressPercentage < 100}
              className="w-full h-12 bg-blue-100 hover:bg-blue-200 text-blue-900 disabled:opacity-50"
            >
              Finish Setup
            </Button>
            <p className="text-center text-gray-500 mt-2 text-sm">Complete set up 100% to proceed.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

