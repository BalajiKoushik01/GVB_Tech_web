import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="flex-1 min-h-[70vh] flex items-center justify-center relative overflow-hidden text-center px-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-start/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
                <h1 className="text-9xl font-bold text-gradient mb-8 animate-pulse">
                    404
                </h1>
                <h2 className="text-4xl font-bold mb-6">
                    Page Not Found
                </h2>
                <p className="text-xl text-foreground/70 mb-10">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link href="/">
                    <Button size="lg" className="px-10">Return Home</Button>
                </Link>
            </div>
        </div>
    );
}
