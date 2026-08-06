"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { X, User, Mail, Lock, Building, Phone, ArrowRight, LogOut, CheckCircle2, ShieldCheck } from "lucide-react";

export const AuthModal = () => {
  const { user, login, signup, logout, isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode } = useAuth();

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupCompany, setSignupCompany] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupBusinessType, setSignupBusinessType] = useState("Ayurvedic Medicine Manufacturer");
  const [signupPassword, setSignupPassword] = useState("");

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return;
    login(loginEmail, loginPassword);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail || !signupName) return;
    signup({
      name: signupName,
      email: signupEmail,
      companyName: signupCompany,
      phone: signupPhone,
      businessType: signupBusinessType
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-[#213833] border border-white/[0.15] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl my-6 text-[#D0D9D8]"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#172925] text-[#D0D9D8] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Auth Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LOGGED IN USER VIEW */}
          {user ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 bg-[#769489]/20 border border-[#769489]/40 rounded-full flex items-center justify-center mx-auto text-[#769489]">
                <User className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#769489] uppercase block mb-1">
                  Verified Account
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#D0D9D8]">
                  {user.name}
                </h3>
                <p className="text-xs text-[#98B4A1] font-light mt-0.5">{user.email}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#172925] border border-white/10 text-left space-y-2 text-xs text-[#98B4A1]">
                {user.companyName && (
                  <div className="flex justify-between">
                    <span>Business / Company:</span>
                    <strong className="text-[#D0D9D8]">{user.companyName}</strong>
                  </div>
                )}
                {user.businessType && (
                  <div className="flex justify-between">
                    <span>Industry Sector:</span>
                    <strong className="text-[#769489]">{user.businessType}</strong>
                  </div>
                )}
                {user.phone && (
                  <div className="flex justify-between">
                    <span>Phone / WhatsApp:</span>
                    <strong className="text-[#D0D9D8]">{user.phone}</strong>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#769489] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#D0D9D8] transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>

                <button
                  onClick={logout}
                  className="w-full py-2.5 rounded-xl bg-[#172925] text-rose-400 hover:bg-rose-500/10 border border-white/10 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* LOGIN / SIGNUP TABS */
            <div>
              {/* Tab Selector Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#D0D9D8]">
                    {authMode === "login" ? "Welcome Back" : "Create Account"}
                  </h3>
                  <p className="text-xs text-[#98B4A1] font-light mt-0.5">
                    {authMode === "login" ? "Sign in to your wholesale account" : "Register for direct B2B factory pricing"}
                  </p>
                </div>
              </div>

              {/* Mode Toggle Buttons */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-[#172925] border border-white/10 mb-6 text-xs font-semibold">
                <button
                  onClick={() => setAuthMode("login")}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    authMode === "login"
                      ? "bg-[#769489] text-[#172925] font-bold shadow-md"
                      : "text-[#98B4A1] hover:text-[#D0D9D8]"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthMode("signup")}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    authMode === "signup"
                      ? "bg-[#769489] text-[#172925] font-bold shadow-md"
                      : "text-[#98B4A1] hover:text-[#D0D9D8]"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* SIGN IN FORM */}
              {authMode === "login" ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#D0D9D8] mb-1.5">
                      Email Address or Mobile *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
                      <input
                        type="text"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="buyer@company.com"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D0D9D8] mb-1.5">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer mt-2"
                  >
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 text-center text-xs text-[#98B4A1]">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("signup")}
                      className="text-[#769489] underline font-semibold cursor-pointer"
                    >
                      Register Now
                    </button>
                  </div>
                </form>
              ) : (
                /* CREATE ACCOUNT FORM */
                <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="procurement@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={signupCompany}
                        onChange={(e) => setSignupCompany(e.target.value)}
                        placeholder="Herbal Remedies Pvt Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                        Mobile / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                      Business Industry Sector
                    </label>
                    <select
                      value={signupBusinessType}
                      onChange={(e) => setSignupBusinessType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] focus:outline-none cursor-pointer"
                    >
                      <option value="Ayurvedic Medicine Manufacturer">Ayurvedic Medicine Manufacturer</option>
                      <option value="Homeopathic Medicine Manufacturer">Homeopathic Medicine Manufacturer</option>
                      <option value="Herbal Product Manufacturer">Herbal Product Manufacturer</option>
                      <option value="Wholesale Trader / Distributor">Wholesale Trader / Distributor</option>
                      <option value="Herbal Exporter">Herbal Exporter</option>
                      <option value="Individual Buyer">Individual Bulk Buyer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                      Create Password *
                    </label>
                    <input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer mt-3"
                  >
                    <span>Create B2B Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-1 text-center text-xs text-[#98B4A1]">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className="text-[#769489] underline font-semibold cursor-pointer"
                    >
                      Sign In Here
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
