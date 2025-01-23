import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Star } from "lucide-react";
import { baseUrl } from "../../App";
import { set } from "date-fns";

// Types
type Project = {
    id: number;
    teamName: string;
    domain: string;
    repoLink: string;
    liveLink: string;
    avgRating: number | null;
};

type RatingParameter = {
    name: string;
    description: string;
};

// Dummy data
const initialProjects: Project[] = [
    {
        id: 1,
        teamName: "Tech Wizards",
        domain: "AI",
        repoLink: "https://github.com/techwizards",
        liveLink: "https://techwizards.com",
        avgRating: 8.5,
    },
    {
        id: 2,
        teamName: "Code Ninjas",
        domain: "Web3",
        repoLink: "https://github.com/codeninjas",
        liveLink: "https://codeninjas.com",
        avgRating: null,
    },
    {
        id: 3,
        teamName: "Data Dynamos",
        domain: "Big Data",
        repoLink: "https://github.com/datadynamos",
        liveLink: "https://datadynamos.com",
        avgRating: 7.8,
    },
    {
        id: 4,
        teamName: "UX Unicorns",
        domain: "Design",
        repoLink: "https://github.com/uxunicorns",
        liveLink: "https://uxunicorns.com",
        avgRating: null,
    },
    {
        id: 5,
        teamName: "Cloud Crusaders",
        domain: "Cloud Computing",
        repoLink: "https://github.com/cloudcrusaders",
        liveLink: "https://cloudcrusaders.com",
        avgRating: 9.2,
    },
];

const ratingParameters: RatingParameter[] = [
    {
        name: "Innovation",
        description: "Originality of solution & Technological creativity",
    },
    {
        name: "Technical Complexity",
        description: "Code quality & Implementation difficulty",
    },
    {
        name: "Problem Solving",
        description: "Solution relevance & Problem identification",
    },
    {
        name: "Functionality",
        description: "Working prototype & Core feature completion",
    },
    { name: "User Experience", description: "Interface design & Usability" },
    {
        name: "Presentation",
        description: "Pitch clarity & Communication skills",
    },
    {
        name: "Design Aesthetics",
        description: "Visual appeal & User interface",
    },
    {
        name: "Future Potential",
        description: "Scalability & Development roadmap",
    },
];

const SubmittedProjects: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showRated, setShowRated] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(true);
    

    const filteredProjects = projects.filter(
        (project) =>
            project.teamName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (showRated ? project.avgRating === null : true),
    );

    const handleRatingChange = (paramName: string, value: string) => {
        setRatings((prev) => ({
            ...prev,
            [paramName]: Number.parseInt(value) || 0,
        }));
    };

    // const fetchData = async () => {
    //     const accessToken =  localStorage.getItem("accessToken");
    //     const response = await fetch(baseUrl, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     });
    //     const data = await response.json();
    //     setProjects(data);
    //     setLoading(false);
    // }

    // useEffect(() => {
    // }, [projects]);

    const handleSubmitRating = async (e:any) => {
        if (selectedProject) {
            const totalRating = Object.values(ratings).reduce(
                (sum, rating) => sum + rating,
                0,
            );
            const avgRating = totalRating / ratingParameters.length;

            setProjects((prev) =>
                prev.map((project) =>
                    project.id === selectedProject.id
                        ? { ...project, avgRating }
                        : project,
                ),
            );

            // const accessToken =  localStorage.getItem("accessToken");

            // const formData = projects.map((item)=>item.id===selectedProject.id?{...item,avgRating}:item);
            // console.log(formData);
            // const response = await fetch(baseUrl ,{
            //     method: "PATCH",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${accessToken}`,
            //     },
            //     body: JSON.stringify(formData),
            // })


            // const data = await response.json();
            // setProjects(data);
            setSelectedProject(null);
            setRatings({});
            setIsDialogOpen(false);
        }

        console.log(projects);
        
    };


    // if (loading) {
    //     return <div className="w-full h-screen text-4xl flex justify-center items-center animate-bounce">Loading <span className="animate-pulse">.....</span></div>;
        
    // }

    return (
        <div className="container mx-auto bg-white space-y-6 p-6">
            <h1 className="mb-6 text-center text-3xl font-bold">
                Submitted Projects
            </h1>

            <div className="mb-4 flex items-center justify-between">
                <Input
                    type="text"
                    placeholder="Search by team name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex items-center space-x-2">
                    <Switch
                        id="rated-toggle"
                        checked={showRated}
                        onCheckedChange={setShowRated}
                    />
                    <Label htmlFor="rated-toggle">
                        Show only unrated projects
                    </Label>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Team Name</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Repo Link</TableHead>
                        <TableHead>Live Link</TableHead>
                        <TableHead>Avg Rating</TableHead>
                        <TableHead>Rate Project</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredProjects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>{project.id}</TableCell>
                            <TableCell className="font-medium">
                                {project.teamName}
                            </TableCell>
                            <TableCell>{project.domain}</TableCell>
                            <TableCell>
                                <a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Repository
                                </a>
                            </TableCell>
                            <TableCell>
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Live Demo
                                </a>
                            </TableCell>
                            <TableCell>
                                {project.avgRating !== null ? (
                                    <div className="flex items-center">
                                        <Star className="mr-1 h-4 w-4 text-yellow-400" />
                                        {project.avgRating.toFixed(1)}
                                    </div>
                                ) : (
                                    <span className="text-gray-500">
                                        Pending
                                    </span>
                                )}
                            </TableCell>
                            <TableCell>
                                <Dialog
                                    open={isDialogOpen}
                                    onOpenChange={setIsDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedProject(project);
                                                setRatings({});
                                                setIsDialogOpen(true);
                                            }}
                                        >
                                            Rate
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Rate Project:{" "}
                                                {selectedProject?.teamName}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            {ratingParameters.map(
                                                (param, index) => (
                                                    <div
                                                        key={index}
                                                        className="grid grid-cols-4 items-center gap-4"
                                                    >
                                                        <Label
                                                            htmlFor={`rating-${index}`}
                                                            className="text-right"
                                                        >
                                                            {param.name}
                                                        </Label>
                                                        <Input
                                                            id={`rating-${index}`}
                                                            type="number"
                                                            min="0"
                                                            max="10"
                                                            value={
                                                                ratings[
                                                                    param.name
                                                                ] || ""
                                                            }
                                                            onChange={(e) =>
                                                                handleRatingChange(
                                                                    param.name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                        <Button
                                            type="submit"
                                            onClick={handleSubmitRating}
                                        >
                                            Submit Rating
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SubmittedProjects;
