import React, { useState, useEffect } from "react";
import "../styles/Seat.css";

type SeatProps = {
  seatNumber: number;
  isReserved: boolean;
  isSelected: boolean;
  onClick: (seatNumber: number) => void;
};

const Seat: React.FC<SeatProps> = ({ seatNumber, isReserved, isSelected, onClick }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (isReserved) {
      fetch(`https://jsonplaceholder.typicode.com/users/${seatNumber}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Kullanıcı bilgisi alınamadı:", err));
    }
  }, [seatNumber, isReserved]);

  return (
    <div
      className={`seat ${isReserved ? "reserved" : isSelected ? "selected" : "available"}`}
      onClick={() => !isReserved && onClick(seatNumber)}
    >
      {seatNumber}
      {isReserved && userData && (
        <div className="tooltip">
          <p><strong>Ad:</strong> {userData.name}</p>
          <p><strong>E-posta:</strong> {userData.email}</p>
          <p><strong>Telefon:</strong> {userData.phone}</p>
        </div>
      )}
    </div>
  );
};

export default Seat;
