import { useEffect, useState } from "react";
import { Bell, Plus, Search, Upload, X } from "lucide-react";
import { LuGithub, LuInstagram } from "react-icons/lu";
import { IoLogoLinkedin } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import Sigmaimg from "@/assets/sigma.png";
import { baseUrl } from "../../App";

interface Education {
  id: string;
  school: string;
  degree: string;
  graduationYear: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
}

interface ProfileInfo {
  profilePhoto: string;
  full_name: string;
  email: string;
  mobile: string;
  role: string;
  bio: string;
  skills: Skill[];
  linkedin: string;
  github: string;
  instagram: string;
  education: Education[];
  experience: Experience[];
  resume: File | null;
  resumelink?: string | null;
}

export default function UserProfile() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    profilePhoto: Sigmaimg,
    full_name: "",
    email: "",
    mobile: "",
    role: "",
    bio: "",
    skills: [],
    linkedin: "",
    github: "",
    instagram: "",
    education: [
      {
        id: "1",
        school: "",
        degree: "",
        graduationYear: "",
      },
    ],
    experience: [
      {
        id: "1",
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    resume: null,
    resumelink: "",
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileInfo((prev) => ({
            ...prev,
            profilePhoto: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof ProfileInfo, value: string, index?: number) => {
    setProfileInfo((prev) => {
      if (field === "education" || field === "experience") {
        const items = [...prev[field]];
        if (typeof index === "number") {
          items[index] = {
            ...items[index],
            ...(value as any), // Update specific field in education/experience
          };
        }
        return {
          ...prev,
          [field]: items,
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileInfo((prev) => ({
        ...prev,
        resume: file,
      }));
      toast({
        title: "Resume Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setProfileInfo((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), name: newSkill.trim() }],
    }));
    setNewSkill("");
  };

  const removeSkill = (id: string) => {
    setProfileInfo((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const addEducation = () => {
    setProfileInfo((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          graduationYear: "",
        },
      ],
    }));
  };

  const addExperience = () => {
    setProfileInfo((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      const { resume, ...otherProfileInfo } = profileInfo;
      formData.append("profile", JSON.stringify(otherProfileInfo));
      if (resume) {
        formData.append("resume", resume);
      }
      await updateProfile(formData);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  async function fetchProfile() {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${baseUrl}/api/users/me/get`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
        authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    return response.json();
  }

  async function updateProfile(data: FormData) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${baseUrl}/api/users/me/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    });
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
    return response.json();
  }

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        console.log("API Response:", data); // Log the API response

        // Merge fetched data into state
        setProfileInfo((prev) => ({
          ...prev,
          full_name: data.full_name || prev.full_name,
          email: data.email || prev.email,
          mobile: data.mobile || prev.mobile,
          role: data.role || prev.role,
          bio: data.bio || prev.bio,
          skills: data.skills || prev.skills,
          linkedin: data.linkedin || prev.linkedin,
          github: data.github || prev.github,
          instagram: data.instagram || prev.instagram,
          education: data.education || prev.education,
          experience: data.experience || prev.experience,
          resumelink: data.resume || prev.resumelink,
        }));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      }
    };
    loadProfile();
  }, []);

  return (
    <div className="container py-6 px-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <Bell size={20} className="cursor-pointer mr-1" />
      </div>

      <div className="space-y-6 grid grid-cols-2 gap-6">
        <div className="grid gap-6">
          {/* Photo Upload Section */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-[#2566E7] to-[#38C871]" />
                <div className="absolute left-6 -bottom-12">
                  <div className="relative w-24 h-24">
                    <img
                      src={profileInfo.profilePhoto || Sigmaimg}
                      alt="Profile photo"
                      className="rounded-full border-4 border-white object-cover h-full w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 pt-16">
                <h2 className="font-medium mb-1">Your Photo</h2>
                <p className="text-sm text-muted-foreground mb-4">This will be displayed on your profile</p>
                <Button variant="outline">
                  <label>
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                    Upload New
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-medium mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    className="mt-1.5"
                    value={profileInfo.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    className="mt-1.5"
                    value={profileInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile number</Label>
                  <Input
                    id="mobile"
                    className="mt-1.5"
                    value={profileInfo.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    className="mt-1.5"
                    value={profileInfo.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                  />
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
                id="bio"
                className="min-h-[100px] resize-none"
                value={profileInfo.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-medium mb-4">Skills</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(profileInfo.skills) && profileInfo.skills.length > 0 ? (
                    profileInfo.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
                      >
                        {skill.name}
                        <button onClick={() => removeSkill(skill.id)} className="hover:text-blue-900">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No skills added yet.</div>
                  )}
                </div>
                <div className="flex">
                  <label className="w-full flex justify-center items-center pr-1 relative">
                    <Search className="absolute left-3" size={20} color="grey" />
                    <Input
                      id="skills"
                      placeholder="Enter your skills"
                      className="pl-11 w-full"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                  </label>
                  <button onClick={addSkill}>
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
                <div className="flex items-center justify-center relative">
                  <IoLogoLinkedin size={20} className="absolute left-2" />
                  <Input
                    id="linkedin"
                    value={profileInfo.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center justify-center relative">
                  <LuGithub size={20} className="absolute left-2" />
                  <Input
                    id="github"
                    value={profileInfo.github}
                    onChange={(e) => handleInputChange("github", e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center justify-center relative">
                  <LuInstagram size={20} className="absolute left-2" />
                  <Input
                    id="instagram"
                    value={profileInfo.instagram}
                    onChange={(e) => handleInputChange("instagram", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Education */}
        <Card className="col-span-2 !m-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Education</h2>
              {Array.isArray(profileInfo.education) && profileInfo.education.length > 0 ? (
                profileInfo.education.map((edu, index) => (
                  <div key={edu.id} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`school-${edu.id}`}>School/University</Label>
                      <Input
                        id={`school-${edu.id}`}
                        placeholder="Enter school name"
                        value={edu.school}
                        onChange={(e) => handleInputChange("education", e.target.value, index)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                        <Select
                          value={edu.degree}
                          onValueChange={(value) => handleInputChange("education", value, index)}
                        >
                          <SelectTrigger id={`degree-${edu.id}`}>
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
                        <Label htmlFor={`gradYear-${edu.id}`}>Graduation Year</Label>
                        <Input
                          id={`gradYear-${edu.id}`}
                          type="number"
                          placeholder="YYYY"
                          value={edu.graduationYear}
                          onChange={(e) => handleInputChange("education", e.target.value, index)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No education added yet.</div>
              )}
              <Button variant="outline" className="w-full" onClick={addEducation}>
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
              {Array.isArray(profileInfo.experience) && profileInfo.experience.length > 0 ? (
                profileInfo.experience.map((exp, index) => (
                  <div key={exp.id} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`company-${exp.id}`}>Company</Label>
                      <Input
                        id={`company-${exp.id}`}
                        placeholder="Enter company name"
                        value={exp.company}
                        onChange={(e) => handleInputChange("experience", e.target.value, index)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`position-${exp.id}`}>Position</Label>
                      <Input
                        id={`position-${exp.id}`}
                        placeholder="Enter your position"
                        value={exp.position}
                        onChange={(e) => handleInputChange("experience", e.target.value, index)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${exp.id}`}
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => handleInputChange("experience", e.target.value, index)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${exp.id}`}
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => handleInputChange("experience", e.target.value, index)}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`description-${exp.id}`}>Description</Label>
                      <Textarea
                        id={`description-${exp.id}`}
                        placeholder="Describe your role and achievements..."
                        value={exp.description}
                        onChange={(e) => handleInputChange("experience", e.target.value, index)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No experience added yet.</div>
              )}
              <Button variant="outline" className="w-full" onClick={addExperience}>
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
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileInfo((prev) => ({
                              ...prev,
                              resume: file,
                            }));
                          }
                          handleResumeUpload(e);
                        }}
                      />
                      Upload Resume
                    </label>
                  </Button>
                  {profileInfo.resume && (
                    <p className="text-sm text-muted-foreground mt-2 text-green-500">
                      Uploaded: <span className="font-medium">{profileInfo.resume.name}</span>
                    </p>
                  )}
                  {profileInfo.resumelink && !profileInfo.resume && (
                    <p className="text-sm text-muted-foreground mt-2 text-green-500">
                      Uploaded:{" "}
                      <a
                        href={profileInfo.resumelink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-500 hover:underline"
                      >
                        {profileInfo.resumelink}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 col-span-2">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}