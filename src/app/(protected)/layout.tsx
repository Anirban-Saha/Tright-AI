import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import AppSidebar from "./dashboard/app-sidebar";

type Props = {
    children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full m-2">
                <div className="flex items-center gap-2 h-16 border-sidebar-border bg-sidebar border shadow rounded-md p-2 px-4">
                    <div className="ml-auto"></div>
                    {/* Increased UserButton size */}
                    <div className="scale-125">
                        <UserButton />
                    </div>
                </div>
                <div className="h-4"></div>
                <div className="border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
};

export default SidebarLayout;
