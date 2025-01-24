"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Trash2, Upload, Github, Loader2, RocketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { baseUrl } from "../../App";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

// Updated schema with all fields marked as optional
const projectSchema = z.object({
    title: z.string().min(2, {
        message: "Project title must be at least 2 characters.",
    }).optional(), // Mark as optional
    description: z.string().min(50, {
        message: "Project description must be at least 50 characters.",
    }).optional(), // Mark as optional
    githubUrl: z
        .string()
        .url({
            message: "Please enter a valid GitHub URL.",
        })
        .refine((url) => url.includes("github.com"), {
            message: "URL must be from GitHub.",
        })
        .optional(), // Mark as optional
    demoUrl: z
        .string()
        .url({
            message: "Please enter a valid demo URL.",
        })
        .optional(), // Already optional
    techStack: z.string().min(1, {
        message: "Please enter the technologies used.",
    }).optional(), // Mark as optional
    teamMembers: z.string().min(1, {
        message: "Please enter team member details.",
    }).optional(), // Mark as optional
});

export default function ProjectSubmission() {
    const [images, setImages] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [running, setRunning] = useState(false); // State for the "Run" button
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            githubUrl: "",
            demoUrl: "",
            techStack: "",
            teamMembers: "",
        },
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (files.length + images.length > 5) {
            alert("You can only upload up to 5 images");
            return;
        }

        const validFiles = files.filter((file) => {
            if (file.size > MAX_FILE_SIZE) {
                alert(`File ${file.name} is too large. Max size is 5MB`);
                return false;
            }
            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                alert(`File ${file.name} has unsupported format`);
                return false;
            }
            return true;
        });

        setImages((prev) => [...prev, ...validFiles]);

        // Create preview URLs
        validFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrls((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRun = async () => {
        const githubUrl = form.getValues("githubUrl"); // Extract GitHub URL from the form

        if (!githubUrl) {
            alert("Please enter a valid GitHub URL.");
            return;
        }

        try {
            setRunning(true); // Set loading state
            const response = await fetch(`${baseUrl}/api/core/run/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ github_url: `${githubUrl}.git` }), // Send GitHub URL in the body
            });

            if (!response.ok) {
                throw new Error("Failed to trigger the run.");
            }

            const data = await response.json();
            console.log("Run triggered successfully:", data);
            alert("Run triggered successfully!");
        } catch (error) {
            console.error("Error triggering run:", error);
            alert("Error triggering run. Please try again.");
        } finally {
            setRunning(false); // Reset loading state
        }
        setTimeout(()=>{navigate("https://toucan-driven-admittedly.ngrok-free.app/")})
    };

    async function onSubmit(values: z.infer<typeof projectSchema>) {
        try {
            setUploading(true);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log(values);
            console.log(images);
            alert("Project submitted successfully!");
        } catch (error) {
            console.error(error);
            alert("Error submitting project");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 sm:p-8">
            <Card className="mx-auto max-w-3xl">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-3xl font-bold">
                        Submit Your Project
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Showcase your innovation to the world! 🚀
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {/* Project Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your project title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Optional: Provide a title for your project.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Project Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Project Description
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your project in detail..."
                                                className="min-h-[150px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Optional: Include your inspiration, challenges
                                            faced, and future scope.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* GitHub URL */}
                            <FormField
                                control={form.control}
                                name="githubUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GitHub Repository</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Github className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                                                <Input
                                                    className="pl-10"
                                                    placeholder="https://github.com/username/repo"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Optional: Link to your GitHub repository.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Demo URL */}
                            <FormField
                                control={form.control}
                                name="demoUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Demo URL (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://your-demo-url.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Optional: Link to a live demo or video
                                            demonstration.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Tech Stack */}
                            <FormField
                                control={form.control}
                                name="techStack"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tech Stack</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="React, Node.js, MongoDB, etc."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Optional: List the main technologies used in
                                            your project.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Team Members */}
                            <FormField
                                control={form.control}
                                name="teamMembers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Team Members</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe (Team Lead), Jane Smith (Developer)..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Optional: List all team members and their
                                            roles.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <Label>
                                    Project Screenshots (Max 5 images)
                                </Label>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {previewUrls.map((url, index) => (
                                        <div
                                            key={index}
                                            className="group relative"
                                        >
                                            <img
                                                src={url || "/placeholder.svg"}
                                                alt={`Preview ${index + 1}`}
                                                className="h-40 w-full rounded-lg object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeImage(index)
                                                }
                                                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {previewUrls.length < 5 && (
                                        <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed">
                                            <Label
                                                htmlFor="image-upload"
                                                className="flex cursor-pointer flex-col items-center gap-2"
                                            >
                                                <Upload className="h-8 w-8 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    Upload Image
                                                </span>
                                            </Label>
                                            <Input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                                multiple
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Run Button */}
                            <Button
                                type="button"
                                onClick={handleRun}
                                disabled={running || !form.getValues("githubUrl")}
                                className="w-full"
                                size="lg"
                            >
                                {running ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Running...
                                    </>
                                ) : (
                                    "Run Project"
                                )}
                            </Button>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <RocketIcon className="mr-2 h-4 w-4" />
                                        Submit Project
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}