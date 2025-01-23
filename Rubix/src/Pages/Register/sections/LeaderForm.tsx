import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../App";
import { m } from "framer-motion";

// Define a more robust interface for form data
interface FormData {
    email: string;
    mobile: string;
    fullName: string;
    gender: "male" | "female" | "others";
}

// Define an interface for errors
interface FormErrors {
    email?: string;
    mobile?: string;
    fullName?: string;
    gender?: string;
}

const LeaderForm = ({ formData, setFormData, setActiveTab, setTeam }) => {
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Email validation with more comprehensive regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Mobile validation for Indian phone numbers
        const mobileRegex = /^(\+91\s?)?[6-9]\d{9}$/;
        if (!formData.mobile) {
            newErrors.mobile = "Mobile number is required";
        } else if (!mobileRegex.test(formData.mobile)) {
            newErrors.mobile =
                "Please enter a valid 10-digit Indian mobile number";
        }

        // Full name validation
        if (!formData.fullName || formData.fullName.trim().length < 2) {
            newErrors.fullName =
                "Full name is required and must be at least 2 characters long";
        }

        // Gender validation
        if (!formData.gender) {
            newErrors.gender = "Please select a gender";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                // Attempt to submit form or move to next tab
                setTeam((prev) => ({
                    team: "",
                    members: [{ ...formData, status: "verified" }],
                }));
                console.log("Form submitted:", formData);

                setActiveTab("TDetails");
            } catch (error) {
                console.error("Submission error:", error);
            }
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/users/me/get`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "ngrok-skip-browser-warning": "true",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }

                const data = await response.json();
                setFormData({
                    email: data.email || "",
                    mobile: data.mobile || "",
                    fullName: data.fullname || "",
                    gender: data.gender || "",
                });
            } catch (error) {
                console.error("Error fetching user details:", error);
                // Optionally show error toast or message
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <Card className="mx-auto my-8 w-full max-w-2xl">
            <CardHeader>
                <h2 className="text-2xl font-bold">Leader Details</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "border-red-500" : ""}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Mobile Field */}
                    <div className="space-y-2">
                        <Label htmlFor="mobile">
                            Mobile<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            value={formData.mobile}
                            onChange={handleChange}
                            className={errors.mobile ? "border-red-500" : ""}
                            placeholder="+91 9XXXXXXXXX"
                        />
                        {errors.mobile && (
                            <p className="text-sm text-red-500">
                                {errors.mobile}
                            </p>
                        )}
                    </div>

                    {/* Full Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">
                            Full Name<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={errors.fullName ? "border-red-500" : ""}
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                            <p className="text-sm text-red-500">
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    {/* Gender Field */}
                    <div className="space-y-2">
                        <Label>
                            Gender<span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            name="gender"
                            value={formData.gender}
                            onValueChange={(value) =>
                                handleChange({
                                    target: {
                                        name: "gender",
                                        value,
                                    },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                            className="flex flex-wrap gap-4"
                        >
                            {["female", "male", "others"].map((gender) => (
                                <div
                                    key={gender}
                                    className="flex items-center space-x-2"
                                >
                                    <RadioGroupItem
                                        value={gender}
                                        id={gender}
                                    />
                                    <Label htmlFor={gender}>
                                        {gender.charAt(0).toUpperCase() +
                                            gender.slice(1)}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        {errors.gender && (
                            <p className="text-sm text-red-500">
                                {errors.gender}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default LeaderForm;
