import { useState } from "react";
import {
    Github,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Users,
    Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

// Mock data for demonstration
const projects = [
    {
        id: 1,
        title: "AI-Powered Virtual Assistant",
        description:
            "An intelligent virtual assistant that uses natural language processing to help users manage their daily tasks, schedule appointments, and provide personalized recommendations.",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
        ],
        githubUrl: "https://github.com/username/project",
        demoUrl: "https://demo-url.com",
        techStack: ["React", "Python", "TensorFlow", "OpenAI", "MongoDB"],
        teamMembers: [
            { name: "John Doe", role: "Team Lead" },
            { name: "Jane Smith", role: "ML Engineer" },
            { name: "Mike Johnson", role: "Full Stack Developer" },
        ],
        featured: true,
        votes: 156,
    },
    // Add more projects as needed
];

interface ImageCarouselProps {
    images: string[];
}

function ImageCarousel({ images }: ImageCarouselProps) {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="group relative">
            <div className="relative h-[300px] w-full overflow-hidden rounded-t-lg">
                <img
                    src={images[currentImage] || "/placeholder.svg"}
                    alt={`Project screenshot ${currentImage + 1}`}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                    {currentImage + 1} / {images.length}
                </div>

                {/* Navigation buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={previousImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 sm:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight">
                        Hackathon Projects
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Discover innovative projects created by talented
                        developers
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="group overflow-hidden"
                        >
                            <ImageCarousel images={project.images} />

                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-bold">
                                            {project.title}
                                        </CardTitle>
                                        {project.featured && (
                                            <Badge
                                                variant="secondary"
                                                className="mt-2"
                                            >
                                                <Trophy className="mr-1 h-3 w-3" />
                                                Featured Project
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link
                                                        to={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                                                    >
                                                        <Github className="h-5 w-5" />
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    View Source Code
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link
                                                        to={project.demoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                                                    >
                                                        <ExternalLink className="h-5 w-5" />
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    View Live Demo
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <CardDescription className="line-clamp-3">
                                    {project.description}
                                </CardDescription>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <Badge key={tech} variant="outline">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Team Members */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span>Team Members</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.teamMembers.map(
                                            (member, index) => (
                                                <TooltipProvider key={index}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
                                                                {member.name}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {member.role}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {/* Voting and Details Button */}
                                <div className="flex items-center justify-between pt-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
