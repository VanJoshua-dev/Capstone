import React from "react";
import { FaUsers } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
function Metrix() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthName = monthNames[new Date().getMonth()];
  const cards = [
    {
      icon: <FaUsers size={80} className="text-gray-800"/>,
      label: "Total Staff",
      value: 100,
      bg: "#FFF59C",
    },
    {
      icon: <FaCalendarCheck size={80} className="text-gray-800"/>,
      label: currentMonthName + "'s Attnd. Rate",
      value: 70 + "%",
      bg: "#9CFFCB",
    },
    { icon: <FaCalendarDay size={80} className="text-gray-800"/>, label: currentMonthName + " Events", value: 14, bg: "#FFE54E" },
  ];
  return (
    <div className="w-full py-1 flex flex-row gap-2 mb-2">
      {cards.map((card, index) => (
        <div
          style={{ backgroundColor: card.bg }}
          className="w-full h-40 flex flex-row p-5 items-center"
          key={index}
        >
          {card.icon}
          <div className="h-full w-60 flex flex-col justify-center items-center gap-1">
            <h1 className="text-2xl font-semibold">{card.label}</h1>
            <span className="text-3xl">{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Metrix;
