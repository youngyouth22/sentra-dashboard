import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage = "An unexpected error occurred.";
  let errorStatus = "Error";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
    errorStatus = error.status.toString();
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f172a] p-6 text-center text-slate-100">
      <div className="mb-6 rounded-full bg-rose-500/10 p-6">
        <AlertCircle className="h-12 w-12 text-rose-500" />
      </div>
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">{errorStatus}</h1>
      <p className="mb-8 max-w-md text-slate-400">
        {errorMessage}
      </p>
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <Link to="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Back to Safety
          </Link>
        </Button>
      </div>
      <div className="mt-12 text-xs text-slate-600">
        If this persists, please contact support with reference: <code>{Math.random().toString(36).substring(7).toUpperCase()}</code>
      </div>
    </div>
  );
}
