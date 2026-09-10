"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UnifiedProduct } from "@/utils/aiCatalog";
import { AskShivaProductDetailModal } from "./AskShivaProductDetailModal";
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  Bot,
  User,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  products?: UnifiedProduct[];
  suggestedQuestions?: string[];
  isMedicalQuery?: boolean;
  timestamp: string;
}

interface AskShivaChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (productName?: string) => void;
}

const INITIAL_SUGGESTED_QUESTIONS = [
  "Find a product for my needs",
  "Mujhe product dhoondhne mein help karo",
  "Ashwagandha dikhao",
  "Herbal powder dikhao",
  "Bulk mein herbs chahiye",
  "Turmeric products dikhao",
  "Wholesale rate chahiye",
];

export const AskShivaChat = ({
  isOpen,
  onClose,
  onOpenQuoteModal,
}: AskShivaChatProps) => {
  const { addToCart } = useCart();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: "Namaste! I am **Ask Shiva AI**, your multilingual botanical product discovery assistant.\n\nI can help you explore authentic Indian medicinal herbs, roots, leaves, barks, powders, and raw spices from our catalog in **English, Hindi (हिंदी), or Hinglish**.\n\nHow can I assist your formulation or bulk requirements today?",
      suggestedQuestions: INITIAL_SUGGESTED_QUESTIONS,
      timestamp: "Just now",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<UnifiedProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, loading]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !selectedDetailProduct) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedDetailProduct, onClose]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (product: UnifiedProduct) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        hindiName: product.hindiName,
        category: product.category,
        image: product.image,
        moq: product.moq,
      },
      100,
      "Kg"
    );
    triggerToast(`Added "${product.name}" to Quote Cart (100 Kg)`);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputQuery).trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      // Find previous products shown in the chat for pronoun/ordinal resolution ("pehla wala", "dusra wala", "iska rate")
      let lastProducts: UnifiedProduct[] = [];
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].products && messages[i].products!.length > 0) {
          lastProducts = messages[i].products!;
          break;
        }
      }

      // Build conversation payload for backend
      const historyPayload = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/ask-shiva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: textToSend,
          messages: historyPayload,
          previousProducts: lastProducts,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await res.json();

      // If a cart action was detected (e.g. "pehla wala cart me daal do"), automatically trigger cart addition
      if (data.cartAction && data.cartAction.action === "add") {
        const productToAdd = (data.matchedProducts && data.matchedProducts.length > 0)
          ? data.matchedProducts[0]
          : lastProducts.find((p) => p.id === data.cartAction.productId);

        if (productToAdd) {
          handleAddToCart(productToAdd);
        }
      }

      const assistantMsg: ChatMessage = {
        id: "assistant-" + Date.now(),
        sender: "assistant",
        text: data.message || "Here are matching products from our catalog:",
        products: data.matchedProducts || [],
        suggestedQuestions: data.suggestedQuestions || [],
        isMedicalQuery: data.isMedicalQuery,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("AI chat error:", err);
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "assistant",
        text: "I am having trouble connecting to the server right now. You can also reach our wholesale sales desk directly on WhatsApp for immediate support.\n\n(सर्वर से कनेक्ट करने में समस्या आ रही है। आप सीधे WhatsApp पर संपर्क कर सकते हैं।)",
        suggestedQuestions: ["Try asking about Ashwagandha", "Herbal powder dikhao", "Show me raw herbs"],
        timestamp: "Now",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        sender: "assistant",
        text: "Namaste! I am **Ask Shiva AI**, your multilingual botanical product discovery assistant.\n\nI can help you explore authentic Indian medicinal herbs, roots, leaves, barks, powders, and raw spices from our catalog in **English, Hindi (हिंदी), or Hinglish**.\n\nHow can I assist your formulation or bulk requirements today?",
        suggestedQuestions: INITIAL_SUGGESTED_QUESTIONS,
        timestamp: "Just now",
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-start sm:p-6 bg-black/60 sm:bg-black/70 backdrop-blur-sm">
          
          {/* Main Chat Container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full sm:w-[480px] lg:w-[540px] h-[92vh] sm:h-[680px] max-h-[92vh] bg-[#172925] border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#D0D9D8] relative sm:ml-4"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#213833] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-white p-0.5 shadow-md flex items-center justify-center overflow-hidden border border-white/20">
                    <img
                      src="/images/logo.png"
                      alt="Shiva Jadibuti Logo"
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  {/* Live Status Dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#213833] rounded-full animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-serif font-bold text-[#D0D9D8] tracking-wide">
                      Ask Shiva AI
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#769489]/20 text-[#769489] border border-[#769489]/30">
                      Catalog Assistant
                    </span>
                  </div>
                  <p className="text-[11px] text-[#98B4A1] font-light flex items-center space-x-1">
                    <span>Shiva Jadibuti Product Discovery</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClearChat}
                  className="p-2 rounded-full hover:bg-white/10 text-[#98B4A1] hover:text-[#D0D9D8] transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-[#98B4A1] hover:text-white transition-colors cursor-pointer"
                  title="Close Assistant"
                  aria-label="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification Toast */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-16 left-4 right-4 z-30 bg-[#769489] text-[#172925] px-4 py-2.5 rounded-xl shadow-lg font-bold text-xs flex items-center space-x-2 justify-center"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Body & Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm font-light leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-2`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-4 text-xs sm:text-[13px] ${
                      msg.sender === "user"
                        ? "bg-[#769489] text-[#172925] font-medium rounded-tr-none shadow-md"
                        : "bg-[#213833] border border-white/10 text-[#D0D9D8] rounded-tl-none shadow-sm"
                    }`}
                  >
                    {/* Medical Alert Header if applicable */}
                    {msg.isMedicalQuery && (
                      <div className="flex items-center space-x-1.5 mb-2.5 pb-2.5 border-b border-amber-400/30 text-amber-300 font-semibold text-xs">
                        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-mono text-[11px] uppercase tracking-wider">Product Information ≠ Medical Advice</span>
                      </div>
                    )}

                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </div>

                    <div
                      className={`text-[10px] mt-2 text-right ${
                        msg.sender === "user" ? "text-[#172925]/70" : "text-[#98B4A1]"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* Product Cards Grid inside message */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="w-full space-y-3 pt-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#769489] px-1 flex items-center justify-between">
                        <span className="flex items-center space-x-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Catalog Product Information ({msg.products.length})</span>
                        </span>
                        <span className="text-[9px] text-[#98B4A1] font-light normal-case">
                          (Non-Prescription / Botanical Material)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {msg.products.map((prod, prodIdx) => (
                          <div
                            key={`${prod.id}-${prodIdx}`}
                            className="bg-[#213833] border border-white/15 rounded-2xl p-3.5 sm:p-4 transition-all hover:border-[#769489]/50 shadow-md group"
                          >
                            <div className="flex gap-3.5 items-start">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-white/10 bg-[#172925] shrink-0 group-hover:scale-105 transition-transform"
                              />

                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[10px] font-mono text-[#769489] uppercase tracking-wider truncate">
                                    {prod.category}
                                  </span>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#172925] text-[#98B4A1] border border-white/5 shrink-0">
                                    MOQ: {prod.moq}
                                  </span>
                                </div>

                                <h4 className="text-sm font-serif font-bold text-[#D0D9D8] truncate">
                                  {prod.name} {prod.hindiName ? `(${prod.hindiName})` : ""}
                                </h4>

                                <p className="text-[11px] italic text-[#98B4A1] truncate">
                                  {prod.botanicalName}
                                </p>

                                <p className="text-[11px] text-[#D0D9D8]/80 line-clamp-2 leading-tight pt-0.5">
                                  {prod.shortDescription}
                                </p>
                              </div>
                            </div>

                            {/* Product Card Buttons */}
                            <div className="mt-3 pt-2.5 border-t border-white/10 grid grid-cols-3 gap-2 text-[11px] font-medium">
                              <button
                                onClick={() => setSelectedDetailProduct(prod)}
                                className="py-2 px-2 rounded-xl bg-[#172925] hover:bg-white/10 text-[#D0D9D8] border border-white/10 flex items-center justify-center space-x-1 transition-all cursor-pointer truncate"
                                title="View Product Details"
                              >
                                <ExternalLink className="w-3 h-3 text-[#769489] shrink-0" />
                                <span className="truncate">View Specs</span>
                              </button>

                              <button
                                onClick={() => handleAddToCart(prod)}
                                className="py-2 px-2 rounded-xl bg-[#172925] hover:bg-[#769489] text-[#D0D9D8] hover:text-[#172925] border border-white/10 flex items-center justify-center space-x-1 transition-all cursor-pointer truncate"
                                title="Add to Quote Cart"
                              >
                                <ShoppingBag className="w-3 h-3 text-[#769489] group-hover:text-[#172925] shrink-0" />
                                <span className="truncate">+ Add Cart</span>
                              </button>

                              <button
                                onClick={() => {
                                  onClose();
                                  onOpenQuoteModal(prod.name);
                                }}
                                className="py-2 px-2 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold flex items-center justify-center space-x-1 transition-all shadow-sm active:scale-95 cursor-pointer truncate"
                                title="Get Wholesale Quote"
                              >
                                <Send className="w-3 h-3 shrink-0" />
                                <span className="truncate">Get Quote</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contextual Suggested Questions */}
                  {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1.5 w-full">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="px-3 py-1.5 rounded-full bg-[#213833] hover:bg-[#769489] text-[#98B4A1] hover:text-[#172925] border border-white/10 text-[11px] font-normal transition-all flex items-center space-x-1 text-left cursor-pointer active:scale-95"
                        >
                          <ChevronRight className="w-3 h-3 shrink-0 text-[#769489]" />
                          <span>{q}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading / Thinking Animation */}
              {loading && (
                <div className="flex items-start space-x-2">
                  <div className="bg-[#213833] border border-white/10 rounded-2xl rounded-tl-none p-3.5 shadow-sm text-xs text-[#98B4A1] flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 text-[#769489] animate-spin" />
                    <span className="font-mono text-[11px]">Searching botanical catalog...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer Input Bar */}
            <div className="p-3 sm:p-4 bg-[#213833] border-t border-white/10 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2 bg-[#172925] border border-white/15 rounded-2xl p-1.5 focus-within:border-[#769489] transition-colors"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="e.g. 'I need something for digestion' or 'Ashwagandha in bulk'..."
                  disabled={loading}
                  className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-[#D0D9D8] placeholder-[#98B4A1]/60 focus:outline-none disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={!inputQuery.trim() || loading}
                  className="p-2.5 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-2 flex items-center justify-between text-[10px] text-[#98B4A1]/80 px-1 font-light">
                <span>⚡ Searches official Shiva Jadibuti catalog</span>
                <button
                  onClick={() => {
                    const text = encodeURIComponent("Hello Shiva Jadibuti Store, I want to talk to an herbal sales specialist.");
                    window.open(`https://wa.me/919958833536?text=${text}`, "_blank");
                  }}
                  className="hover:text-[#D0D9D8] flex items-center space-x-1 cursor-pointer"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>WhatsApp Specialist</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Product Spec Detail Modal when [View Product] is clicked inside chat */}
      <AskShivaProductDetailModal
        product={selectedDetailProduct}
        onClose={() => setSelectedDetailProduct(null)}
        onOpenQuoteModal={onOpenQuoteModal}
        onAddToCartToast={triggerToast}
      />
    </>
  );
};
