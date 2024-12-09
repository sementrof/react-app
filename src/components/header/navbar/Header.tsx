// import React, { useState, useEffect } from "react";
// import "./NavBar.css";
// import "./Hero.css";

// const MainComponent: React.FC = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [directions, setDirections] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Функция для получения данных из API
//   const fetchDirections = async () => {
//     try {
//       const response = await fetch(
//         "http://0.0.0.0:8000/api/v1/users/get_all_direction"
//       );
//       const data = await response.json();
//       setDirections(data.map((item: { name: string }) => item.name)); // Извлекаем имена направлений
//       setLoading(false);
//     } catch (error) {
//       console.error("Ошибка при загрузке направлений:", error);
//       setLoading(false);
//     }
//   };

//   // Используем useEffect для загрузки данных при монтировании
//   useEffect(() => {
//     fetchDirections();
//   }, []);

//   return (
//     <div>
//       <nav className="navbar">
//         <ul className="nav-list">
//           <li className="nav-item">Главная</li>
//           <li
//             className="nav-item dropdown"
//             onMouseEnter={toggleDropdown}
//             onMouseLeave={toggleDropdown}
//           >
//             Направления
//             {isDropdownOpen && (
//               <ul className="dropdown-menu">
//                 {loading ? (
//                   <li className="dropdown-item">Загрузка...</li>
//                 ) : (
//                   directions.map((direction, index) => (
//                     <li key={index} className="dropdown-item">
//                       {direction}
//                     </li>
//                   ))
//                 )}
//               </ul>
//             )}
//           </li>
//           <li className="nav-item">Лечебные туры</li>
//           <li className="nav-item">Бронировать</li>
//           <li className="nav-item">О нас</li>
//         </ul>
//         <button className="nav-button">Оставить заявку</button>
//       </nav>

//       {/* Hero Section */}
//       <div className="hero-container">
//         <img
//           src="https://via.placeholder.com/1500x500"
//           alt="Фоновое изображение"
//           className="hero-image"
//         />
//         <div className="hero-text-overlay">
//           <h1 className="hero-title">Санаторно-курортное лечение и отдых</h1>
//           <p className="hero-subtitle">В России и ближнем зарубежье</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainComponent;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import "./Hero.css";

const MainComponent: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [directions, setDirections] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Хук для редиректа

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Функция для получения данных из API
  const fetchDirections = async () => {
    try {
      const response = await fetch(
        "http://0.0.0.0:8000/api/v1/users/get_all_direction"
      );
      const data = await response.json();
      setDirections(data.map((item: { name: string }) => item.name)); // Извлекаем имена направлений
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке направлений:", error);
      setLoading(false);
    }
  };

  // Используем useEffect для загрузки данных при монтировании
  useEffect(() => {
    fetchDirections();
  }, []);

  // Обработчик выбора направления
  const handleDirectionSelect = (direction: string) => {
    navigate(`/directions/${direction}`); // Редирект на страницу направления
  };

  return (
    <div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">Главная</li>
          <li
            className="nav-item dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            Направления
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                {loading ? (
                  <li className="dropdown-item">Загрузка...</li>
                ) : (
                  directions.map((direction, index) => (
                    <li
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleDirectionSelect(direction)} // Редирект по клику
                    >
                      {direction}
                    </li>
                  ))
                )}
              </ul>
            )}
          </li>
          <li className="nav-item">Лечебные туры</li>
          <li className="nav-item">Бронировать</li>
          <li className="nav-item">О нас</li>
        </ul>
        <button className="nav-button">Оставить заявку</button>
      </nav>

      {/* Hero Section */}
      <div className="hero-container">
        <img
          src="https://via.placeholder.com/1500x500"
          alt="Фоновое изображение"
          className="hero-image"
        />
        <div className="hero-text-overlay">
          <h1 className="hero-title">Санаторно-курортное лечение и отдых</h1>
          <p className="hero-subtitle">В России и ближнем зарубежье</p>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
