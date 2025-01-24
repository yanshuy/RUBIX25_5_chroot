import { motion } from "framer-motion";
import {
    ArrowRight,
    Code2,
    Users,
    Trophy,
    Rocket,
    Timer,
    Github,
    Globe,
    LayoutDashboard,
    Trophy as TrophyIcon,
    Calendar,
    LogOut,
} from "lucide-react"; // Import additional icons
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useState } from "react"; // Import useState for managing dropdown state

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const stats = [
    { number: "10,000+", label: "Participanting" },
    { number: "150+", label: "Projects" },
    { number: "₹50K", label: "in Prizes Daily" },
    { number: "48hrs", label: "of Innovation" },
];

const features = [
    {
        icon: Globe,
        title: "Virtual First",
        description:
            "Participate from anywhere in the world. Connect with global innovators.",
    },
    {
        icon: Users,
        title: "Team Building",
        description: "Find the perfect teammates through our matching system.",
    },
    {
        icon: Code2,
        title: "Real-time Collaboration",
        description:
            "Built-in tools for seamless project development and communication.",
    },
    {
        icon: Trophy,
        title: "Amazing Prizes",
        description:
            "Win big with prizes from our sponsors and recognition in the tech community.",
    },
    {
        icon: Timer,
        title: "Structured Timeline",
        description:
            "Clear schedule and deadlines to keep you on track throughout the event.",
    },
    {
        icon: Rocket,
        title: "Launch Pad",
        description:
            "Transform your idea into reality with mentorship and resources.",
    },
];

const featuredProjects = [
    {
        title: "EcoTrack",
        description: "AI-powered sustainability monitoring platform",
        image: "/placeholder.svg?height=400&width=600",
        tech: ["React", "TensorFlow", "Node.js"],
        team: "Green Innovation Team",
        prize: "1st Place 2023",
    },
    {
        title: "HealthHub",
        description: "Decentralized healthcare records management",
        image: "/placeholder.svg?height=400&width=600",
        tech: ["Blockchain", "React", "Solidity"],
        team: "BlockHealth",
        prize: "2nd Place 2023",
    },
    {
        title: "EduQuest",
        description: "Gamified learning platform for students",
        image: "/placeholder.svg?height=400&width=600",
        tech: ["Unity", "Python", "AWS"],
        team: "Learning Innovators",
        prize: "Community Choice",
    },
];

export default function LandingPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken"); // Clear access token
        navigate("/"); // Redirect to home page
    };

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <header className="fixed top-0 z-50 w-full border-b bg-white/80 px-6 backdrop-blur-sm">
                <div className="flex h-fit items-center justify-between">
                    <div className="mb-4 mt-2 h-20 cursor-pointer pl-5">
                        <Link to={"/"}>
                            <img
                                src={Logo}
                                alt="Logo"
                                className="h-[100%] object-cover"
                            />
                        </Link>
                    </div>
                    <nav className="hidden space-x-6 md:flex">
                        <Link
                            to="/"
                            className="text-sm font-medium hover:text-primary"
                        >
                            Home
                        </Link>
                        <Link
                            to="/discover"
                            className="text-sm font-medium hover:text-primary"
                        >
                            Explore
                        </Link>
                        <Link
                            to="#schedule"
                            className="text-sm font-medium hover:text-primary"
                        >
                            Schedule
                        </Link>
                        <Link
                            to="/forum"
                            className="text-sm font-medium hover:text-primary"
                        >
                            Forum
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        {!localStorage.getItem("accessToken") ? (
                            <>
                                <Link to={"/user/login"}>
                                    <Button variant="outline">Log In</Button>
                                </Link>
                                <Link to={"/user/register"}>
                                    <Button>Register Now</Button>
                                </Link>
                            </>
                        ) : (
                            <div className="relative">
                                <IoPersonCircleSharp
                                    className="cursor-pointer text-[3rem] text-slate-300"
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg">
                                        <ul className="py-1">
                                            <li>
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                                                >
                                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                                    User Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/dashboard/hackathons"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                                                >
                                                    <TrophyIcon className="mr-2 h-4 w-4" />
                                                    My Hackathons
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/organizerdashboard"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                                                >
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    Organizer Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700"
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Log Out
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="">
                {/* Hero Section */}
                <section className="relative min-h-[calc(100vh)] pt-20">
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
                    </div>

                    <div className="relative space-y-10 py-24 text-center">
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge className="rounded-full px-4 py-2 text-sm">
                                Registration Now Open for 2024
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                                Where Innovation Meets
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    {" "}
                                    Opportunity
                                </span>
                            </h1>
                            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                                Join the world's largest virtual hackathon
                                platform. Build amazing projects, connect with
                                talented developers, and win exciting prizes.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex justify-center space-x-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button size="lg" className="h-12 px-8">
                                Start Hacking
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 px-8"
                            >
                                Learn More
                            </Button>
                        </motion.div>

                        <motion.div
                            className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {stats.map((stat, index) => (
                                <Card
                                    key={index}
                                    className="border-none bg-white/50 shadow-none"
                                >
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-3xl font-bold">
                                            {stat.number}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className=" px-8 py-24">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Everything You Need to Succeed
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Our platform provides all the tools and support you
                            need for a successful hackathon experience
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeIn}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                            >
                                <Card className="group relative h-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                    <CardHeader>
                                        <div className="mb-2 w-fit rounded-full bg-primary/10 p-2 text-primary">
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Featured Projects */}
                <section id="projects" className="bg-slate-50 py-24">
                    <div className="">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Featured Projects
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Check out some of the amazing projects built on
                                our platform
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredProjects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeIn}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                >
                                    <Card className="group overflow-hidden">
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={
                                                    project.image ||
                                                    "/placeholder.svg"
                                                }
                                                alt={project.title}
                                                width={600}
                                                height={400}
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle>
                                                    {project.title}
                                                </CardTitle>
                                                <Badge variant="secondary">
                                                    {project.prize}
                                                </Badge>
                                            </div>
                                            <CardDescription>
                                                {project.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map(
                                                        (tech, i) => (
                                                            <Badge
                                                                key={i}
                                                                variant="outline"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        ),
                                                    )}
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Users className="mr-2 h-4 w-4" />
                                                    {project.team}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24">
                    <div className="">
                        <div className="relative bg-gradient-to-r from-primary to-secondary p-8 md:p-12 lg:p-16">
                            <div className="relative z-10 max-w-3xl text-white">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Ready to Start Your Journey?
                                </h2>
                                <p className="mt-4 text-lg opacity-90">
                                    Join thousands of developers and innovators.
                                    Register now and be part of the next big
                                    thing.
                                </p>
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="h-12 px-8"
                                    >
                                        Register Now
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t bg-slate-50 pl-8">
                <div className=" py-12">
                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Code2 className="h-6 w-6" />
                                <span className="text-xl font-bold">
                                    HackHub
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Empowering innovators to build the future.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">
                                Platform
                            </h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li>
                                    <Link to="#" className="hover:text-primary">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-primary">
                                        Projects
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-primary">
                                        Schedule
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-primary">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">
                                Resources
                            </h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li>
                                    <Link to="#" className="hover:text-primary">
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-primary">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-primary">
                                        Support
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-primary">
                                        Terms
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">
                                Connect
                            </h3>
                            <div className="flex space-x-4">
                                <Link
                                    to="#"
                                    className="rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200"
                                >
                                    <Github className="h-5 w-5" />
                                </Link>
                                <Link
                                    to="#"
                                    className="rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200"
                                >
                                    <Globe className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                        © 2024 HackHub. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
