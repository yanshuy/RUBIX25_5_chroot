import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../App";
import { formData } from "../Register";

const LeaderForm = ({ formData, setFormData, setActiveTab }) => {
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
        if (!formData.fullName) {
            newErrors.fullName = "First name is required";
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
        }

        setActiveTab("TDetails");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetch(`${baseUrl}/api/users/me/get`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "ngrok-skip-browser-warning": "true",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData({
                    email: data.email,
                    mobile: data.mobile,
                    fullName: data.fullname,
                    gender: data.gender,
                });
            });
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
                            value={formData.fullName}
                            onChange={handleChange}
                            className={errors.fullName ? "border-red-500" : ""}
                            placeholder="First Name"
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
