import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "../api/client";   // axios client import करो

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// socket.io base (strip /api)
const socketBase = API_URL.replace(/\/api\/?$/, "");
const socket = io(socketBase);

const Footer = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);

  // Fetch initial total visitors
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await api.get("/visitor");   // ✅ सिर्फ `/visitor`
        console.log("Visitor API response:", res.data);
        setTotalVisitors(res.data.count || 0);   // fallback 0
      } catch (err) {
        console.error("Visitor fetch failed:", err);
      }
    };

    fetchVisitors();
  }, []);

  // Update live total count via socket
  useEffect(() => {
    socket.on("visitorCount", (count) => setTotalVisitors(count));
    return () => socket.off("visitorCount");
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-blue-50 py-4 fixed bottom-0 w-full shadow-[0_-2px_6px_rgba(0,0,0,0.05)] 
                 border-t border-transparent bg-gradient-to-t from-blue-100 via-blue-50 to-white"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-700 text-sm gap-3">
        
        {/* Visitors */}
        <p>
          🌍 Total Visits: <span className="font-semibold">{totalVisitors}</span>
        </p>

        {/* Middle Section */}
        <div className="text-center">
          <p>
            © {new Date().getFullYear()} Lost & Found | Built by{" "}
            <a
              href="https://github.com/Rishuraj2003-cmd"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-indigo-600 transition"
            >
              Rishu Raj
            </a>
          </p>
          <p className="text-gray-600">
            Made with <span className="animate-pulse text-red-500">❤️</span> in India
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/Rishuraj2003-cmd"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-indigo-600 hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.7)]"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/rishu-raj-86309b223/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-indigo-600 hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.7)]"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
