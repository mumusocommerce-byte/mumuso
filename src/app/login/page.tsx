"use client";

import * as React from "react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const res = await login(formData);

        if (res?.error) {
            setError(res.error);
            toast.error("Login Failed", { description: res.error });
            setLoading(false);
        } else {
            toast.success("Welcome back!", { description: "You have successfully logged in." });
            router.push("/account");
            router.refresh();
        }
    };

    return (
        <div className="container mx-auto px-6 py-20 flex justify-center">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="text-muted-foreground mt-2">Enter your email to sign in to your account</p>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-destructive/15 text-destructive text-sm font-medium border border-destructive/20 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
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
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="text-sm font-medium text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
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
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/register" className="font-semibold text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
