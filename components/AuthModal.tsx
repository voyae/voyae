"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, User, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        
        // Çirkin alert yerine şık bir mesaj gösterip login sekmesine yönlendirelim
        setSuccessMessage("Account created successfully! Please sign in.");
        setTimeout(() => {
          setIsSignUp(false);
          setSuccessMessage(null);
        }, 2000);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative z-10 w-[360px] sm:w-[380px] rounded-[24px] bg-[#070D1F] p-8 text-white shadow-2xl border border-white/10"
          >
            <button 
              onClick={onClose} 
              className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="mb-6 text-center">
              <h2 className="font-display text-2xl font-bold tracking-wide text-white">
                {isSignUp ? "Signup" : "Login"}
              </h2>
            </div>

            {/* Hata Mesajı */}
            {error && (
              <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center text-xs text-red-400">
                {error}
              </div>
            )}

            {/* Başarı Mesajı */}
            {successMessage && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-400">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your name" 
                      required
                      className="w-full rounded-xl bg-white/5 pl-9 pr-3.5 py-3 text-xs text-white placeholder-slate-600 outline-none border border-white/10 focus:border-amber-500 transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    required
                    className="w-full rounded-xl bg-white/5 pl-9 pr-3.5 py-3 text-xs text-white placeholder-slate-600 outline-none border border-white/10 focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password" 
                    required
                    className="w-full rounded-xl bg-white/5 pl-9 pr-3.5 py-3 text-xs text-white placeholder-slate-600 outline-none border border-white/10 focus:border-amber-500 transition"
                  />
                </div>
              </div>

              {!isSignUp && (
                <div className="text-right">
                  <span className="text-[11px] text-amber-500 cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-amber-500 py-3 text-xs font-semibold text-slate-950 transition hover:bg-amber-400 active:scale-[0.99] shadow-lg shadow-amber-500/10 mt-2 disabled:opacity-50"
              >
                {loading ? "Processing..." : (isSignUp ? "Signup" : "Login")}
              </button>
            </form>

            <div className="text-center text-[11px] text-slate-400 mt-6">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <button 
                    onClick={() => setIsSignUp(false)} 
                    className="text-amber-400 font-medium hover:underline ml-1"
                  >
                    Login
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setIsSignUp(true)} 
                    className="text-amber-400 font-medium hover:underline ml-1"
                  >
                    Signup
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}