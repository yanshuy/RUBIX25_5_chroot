import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

type formData = {
    email: string;
    mobile: string;
    firstName: string;
    lastName: string;
    gender: string;
};

const LeaderForm = () => {
    const [formData, setFormData] = useState<formData>({
        email: "",
        mobile: "",
        firstName: "",
        lastName: "",
        gender: "",
    });

    const [errors, setErrors] = useState<formData>({});

    const validateForm = () => {
        const newErrors: formData = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        // Mobile validation
        if (!formData.mobile) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^\+91\s\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Please enter a valid Indian mobile number";
        }

        // First name validation
        if (!formData.firstName) {
            newErrors.firstName = "First name is required";
        }

        // Gender validation
        if (!formData.gender) {
            newErrors.gender = "Please select a gender";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("Form submitted:", formData);
            // Add your submit logic here
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Card className="mx-auto my-8 w-full max-w-2xl">
            <CardHeader>
                <h2 className="text-2xl font-bold">Player Details</h2>
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
                            placeholder="Email"
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
                        <div className="flex items-center space-x-2">
                            <Input
                                id="mobile"
                                name="mobile"
                                type="tel"
                                value={formData.mobile}
                                onChange={handleChange}
                                className={
                                    errors.mobile ? "border-red-500" : ""
                                }
                                placeholder="+91 9XXXXXXXXX"
                            />
                        </div>
                        {errors.mobile && (
                            <p className="text-sm text-red-500">
                                {errors.mobile}
                            </p>
                        )}
                    </div>

                    {/* First Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="firstName">
                            First Name<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={errors.firstName ? "border-red-500" : ""}
                            placeholder="First Name"
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-500">
                                {errors.firstName}
                            </p>
                        )}
                    </div>

                    {/* Last Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="lastName">
                            Last Name (if applicable)
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
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
                                    target: { name: "gender", value },
                                })
                            }
                            className="flex flex-wrap gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Male</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="others" id="others" />
                                <Label htmlFor="others">Others</Label>
                            </div>
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
