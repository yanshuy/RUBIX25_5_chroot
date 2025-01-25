"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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

export default function ProjectSubmission() {
    const [images, setImages] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [running, setRunning] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
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
            if (file.size > 5000000) {
                alert(`File ${file.name} is too large. Max size is 5MB`);
                return false;
            }
            return true;
        });

        setImages((prev) => [...prev, ...validFiles]);

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
        const githubUrl = form.getValues("githubUrl");

        if (!githubUrl) {
            alert("Please enter a valid GitHub URL.");
            return;
        }

          setRunning(true);
          const response = await fetch(`${baseUrl}/api/core/run/`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ github_url: `${githubUrl}.git` }),
          });

          const data = await response.json();
          console.log("Run triggered successfully:", data);
          setRunning(false);
          alert("Run triggered successfully!");
        setTimeout(() => {
            window.location.href =
                "https://toucan-driven-admittedly.ngrok-free.app/";
        }, 10000);
    };

    async function onSubmit(values: any) {
        try {
            setUploading(true);
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
                                            Optional: Provide a title for your
                                            project.
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
                                            Optional: Include your inspiration,
                                            challenges faced, and future scope.
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
                                            Optional: Link to your GitHub
                                            repository.
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
                                            Optional: Link to a live demo or
                                            video demonstration.
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
                                            Optional: List the main technologies
                                            used in your project.
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
                                            Optional: List all team members and
                                            their roles.
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
                                disabled={
                                    running || !form.getValues("githubUrl")
                                }
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
