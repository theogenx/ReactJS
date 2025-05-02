import React, { useState } from "react";

// Beispiel-Daten
const items = [
  { id: 1, name: "Rechnung bezahlen", dueDate: "2025-05-10" },
  { id: 2, name: "Projekt abgeben", dueDate: "2025-05-15" },
  { id: 3, name: "Geburtstag Anna", dueDate: "2025-06-01" },
  { id: 4, name: "Auto TÜV", dueDate: "2025-06-20" },
];

function groupByMonth(filteredItems) {
  return filteredItems.reduce((groups, item) => {
    const month = item.dueDate.slice(0, 7); // "YYYY-MM"
    if (!groups[month]) groups[month] = [];
    groups[month].push(item);
    return groups;
  }, {});
}

export default function App() {
  const [nameFilter, setNameFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Filter nach Name und Datumseingrenzung
  const filtered = items.filter(item => {
    const matchesName = item.name.toLowerCase().includes(nameFilter.toLowerCase());
    const date = item.dueDate;
    const afterFrom = !fromDate || date >= fromDate;
    const beforeTo = !toDate || date <= toDate;
    return matchesName && afterFrom && beforeTo;
  });

  const grouped = groupByMonth(filtered);

  return (
    <div>
      <input
        type="text"
        placeholder="Nach Name filtern"
        value={nameFilter}
        onChange={e => setNameFilter(e.target.value)}
      />
      <input
        type="date"
        value={fromDate}
        onChange={e => setFromDate(e.target.value)}
      />
      <input
        type="date"
        value={toDate}
        onChange={e => setToDate(e.target.value)}
      />

      {Object.entries(grouped).map(([month, items]) => (
        <div key={month}>
          <h3>{month}</h3>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name} – {item.dueDate}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
