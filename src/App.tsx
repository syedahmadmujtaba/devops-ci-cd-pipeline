import { useState, useEffect, useRef } from 'react';

// Simulated Logs Data
const LOG_Sequence = [
  { text: "Starting build and push action...", delay: 200 },
  { text: "Docker client version: 28.0.4 (API 1.48)", delay: 400 },
  { text: "Context: default | OS/Arch: linux/amd64", delay: 600 },
  { text: "#1 [internal] load build definition from Dockerfile", delay: 1000 },
  { text: "#1 DONE 0.0s", delay: 1200 },
  { text: "#8 [build 1/6] FROM docker.io/library/node:20-alpine", delay: 1500 },
  { text: "#8 sha256:658d0f63... 3.86MB / 3.86MB done", delay: 1800 },
  { text: "#12 [build 4/6] RUN npm install", delay: 2500, type: 'command' },
  { text: "added 176 packages, and audited 177 packages in 3s", delay: 3500 },
  { text: "#14 [build 6/6] RUN npm run build", delay: 4000, type: 'command' },
  { text: "vite v7.3.1 building client environment for production...", delay: 4500 },
  { text: "✓ 32 modules transformed.", delay: 5000 },
  { text: "dist/index.html 0.47 kB | dist/assets/index.js 193.91 kB", delay: 5200 },
  { text: "#19 pushing ***/my-vite-app:latest with docker", delay: 6000, type: 'command' },
  { text: "pushing layer 99128453d3db... done", delay: 6500 },
  { text: "Digest: sha256:5b7d5aa51b6357f7623044507e79c1f9ce05722e3abfde2d07fda0f6718dcef7", delay: 7000 },
  { text: "--- Initiating Deployment to AWS EC2 ---", delay: 7500, type: 'success' },
  { text: "Connecting to host *** (ssh-action v0.1.10)", delay: 8000 },
  { text: "======CMD======", delay: 8200 },
  { text: "docker pull ***/my-vite-app:latest", delay: 8500, type: 'command' },
  { text: "Status: Downloaded newer image for ***/my-vite-app:latest", delay: 9500 },
  { text: "docker stop vite-app || true", delay: 10000, type: 'command' },
  { text: "vite-app", delay: 10500 },
  { text: "docker rm vite-app || true", delay: 11000, type: 'command' },
  { text: "vite-app", delay: 11200 },
  { text: "docker run -d --name vite-app -p 80:80 --restart always", delay: 11500, type: 'command' },
  { text: "e4ac2fdf4fcc54538a45479d3a980458b193192159dfb62214ba703915b93840", delay: 12000 },
  { text: "✅ Successfully executed commands to all host.", delay: 12500, type: 'success' },
];

function App() {
  const [scrolled, setScrolled] = useState(0);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState<{ text: string, type?: string }[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = totalScroll / windowHeight;
      setScrolled(scrollProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Log Simulation
  useEffect(() => {
    if (showLogs) {
      setLogs([]); // Reset logs
      let timeouts: number[] = [];

      LOG_Sequence.forEach(({ text, delay, type }) => {
        const timeout = setTimeout(() => {
          setLogs(prev => [...prev, { text, type }]);
        }, delay);
        timeouts.push(timeout);
      });

      return () => timeouts.forEach(clearTimeout);
    }
  }, [showLogs]);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-ink font-sans selection:bg-black selection:text-white">

      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 bg-white/80 backdrop-blur-md border-b border-black/5 text-ink">
        <div className="text-sm font-bold tracking-[0.2em] uppercase text-black">DevOps V3.0</div>
        <div className="text-xs font-mono font-medium">
          SCROLL PROGRESS: {Math.round(scrolled * 100)}%
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col justify-center px-6 md:px-20 lg:px-32 max-w-[1600px] mx-auto">
        <div className="relative z-10">
          <div className="mb-6 inline-block">
            <div className="px-4 py-2 bg-black text-white text-xs font-bold tracking-widest uppercase rounded-sm animate-slide-up">
              Continuous Integration & Deployment
            </div>
          </div>
          <h1 className="font-serif text-7xl md:text-9xl lg:text-[11rem] leading-[0.8] tracking-tighter text-black mb-12 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Pipe<span className="italic font-light text-black/70">line.</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-12 md:items-end animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <p className="max-w-md text-xl text-black/80 font-medium leading-relaxed">
              An automated journey from code commit to cloud deployment. Orchestrated with precision using GitHub Actions, Docker, and AWS.
            </p>
            <div className="h-px bg-black w-24 md:w-48 mb-6"></div>
            <div className="flex gap-4">
              {['GitHub', 'Docker', 'AWS'].map((tech) => (
                <span key={tech} className="px-5 py-2 border-2 border-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-default shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-[1600px] mx-auto border-x border-black/5 bg-white shadow-2xl">

        {/* Step 1: Commit */}
        <section className="min-h-screen flex flex-col md:flex-row border-t border-black/10">
          <div className="md:w-1/2 p-12 md:sticky md:top-0 md:h-screen flex flex-col justify-between bg-[#F1F5F9]">
            <div className="text-9xl font-serif text-black/10 font-bold">01</div>
            <div className="flex-1 flex items-center justify-center p-12">
              <div className="w-full aspect-square bg-white border-2 border-black rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,0.1)] flex items-center justify-center p-12 relative overflow-hidden group hover:shadow-[12px_12px_0px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <svg className="w-40 h-40 text-black relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-2 text-accent-blue">Source Control</h3>
              <h2 className="text-5xl font-serif text-black">GitHub Actions</h2>
            </div>
          </div>
          <div className="md:w-1/2 p-12 md:min-h-screen flex items-center bg-white">
            <div className="space-y-12 max-w-lg mx-auto">
              <p className="text-3xl font-light text-black leading-tight">
                Every journey begins with a commit. The moment code hits the <span className="font-medium bg-yellow-200 px-1">main branch</span>, the workflow awakens.
              </p>
              <div className="space-y-6">
                <div className="bg-white p-8 border-2 border-black/5 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-3 text-black">
                    <span className="w-3 h-3 bg-green-500 rounded-full ring-2 ring-green-200"></span>
                    Trigger Event
                  </h4>
                  <p className="text-base text-black/70 font-medium">Push to main branch detected by Webhook.</p>
                </div>
                <div className="bg-white p-8 border-2 border-black/5 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-3 text-black">
                    <span className="w-3 h-3 bg-blue-500 rounded-full ring-2 ring-blue-200"></span>
                    Checkout
                  </h4>
                  <p className="text-base text-black/70 font-medium">Runner spins up Ubuntu-latest and clones the repository.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Build */}
        <section className="min-h-screen flex flex-col md:flex-row border-t border-black/10">
          <div className="md:w-1/2 p-12 md:sticky md:top-0 md:h-screen flex flex-col justify-between bg-[#F1F5F9] md:order-last">
            <div className="text-9xl font-serif text-black/10 font-bold text-right">02</div>
            <div className="flex-1 flex items-center justify-center p-12">
              <div className="w-full aspect-square bg-white border-2 border-black rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,0.1)] flex items-center justify-center p-12">
                <svg className="w-40 h-40 text-accent-blue" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.82 17.275c-.684 0-1.306-.56-1.306-1.24s.622-1.24 1.306-1.24h2.769c.684 0 1.306.56 1.306 1.24s-.622 1.24-1.306 1.24H4.82zm9.805 0c-.684 0-1.306-.56-1.306-1.24s.622-1.24 1.306-1.24h2.769c.684 0 1.306.56 1.306 1.24s-.622 1.24-1.306 1.24h-2.769zM19.346 12.63c-.684 0-1.306-.56-1.306-1.24s.622-1.24 1.306-1.24h2.769c.684 0 1.306.56 1.306 1.24s-.622 1.24-1.306 1.24h-2.769zm-4.904 0c-.684 0-1.306-.56-1.306-1.24s.622-1.24 1.306-1.24h2.769c.684 0 1.306.56 1.306 1.24s-.622 1.24-1.306 1.24h-2.769zM9.538 12.63c-.684 0-1.306-.56-1.306-1.24s.622-1.24 1.306-1.24h2.769c.684 0 1.306.56 1.306 1.24s-.622 1.24-1.306 1.24H9.538zm4.904-4.644c-.684 0-1.306-.56-1.306-1.24s.622-1.24 1.306-1.24h2.769c.684 0 1.306.56 1.306 1.24s-.622 1.24-1.306 1.24h-2.769zM19.28 17.65c-2.02.261-3.692.42-6.52.42-1.127 0-4.085-.127-6.516-.42-3.845-.48-5.34-3.567-3.955-5.405.547-.723 1.96-1.228 3.256-1.366l.016-1.89h1.72v-1.996H9.135v-1.92h1.68V3h1.743v2.074h1.745v1.92h1.706v1.998h1.722v1.888c3.056.402 3.868 1.487 4.14 2.155 1.096 2.585-.694 4.887-3.591 4.615z" />
                </svg>
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-2 text-accent-blue">Build & Package</h3>
              <h2 className="text-5xl font-serif text-black">Docker Hub</h2>
            </div>
          </div>
          <div className="md:w-1/2 p-12 md:min-h-screen flex items-center border-r border-black/10 bg-white">
            <div className="space-y-12 max-w-lg mx-auto">
              <p className="text-3xl font-light text-black leading-tight">
                Consistency is key. We encapsulate the application and its environment into an immutable <span className="font-medium bg-blue-100 px-1">Docker Image</span>.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 border-2 border-black/10 text-center rounded-xl shadow-sm">
                  <div className="text-xs text-black/50 font-bold uppercase mb-2 tracking-wider">Image Size</div>
                  <div className="font-mono font-bold text-3xl text-black">92 MB</div>
                </div>
                <div className="bg-white p-6 border-2 border-black/10 text-center rounded-xl shadow-sm">
                  <div className="text-xs text-black/50 font-bold uppercase mb-2 tracking-wider">Base OS</div>
                  <div className="font-mono font-bold text-3xl text-black">Alpine</div>
                </div>
              </div>
              <div className="bg-[#1C1917] text-gray-300 p-8 font-mono text-sm leading-8 rounded-xl shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <span className="text-purple-400">docker</span> build -t my-app .<br />
                <span className="text-purple-400">docker</span> push my-app:latest
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Deploy */}
        <section className="min-h-screen flex flex-col md:flex-row border-t border-black/10">
          <div className="md:w-1/2 p-12 md:sticky md:top-0 md:h-screen flex flex-col justify-between bg-[#F1F5F9]">
            <div className="text-9xl font-serif text-black/10 font-bold">03</div>
            <div className="flex-1 flex items-center justify-center p-12">
              <div className="w-full aspect-square bg-white border-2 border-black rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,0.1)] flex items-center justify-center p-12">
                <svg className="w-40 h-40 text-accent-orange" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-2 text-accent-orange">Production</h3>
              <h2 className="text-5xl font-serif text-black">AWS EC2</h2>
            </div>
          </div>
          <div className="md:w-1/2 p-12 md:min-h-screen flex items-center border-l border-black/10 bg-white">
            <div className="space-y-12 max-w-lg mx-auto">
              <p className="text-3xl font-light text-black leading-tight">
                The finale. The new code goes live on a secure <span className="font-medium bg-orange-100 px-1 text-black">EC2 server</span>, replacing the old container with zero downtime.
              </p>
              <div className="p-8 bg-stone-50 rounded-xl border border-black/5">
                <ul className="space-y-4 font-mono text-sm">
                  <li className="flex items-center gap-4 text-black">
                    <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px]">✓</span>
                    <span className="font-bold">SSH Connection Established</span>
                  </li>
                  <li className="flex items-center gap-4 text-black">
                    <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px]">✓</span>
                    <span className="font-bold">docker pull latest</span>
                  </li>
                  <li className="flex items-center gap-4 text-black">
                    <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px]">✓</span>
                    <span className="font-bold">Restart Container</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setShowLogs(true)}
                  className="w-full py-4 bg-black text-white font-bold tracking-widest uppercase hover:bg-accent-blue transition-colors shadow-lg active:transform active:scale-[0.99]"
                >
                  View Deployment Logs
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Terminal Modal */}
      {showLogs && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-3xl bg-[#0c0c0c] rounded-xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[80vh]">
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <button onClick={() => setShowLogs(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400"></button>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs font-mono text-white/40">ec2-user@ip-18-234-56-78: ~</div>
              <div className="w-8"></div>
            </div>

            {/* Logs Content */}
            <div className="p-6 font-mono text-sm overflow-y-auto custom-scrollbar flex-1 space-y-2">
              {logs.map((log, index) => (
                <div key={index} className={`${log.type === 'command' ? 'text-blue-400' : log.type === 'success' ? 'text-green-400 font-bold' : 'text-white/80'}`}>
                  {log.type === 'command' && <span className="text-white/50 mr-2">$</span>}
                  {log.text}
                </div>
              ))}
              <div ref={logsEndRef}></div>
              {logs.length === LOG_Sequence.length && (
                <div className="animate-pulse text-white/50">_</div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="py-24 text-center border-t border-black/10 bg-white">
        <h2 className="font-serif text-4xl mb-6 text-black">Designed for Automation</h2>
        <p className="font-mono text-xs text-black/50">
          &copy; 2026 DEVOPS PIPELINE. ALL SYSTEMS OPERATIONAL.
        </p>
      </footer>
    </div>
  )
}

export default App
