// app/auth/error/page.tsx
import { redirect } from "next/navigation";

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  // get error message from query params
  const error = searchParams.error ?? "An error occurred during authentication";

  // redirect to /login after 2 seconds
  setTimeout(() => redirect("/login"), 2000);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-2">{error}</p>
        <p className="mt-4">Redirecting to login page...</p>
      </div>
    </div>
  );
}
