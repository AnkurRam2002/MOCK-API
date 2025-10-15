import React from 'react';
import { MOCK_USERS_DATA } from './constants';
import { UserCard } from './components/UserCard';
import { CodeBlock } from './components/CodeBlock';
import { User } from './types';

const App: React.FC = () => {
  const users: User[] = MOCK_USERS_DATA;
  const jsonData = JSON.stringify(users, null, 2);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mock API Data Server
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            This page simulates a GET API endpoint by displaying a static dataset.
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
            In a real application, you would make an HTTP GET request to an endpoint like the one below to retrieve this data in JSON format.
          </p>
          <CodeBlock 
            code={jsonData} 
            language="JSON" 
            endpoint="/api/users" 
          />
        </section>
        
        <section id="explanation" className="mt-16 bg-gray-800 p-6 rounded-lg shadow-inner">
           <h2 className="text-2xl font-bold text-amber-400 mb-6 border-l-4 border-amber-400 pl-4">
             Important Note for Developers
           </h2>
           <div className="space-y-4 text-gray-300">
             <p>
               This is a <strong className="text-white">frontend-only React application</strong>. It does not have a real backend server and cannot actually "host" a live API endpoint that other applications can call.
             </p>
             <p>
               The purpose of this app is to <strong className="text-white">visualize the data structure</strong> and provide the raw JSON that a real API would serve. To create a true GET API, you would need a backend service using a technology like Node.js with Express, Python with Flask/Django, or others.
             </p>
             <p>
               For example, a simple Node.js/Express server to provide this data might look like this:
             </p>
             <div className="bg-black bg-opacity-40 rounded-md p-4">
                <pre className="text-sm text-cyan-300 overflow-x-auto">
                  <code className="font-mono">
                    {`const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const users = ${JSON.stringify(users, null, 2)};

app.use(cors()); // Allow cross-origin requests

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(\`API server running at http://localhost:\${port}\`);
});`}
                  </code>
                </pre>
             </div>
           </div>
        </section>
      </main>
       <footer className="text-center mt-16 text-gray-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;