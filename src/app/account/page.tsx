import { getSession, logout } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, LogOut, Package, MapPin, Heart } from "lucide-react";

export default async function AccountPage() {
    const customer = await getSession();

    if (!customer) {
        redirect("/login");
    }

    return (
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-12">

                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 shrink-0 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">My Account</h2>
                        <p className="text-muted-foreground mt-1">Welcome back, {customer.firstName}!</p>
                    </div>

                    <nav className="flex flex-col space-y-1">
                        <Button variant="secondary" className="justify-start h-12 text-base font-medium">
                            <User className="mr-3 h-5 w-5" /> Profile Overview
                        </Button>
                        <Button variant="ghost" className="justify-start h-12 text-base font-medium text-muted-foreground hover:text-foreground">
                            <Package className="mr-3 h-5 w-5" /> Order History
                        </Button>
                        <Button variant="ghost" className="justify-start h-12 text-base font-medium text-muted-foreground hover:text-foreground">
                            <MapPin className="mr-3 h-5 w-5" /> Addresses
                        </Button>
                        <Button variant="ghost" className="justify-start h-12 text-base font-medium text-muted-foreground hover:text-foreground">
                            <Heart className="mr-3 h-5 w-5" /> Wishlist
                        </Button>
                    </nav>

                    <form action={async () => {
                        "use server";
                        await logout();
                        redirect("/login");
                    }}>
                        <Button variant="destructive" className="w-full justify-start h-12 text-base font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 shadow-none">
                            <LogOut className="mr-3 h-5 w-5" /> Sign Out
                        </Button>
                    </form>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-8">
                    <div className="bg-muted/30 border rounded-2xl p-8 shadow-sm">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" /> Personal Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Name</p>
                                <p className="text-base font-semibold">{customer.firstName} {customer.lastName}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                                <p className="text-base font-semibold">{customer.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                                <p className="text-base font-semibold">{customer.phone || "Not provided"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-muted/30 border rounded-2xl p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" /> Default Address
                            </h3>
                            {customer.defaultAddress ? (
                                <div className="space-y-1 text-base text-muted-foreground">
                                    <p className="font-medium text-foreground">{customer.firstName} {customer.lastName}</p>
                                    <p>{customer.defaultAddress.address1}</p>
                                    {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
                                    <p>{customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}</p>
                                    <p>{customer.defaultAddress.country}</p>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">You haven't added a default address yet.</p>
                            )}
                            <Button variant="outline" className="mt-6">Manage Addresses</Button>
                        </div>

                        <div className="bg-muted/30 border rounded-2xl p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Package className="h-5 w-5 text-primary" /> Recent Orders
                            </h3>
                            <p className="text-muted-foreground">You don't have any recent orders.</p>
                            <Button variant="outline" className="mt-6">View All Orders</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
