"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Global Application Error Captured:", error);
    }, [error]);

    return (
        <div className="flex-1 min-h-[80vh] bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center mb-6 shadow-2xl">
                <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground relative z-10 mb-4 text-center">
                Something went wrong!
            </h1>

            <p className="text-lg text-foreground/70 max-w-md text-center mb-10 relative z-10">
                A critical error occurred while rendering this page. Our team has been notified.
                Please try recovering the session.
            </p>

            <div className="relative z-10 flex space-x-4">
                <Button onClick={() => reset()} size="lg" variant="primary">
                    Try Again
                </Button>
                <Button onClick={() => window.location.href = '/'} size="lg" variant="outline">
                    Return Home
                </Button>
            </div>
        </div>
    );
}
