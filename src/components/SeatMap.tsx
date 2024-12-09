import React, { useState, useEffect, useRef } from "react";
import Seat from "./Seat";
import ReservationForm from "./ReservationForm";
import "../styles/SeatMap.css";

const SeatMap = () => {
  const [reservedSeats, setReservedSeats] = useState<number[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>(() => {
    const savedSeats = localStorage.getItem("selectedSeats");
    return savedSeats ? JSON.parse(savedSeats) : [];
  });
  const [formValues, setFormValues] = useState<Record<number, Record<string, string>>>(() => {
    const savedForms = localStorage.getItem("formValues");
    return savedForms ? JSON.parse(savedForms) : {};
  });
  
  const lastInteractionTime = useRef<number | null>(null);

  useEffect(() => {
    setReservedSeats([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }, []);

  useEffect(() => {
    
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("formValues", JSON.stringify(formValues));
  }, [selectedSeats, formValues]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        lastInteractionTime.current &&
        Date.now() - lastInteractionTime.current > 30000
      ) {
        const shouldContinue = window.confirm(
          "İşleme devam etmek istiyor musunuz?"
        );
        if (!shouldContinue) {
          localStorage.clear();
          window.location.reload();
        } else {
          lastInteractionTime.current = Date.now(); 
          window.close();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInteraction = () => {
    lastInteractionTime.current = Date.now();
  };

  const handleSeatClick = (seatNumber: number) => {
    handleInteraction();
    if (selectedSeats.length >= 3 && !selectedSeats.includes(seatNumber)) {
      alert("En fazla 3 koltuk seçebilirsiniz.");
      return;
    }
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleFormChange = (seatNumber: number, name: string, value: string) => {
    handleInteraction();
    setFormValues((prev) => ({
      ...prev,
      [seatNumber]: {
        ...prev[seatNumber],
        [name]: value,
      },
    }));
  };

  const validateForms = (): boolean => {
    for (const seat of selectedSeats) {
      const formData = formValues[seat];
      if (!formData || Object.values(formData).some((value) => !value)) {
        alert(`${seat}. Koltuğun bilgileri eksik. Lütfen tüm alanları doldurun.`);
        return false;
      }
      if (!/^\d{10,}$/.test(formData.phone)) {
        alert(`${seat}. Koltuktaki telefon numarası geçerli değil.`);
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        alert(`${seat}. Koltuktaki e-posta adresi geçerli değil.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForms()) return;
    alert("Tüm rezervasyonlar başarıyla tamamlandı!");
    console.log("Rezervasyonlar:", formValues);
    localStorage.clear();
    window.location.reload();
  };

  const totalPrice = selectedSeats.length * 1000; 

  return (
    <div className="seat-reservation" onClick={handleInteraction}>
      <div className="seat-map-container">
        <div className="seat-map">
          {Array.from({ length: 30 }, (_, i) => (
            <Seat
              key={i + 1}
              seatNumber={i + 1}
              isReserved={reservedSeats.includes(i + 1)}
              isSelected={selectedSeats.includes(i + 1)}
              onClick={handleSeatClick}
            />
          ))}
        </div>
        <div className="seat-box">
          <div className="box-item">
            <span className="seat reserved"></span>
            <span>Dolu</span>
          </div>
          <div className="box-item">
            <span className="seat selected"></span>
            <span>Seçili</span>
          </div>
          <div className="box-item">
            <span className="seat available"></span>
            <span>Boş</span>
          </div>
        </div>
        <div className="total-price">
          Toplam Ücret: {totalPrice.toLocaleString("tr-TR")} TL
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          İşlemleri Tamamla
        </button>
      </div>
      <div className="forms">
        {selectedSeats.map((seatNumber) => (
          <ReservationForm
            key={seatNumber}
            seatNumber={seatNumber}
            formData={
              formValues[seatNumber] || {
                name: "",
                surname: "",
                phone: "",
                email: "",
                gender: "",
                birthDate: "",
              }
            }
            onChange={handleFormChange}
          />
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
