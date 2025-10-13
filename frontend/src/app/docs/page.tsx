'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Database, Settings, Rocket, Github, Terminal, Shield, Clock, Key, Code, Package, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarSections = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '#introduction', icon: BookOpen },
        { title: 'Installation', href: '#installation', icon: Rocket },
        { title: 'Prerequisites', href: '#prerequisites', icon: Package },
      ]
    },
    {
      title: 'CLI Usage',
      items: [
        { title: 'Create a Share', href: '#create-share', icon: Key },
        { title: 'Retrieve a Share', href: '#retrieve-share', icon: Terminal },
        { title: 'Revoke a Share', href: '#revoke-share', icon: Shield },
      ]
    },
    {
      title: 'API Reference',
      items: [
        { title: 'POST /api/shares', href: '#api-create', icon: Code },
        { title: 'POST /api/shares/retrieve', href: '#api-retrieve', icon: Code },
      ]
    },
    {
      title: 'Configuration',
      items: [
        { title: 'Environment Variables', href: '#environment', icon: Settings },
        { title: 'Security Setup', href: '#security', icon: Shield },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">🔐 Keyshare</span>
          </Link>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
                <Search className="mr-2 h-4 w-4" />
                <span className="hidden lg:inline-flex">Search documentation...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>
            <nav className="flex items-center gap-2">
              <Link href="/auth/sign-in">
                <Button size="sm" variant="ghost">Sign In</Button>
              </Link>
              <a href="https://github.com/FuadTesfaye/keyshare-package" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
            </nav>
          </div>
        </div>
      </nav>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        <aside className={`fixed top-14 z-30 -ml-2 ${sidebarOpen ? '' : 'hidden'} h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block`}>
          <div className="py-6 pr-6 lg:py-8">
            {sidebarSections.map((section, idx) => (
              <div key={idx} className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{section.title}</h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  {section.items.map((item, itemIdx) => (
                    <a
                      key={itemIdx}
                      href={item.href}
                      className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground hover:text-foreground"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto w-full min-w-0 max-w-3xl">
            {/* Introduction */}
            <div id="introduction" className="mb-12 scroll-mt-20">
              <div className="space-y-2">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Keyshare Documentation</h1>
                <p className="text-lg text-muted-foreground">
                  A secure, developer-friendly platform for sharing secrets with colleagues using short-lived, one-time codes.
                </p>
              </div>
            </div>

            {/* What is Keyshare */}
            <div className="mb-12">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                What is Keyshare?
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Keyshare lets you securely share API keys, tokens, and other secrets with teammates without using insecure channels like Slack or email.
              </p>
              <div className="my-6 w-full overflow-y-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How it works:</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li><strong>Sender</strong> runs <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">keyshare init</code> with a secret → gets an 8-character code</li>
                      <li><strong>Sender</strong> shares the code via any channel</li>
                      <li><strong>Receiver</strong> runs <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">keyshare fetch</code> with the code</li>
                      <li>Code expires after 10 minutes and can only be used once</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                Features
              </h2>
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-500" />
                      Secure by Default
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    AES-256-GCM encryption, HMAC-SHA256 code hashing
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Short-Lived
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Configurable TTL (default 10 minutes)
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Key className="h-4 w-4 text-green-500" />
                      One-Time Use
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Shares are deleted after retrieval
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-orange-500" />
                      Easy to Use
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Simple CLI with beautiful output
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Prerequisites */}
            <div id="prerequisites" className="mb-12 scroll-mt-20">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                Prerequisites
              </h2>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Node.js 18.x or higher</li>
                <li>MongoDB 6.x (or use Docker Compose)</li>
                <li>npm or yarn package manager</li>
              </ul>
            </div>

            {/* Installation */}
            <div id="installation" className="mb-12 scroll-mt-20">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                Installation
              </h2>
              
              <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Using Docker Compose (Recommended)
              </h3>
              <div className="my-6 w-full overflow-y-auto">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
                  <code className="relative rounded font-mono text-sm text-green-400">{`# Clone the repository
git clone https://github.com/FuadTesfaye/keyshare-package.git
cd keyshare

# Generate a master key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Create .env file
echo "KEYSHARE_MASTER_KEY=<your-generated-key>" > .env

# Start the services
docker compose up -d

# Install CLI globally
cd packages/cli
npm install -g .`}</code>
                </pre>
              </div>
            </div>

            {/* CLI Usage - Create Share */}
            <div id="create-share" className="mb-12 scroll-mt-20">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                Create a Share
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Use the CLI to create a secure share with a short-lived code.
              </p>
              <div className="my-6 w-full overflow-y-auto">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
                  <code className="relative rounded font-mono text-sm text-green-400">{`# Interactive mode
keyshare init

# From file
keyshare init --from-file ./secret.txt

# Custom TTL (5 minutes)
keyshare init --ttl 5`}</code>
                </pre>
              </div>
            </div>

            {/* CLI Usage - Retrieve Share */}
            <div id="retrieve-share" className="mb-12 scroll-mt-20">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                Retrieve a Share
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Fetch a shared secret using the code you received.
              </p>
              <div className="my-6 w-full overflow-y-auto">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
                  <code className="relative rounded font-mono text-sm text-green-400">{`# Interactive mode
keyshare fetch

# With code
keyshare fetch --code AB12XY9Q`}</code>
                </pre>
              </div>
            </div>

            {/* CLI Usage - Revoke Share */}
            <div id="revoke-share" className="mb-12 scroll-mt-20">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                Revoke a Share
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Revoke a share before it's used or expires.
              </p>
              <div className="my-6 w-full overflow-y-auto">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
                  <code className="relative rounded font-mono text-sm text-green-400">{`keyshare revoke --code AB12XY9Q`}</code>
                </pre>
              </div>
            </div>

            {/* API Reference - Create */}
            <div id="api-create" className="mb-12 scroll-mt-20">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                POST /api/shares
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Create a new share programmatically.
              </p>
              <h3 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">Request:</h3>
              <div className="my-6 w-full overflow-y-auto">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
                  <code className="relative rounded font-mono text-sm text-green-400">{`{
  "secret": "my-api-key-12345",
  "ttlMinutes": 10
}`}</code>
                </pre>
              </div>
              <h3 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">Response:</h3>
              <div className="my-6 w-full overflow-y-auto">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
                  <code className="relative rounded font-mono text-sm text-green-400">{`{
  "shareCode": "AB12XY9Q",
  "expiresAt": "2025-10-04T09:33:32.000Z"
}`}</code>
                </pre>
              </div>
            </div>

            {/* API Reference - Retrieve */}
            <div id="api-retrieve" className="mb-12 scroll-mt-20">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                POST /api/shares/retrieve
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Retrieve a share by code.
              </p>
              <h3 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">Request:</h3>
              <div className="my-6 w-full overflow-y-auto">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
                  <code className="relative rounded font-mono text-sm text-green-400">{`{
  "shareCode": "AB12XY9Q"
}`}</code>
                </pre>
              </div>
            </div>

            {/* Environment Variables */}
            <div id="environment" className="mb-12 scroll-mt-20">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                Environment Variables
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Configure Keyshare server with these environment variables.
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">MONGO_URI</code> - MongoDB connection string (required)</li>
                <li><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">KEYSHARE_MASTER_KEY</code> - 32-byte encryption key (required)</li>
                <li><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">KEYSHARE_PORT</code> - Server port (default: 4000)</li>
                <li><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">KEYSHARE_TTL_MINUTES</code> - Default share TTL (default: 10)</li>
              </ul>
            </div>

            {/* Security Setup */}
            <div id="security" className="mb-12 scroll-mt-20">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                Security Setup
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Generate a secure master encryption key for your Keyshare instance.
              </p>
              <div className="my-6 w-full overflow-y-auto">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
                  <code className="relative rounded font-mono text-sm text-green-400">{`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`}</code>
                </pre>
              </div>
              <div className="my-6 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">⚠️ Important:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  <li>Store the master key securely</li>
                  <li>Never commit the master key to version control</li>
                  <li>Rotating the key will invalidate all existing shares</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 border-t pt-6">
              <div className="flex justify-between items-center">
                <Link href="/">
                  <Button variant="ghost">← Back to Home</Button>
                </Link>
                <a href="https://github.com/FuadTesfaye/keyshare-package" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
