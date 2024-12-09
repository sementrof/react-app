// import React from "react";
// import { useParams } from "react-router-dom";

// const DirectionPage: React.FC = () => {
//   const { direction } = useParams<{ direction: string }>();

//   return (
//     <div>
//       <h1>Направление: {direction}</h1>
//       <p>Здесь будет информация о направлении "{direction}".</p>
//     </div>
//   );
// };

// export default DirectionPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// interface Hotel {
//   name: string;
//   advantage: string;
// }

// const DirectionPage: React.FC = () => {
//   const { direction } = useParams<{ direction: string }>();
//   const [hotels, setHotels] = useState<Hotel[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Функция для загрузки данных об отелях
//   const fetchHotels = async (direction: string) => {
//     try {
//       const response = await fetch(
//         `http://0.0.0.0:8000/api/v1/users/get_all_hotel?direction=${direction}`
//       );
//       if (!response.ok) {
//         throw new Error("Ошибка загрузки данных об отелях");
//       }
//       const data = await response.json();
//       setHotels(data);
//       setLoading(false);
//     } catch (err: any) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   // Используем useEffect для загрузки данных при монтировании
//   useEffect(() => {
//     if (direction) {
//       fetchHotels(direction);
//     }
//   }, [direction]);

//   return (
//     <div>
//       <h1>Направление: {direction}</h1>
//       {loading && <p>Загрузка данных об отелях...</p>}
//       {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
//       {!loading && !error && (
//         <ul>
//           {hotels.map((hotel, index) => (
//             <li key={index}>
//               <h2>{hotel.name}</h2>
//               <p>Преимущества: {hotel.advantage}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DirectionPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./direction-page.css"; // Подключаем стили для карточек

interface Hotel {
  name: string;
  advantage: string;
}

const DirectionPage: React.FC = () => {
  const { direction } = useParams<{ direction: string }>();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Функция для загрузки данных об отелях
  const fetchHotels = async (direction: string) => {
    try {
      const response = await fetch(
        `http://0.0.0.0:8000/api/v1/users/get_all_hotel?direction=${direction}`
      );
      if (!response.ok) {
        throw new Error("Ошибка загрузки данных об отелях");
      }
      const data = await response.json();
      setHotels(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Используем useEffect для загрузки данных при монтировании
  useEffect(() => {
    if (direction) {
      fetchHotels(direction);
    }
  }, [direction]);

  return (
    <div className="direction-page">
      <h1>Направление: {direction}</h1>
      {loading && <p>Загрузка данных об отелях...</p>}
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
      {!loading && !error && (
        <div className="hotel-cards">
          {hotels.map((hotel, index) => (
            <div key={index} className="hotel-card">
              <img
                src="https://via.placeholder.com/300x200" // Замените на реальный URL изображения отеля
                alt={hotel.name}
                className="hotel-card-image"
              />
              <div className="hotel-card-content">
                <h2 className="hotel-card-title">{hotel.name}</h2>
                <p className="hotel-card-advantage">{hotel.advantage}</p>
                <button className="hotel-card-button">View</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectionPage;
