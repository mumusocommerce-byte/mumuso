"use client";

import * as React from "react";
import { register } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const res = await register(formData);

        if (res?.error) {
            setError(res.error);
            toast.error("Registration Failed", { description: res.error });
            setLoading(false);
        } else {
            toast.success("Account Created", { description: "Your account has been successfully created." });
            router.push("/account");
            router.refresh();
        }
    };

    return (
        <div className="container mx-auto px-6 py-20 flex justify-center">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                    <p className="text-muted-foreground mt-2">Enter your information to get started</p>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-destructive/15 text-destructive text-sm font-medium border border-destructive/20 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" name="firstName" required className="h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" name="lastName" required className="h-12" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="h-12"
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
