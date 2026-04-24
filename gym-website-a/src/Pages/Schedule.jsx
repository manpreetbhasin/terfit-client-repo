import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { mockSessions } from "../data/mocks";
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function Schedule() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:7001/api/sessions?day=${selectedDay}`,
        );
        const data = await res.json();
        setSessions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [selectedDay]);

  return (
    <>
      <section>
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[30px] font-bold">
            Schedule by Day
          </h1>
        </div>

        <div className="container page-padding py-[100px]">
          {/* Day filter buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`text-[15px] font-bold border-solid border border-[#d7d7d7] py-[9px] px-[32px] rounded-[23px] ease-in duration-200 hover:shadow-2xl
                  ${
                    selectedDay === day
                      ? "bg-[#ff0336] text-white shadow-2xl"
                      : "hover:bg-[#ff0336] hover:text-white"
                  }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Sessions */}
          <div className="mt-[50px]">
            {loading && <p className="text-center text-gray-400">Loading...</p>}

            {!loading && sessions.length === 0 && (
              <p className="text-center text-gray-400">
                No classes scheduled for {selectedDay}
              </p>
            )}

            {!loading && (
              <div className="flex flex-col gap-5">
                {sessions.map((session) => (
                  <ul
                    key={session.id}
                    className="flex justify-between w-full min800:flex-col min800:text-center"
                  >
                    <li className="py-[25px] px-[55px] bg-[#f2f2f2] w-full">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Class Name
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {session.class_name}
                      </p>
                    </li>
                    <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Time
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {session.start_time} - {session.end_time}
                      </p>
                    </li>
                    <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Instructor
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {session.instructor_name}
                      </p>
                    </li>
                    <li className="py-[25px] px-[55px] bg-[#f2f2f2] w-full text-right">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        {session.spots_remaining} spots left
                      </p>
                      {session.spots_remaining === 0 ? (
                        <span className="text-white text-[15px] font-medium py-[10px] text-center block rounded-[30px] mt-[10px] w-[100px] bg-[#ccc] cursor-not-allowed">
                          Full
                        </span>
                      ) : (
                        <Link
                          to={`/book/${session.id}`}
                          className="text-white text-[15px] font-medium py-[10px] text-center block rounded-[30px] mt-[10px] ease-in duration-200 w-[100px] bg-[#555] hover:bg-[#ff0336]"
                        >
                          Join Now
                        </Link>
                      )}
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Schedule;
