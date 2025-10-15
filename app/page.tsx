import React from 'react';
import { UserCard } from '@/components/UserCard';
import { CodeBlock } from '@/components/CodeBlock';
import { User } from '@/types';

// This is a Server Component, so we can fetch data directly on the server during the render process.
async function getUsers(): Promise<User[]> {
  // Use the full URL, which is more robust. In a real production app,
  // this URL would come from an environment variable.
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/users`, {
    // We disable caching for this fetch request to ensure we always get fresh data on each page load,
    // which is useful for demonstrating the live API endpoint.
    cache: 'no-store',
  });

  if (!res.ok) {
    // This will be caught by the nearest Error Boundary
    throw new Error('Failed to fetch user data');
  }

  return res.json();
}

const apiRouteCode = `import { NextResponse } from 'next/server';
import { MOCK_USERS_DATA } from '@/constants';

// This file is located at: app/api/users/route.ts
export async function GET(request: Request) {
  // In a real app, fetch this from a database
  const users = MOCK_USERS_DATA;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(users);
}`;

const Page = async () => {
  let users: User[] = [];
  try {
    users = await getUsers();
  } catch (error) {
    console.error(error);
    // Render a fallback or error state if the fetch fails
    return <div className="text-red-500 text-center p-8">Failed to load user data. Is the server running?</div>
  }
  
  const jsonData = JSON.stringify(users, null, 2);

  return (
    <div className="min-h-screen text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Next.js API Server
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            This Next.js app serves and displays data from a server-side API Route.
          </p>
        </header>

        <section id="data-preview">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 border-l-4 border-cyan-400 pl-4">
            Live Data Preview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </section>

        <section id="api-details" className="mt-16">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 border-l-4 border-cyan-400 pl-4">
            API Endpoint & Raw Data
          </h2>
          <p className="text-gray-400 mb-4">
            The data above is fetched from a live Next.js API Route. You can call this GET endpoint from any other application.
          </p>
          <CodeBlock 
            code={jsonData} 
            language="JSON" 
            endpoint="/api/users" 
          />
        </section>
        
        <section id="explanation" className="mt-16 bg-gray-800 p-6 rounded-lg shadow-inner">
           <h2 className="text-2xl font-bold text-amber-400 mb-6 border-l-4 border-amber-400 pl-4">
             How It Works
           </h2>
           <div className="space-y-4 text-gray-300">
             <p>
               This is a <strong className="text-white">full-stack Next.js application</strong>. It uses API Routes to create a real backend endpoint.
             </p>
             <p>
               The file at <code className="bg-black/40 px-2 py-1 rounded-md text-sm font-mono text-cyan-300">app/api/users/route.ts</code> creates the <code className="bg-black/40 px-2 py-1 rounded-md text-sm font-mono text-cyan-300">/api/users</code> endpoint. This page (a Server Component) fetches data from that endpoint before it's rendered.
             </p>
             <p>
               Here is the code for the API route:
             </p>
             <div className="bg-black bg-opacity-40 rounded-md">
                <CodeBlock 
                  code={apiRouteCode}
                  language="TypeScript"
                  endpoint="File: app/api/users/route.ts"
                />
             </div>
           </div>
        </section>
      </main>
       <footer className="text-center mt-16 text-gray-500 text-sm">
        <p>Built with Next.js, React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default Page;
