import React, { useState, useEffect } from "react";

function NewLetterBox() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("⚠️ Please enter a valid email.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xrbaowbk", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });

      if (res.ok) {
        showToast("✅ Subscribed successfully!", "success");
        setEmail("");
      } else {
        showToast("❌ Subscription failed. Try again.", "error");
      }
    } catch (err) {
      showToast("⚠️ Error sending request.", "error");
    }
    setLoading(false);
  };

  // ✅ Show toast and auto-hide after 3s
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 3000);
  };

  return (
    <div className="relative w-full h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-start gap-2">
      {/* 🔹 Toast Notification */}
      {toast.message && (
        <div
          className={`fixed top-5 right-5 z-[9999] px-4 py-2 rounded-lg shadow-lg text-white animate-slide-in 
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <p className="md:text-[30px] text-[20px] text-[#a5faf7] font-semibold px-[20px]">
        Subscribe now & get 20% off
      </p>
      <p className="font-semibold md:text-[18px] text-[14px] text-blue-100 px-[20px] text-center">
        Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full h-[30%] md:h-[50%] flex items-center justify-center mt-5 gap-5 px-5"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="placeholder:text-black bg-slate-300 w-[600px] max-w-[60%] h-[40px] px-[20px] rounded-lg shadow-sm shadow-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="text-[15px] md:text-[16px] px-[10px] md:px-[30px] py-[12px] md:py-[10px] hover:bg-slate-500 cursor-pointer bg-[#2e3030c9] text-white flex items-center justify-center gap-[20px] border border-[#80808049] rounded-lg shadow-sm shadow-black disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}

export default NewLetterBox;
