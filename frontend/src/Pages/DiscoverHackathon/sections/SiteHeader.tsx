import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-fit items-center justify-between px-12">
                <Link to="/" className="flex items-center space-x-2 h-24 p-1">
                    <img src={Logo} alt="Logo" className="h-full object-cover"/>
                </Link>
                <div className="flex items-center gap-4">
                    <Button variant="outline">Host a Hackathon</Button>
                    <Button>Sign In</Button>
                </div>
            </div>
        </header>
    );
}
