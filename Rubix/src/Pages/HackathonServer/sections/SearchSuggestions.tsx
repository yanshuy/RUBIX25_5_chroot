import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Users, MessageSquare, FileCode, Book } from "lucide-react";

interface SearchSuggestionsProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchSuggestions({
    isOpen,
    onClose,
}: SearchSuggestionsProps) {
    if (!isOpen) return null;

    return (
        <Command className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-[#1E1F22] bg-[#2B2D31] bg-white 
        -md">
            <CommandInput placeholder="Type to search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Channels">
                    <CommandItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>general</span>
                    </CommandItem>
                    <CommandItem>
                        <FileCode className="mr-2 h-4 w-4" />
                        <span>technical-help</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Resources">
                    <CommandItem>
                        <Book className="mr-2 h-4 w-4" />
                        <span>Getting Started Guide</span>
                    </CommandItem>
                    <CommandItem>
                        <Book className="mr-2 h-4 w-4" />
                        <span>API Documentation</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Members">
                    <CommandItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Sarah Chen (Organizer)</span>
                    </CommandItem>
                    <CommandItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Mike Ross (Technical Lead)</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
