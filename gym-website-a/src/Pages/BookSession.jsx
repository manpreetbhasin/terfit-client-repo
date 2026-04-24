import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockSessions } from "../data/mocks";
import Footer from "../components/Footer/Footer";

// Flatten all sessions from mock data to find by ID
const allSessions = Object.values(mockSessions).flat();

const PRICING_OPTIONS = [
  { id: "dropin", label: "Drop-in", price: "$22", description: null },
  { id: "pack", label: "10 Class Pack", price: "$180", description: "6 remaining" },
  { id: "monthly", label: "Monthly Unlimited", price: "$0", description: "Active membership" },
];

function BookSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const session = allSessions.find((s) => s.id === sessionId);

  const [selectedPayment, setSelectedPayment] = useState("pack");
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!session) {
    return (
      <section>
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[30px] font-bold">
            Book a Class
          </h1>
        </div>
        <div className="container page-padding py-[100px] text-center">
          <p className="text-gray-400 text-[18px]">Session not found.</p>
          <button
            onClick={() => navigate("/schedule")}
            className="mt-6 text-white bg-[#ff0336] py-[10px] px-[30px] rounded-[30px]"
          >
            Back to Schedule
          </button>
        </div>
        <Footer />
      </section>
    );
  }

  const handleConfirm = async () => {
    setConfirming(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Booking confirmed:", {
        sessionId: session.id,
        payment: selectedPayment,
      });
      setConfirming(false);
      setConfirmed(true);
    }, 800);
  };

  // Confirmation screen
  if (confirmed) {
    return (
      <section>
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[30px] font-bold">
            You're Booked!
          </h1>
        </div>
        <div className="container page-padding py-[100px] flex flex-col items-center text-center">
          {/* Checkmark */}
          <div className="w-[80px] h-[80px] rounded-full bg-[#ff0336] flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Session details */}
          <h2 className="text-[28px] font-bold text-black mb-2">
            {session.class_name}
          </h2>
          <p className="text-[#a0a0a0] text-[16px] mb-1">
            with {session.instructor_name}
          </p>
          <p className="text-[#a0a0a0] text-[16px] mb-8">
            {session.day} · {session.start_time} – {session.end_time}
          </p>

          {/* Reminder note */}
          <p className="text-[14px] text-[#a0a0a0] mb-10">
            We'll remind you the night before. See you on the mat 🧘
          </p>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/schedule")}
              className="text-white text-[15px] font-medium bg-[#ff0336] py-[10px] px-[30px] rounded-[30px] hover:opacity-90 ease-in duration-200"
            >
              Back to Schedule
            </button>
            <button
              onClick={() => {
                const event = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${session.class_name} with ${session.instructor_name}\nDTSTART:20240415T090000Z\nDTEND:20240415T100000Z\nEND:VEVENT\nEND:VCALENDAR`;
                const blob = new Blob([event], { type: "text/calendar" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "class.ics";
                a.click();
              }}
              className="text-[15px] font-medium border border-[#d7d7d7] py-[10px] px-[30px] rounded-[30px] hover:border-[#ff0336] hover:text-[#ff0336] ease-in duration-200"
            >
              Add to Calendar
            </button>
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  // Booking screen
  return (
   
  <section>
    <div className="login-banner relative justify-center flex">
      <h1 className="text-white absolute bottom-[25px] text-[30px] font-bold">
        Confirm Booking
      </h1>
    </div>

    <div className="container page-padding py-[100px] max-w-[500px] mx-auto">

      {/* Session summary */}
      <div className="bg-[#f2f2f2] rounded-[12px] p-[40px] mb-6">
        <h2 className="text-[24px] font-bold text-black mb-4">
          {session.class_name}
        </h2>
        <div className="flex flex-col gap-2">
          <p className="text-[15px] text-[#555]">👤 {session.instructor_name}</p>
          <p className="text-[15px] text-[#555]">🕘 {session.start_time} – {session.end_time}</p>
          <p className="text-[15px] text-[#555]">🪑 {session.spots_remaining} spots left</p>
        </div>
      </div>

      {/* Payment — one line */}
      <div className="flex justify-between items-center px-[10px] mb-8">
        <p className="text-[15px] text-[#555]">10 Class Pack · 6 remaining</p>
        <p className="text-[16px] font-bold text-[#ff0336]">$0</p>
      </div>

      {/* One button */}
      <button
        onClick={handleConfirm}
        disabled={confirming}
        className="w-full text-white text-[16px] font-bold bg-[#ff0336] py-[15px] rounded-[30px] hover:opacity-90 ease-in duration-200 disabled:opacity-50"
      >
        {confirming ? "Confirming..." : "Confirm Booking"}
      </button>

      <button
        onClick={() => navigate("/schedule")}
        className="w-full text-[15px] text-[#a0a0a0] mt-4 hover:text-[#ff0336] ease-in duration-200"
      >
        ← Back
      </button>
    </div>
    <Footer />
  </section>
  );
}

export default BookSession;