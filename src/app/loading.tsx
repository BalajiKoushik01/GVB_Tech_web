import { Code2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex-1 min-h-[60vh] bg-background flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-start/20 rounded-full blur-[80px]" />

            <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center mb-6 shadow-2xl shadow-accent-start/20 animate-pulse">
                <Code2 className="w-10 h-10 text-white animate-bounce" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground relative z-10 animate-pulse">
                Loading...
            </h2>
        </div>
    );
}
