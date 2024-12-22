import React, { useState, useEffect } from "react";
import "./admin-page.css";

interface Direction {
  id: number;
  name: string;
}

interface Hotel {
  name: string;
  advantage: string;
  url_img: string;
}

const AdminPage: React.FC = () => {
  const [directions, setDirections] = useState<Direction[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredDirections, setFilteredDirections] = useState<Direction[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [newDirection, setNewDirection] = useState<string>(""); // Для хранения нового направления
  const [filters, setFilters] = useState({
    id: "",
    name: "",
  });
  const [hotelFilters, setHotelFilters] = useState({
    name: "",
    advantage: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDirection, setSelectedDirection] = useState<string | null>(
    null
  );
  const [hotelData, setHotelData] = useState({
    name: "",
    advantage: "",
    url_img: null as File | null,
  });

  const [showHotels, setShowHotels] = useState<boolean>(false); // Состояние для тумблера

  // Загружаем направления из API
  const fetchDirections = async () => {
    try {
      const response = await fetch(
        "http://0.0.0.0:8000/api/v1/users/get_all_direction"
      );
      if (response.ok) {
        const data = await response.json();
        setDirections(data);
        setFilteredDirections(data);
      } else {
        throw new Error("Ошибка при загрузке направлений");
      }
    } catch (err) {
      console.error(err);
      setError("Не удалось загрузить направления.");
    }
  };

  // Получить все отели
  const fetchHotels = async () => {
    try {
      const response = await fetch(
        "http://0.0.0.0:8000/api/v1/users/get_all_hotel"
      );
      if (response.ok) {
        const data = await response.json();
        setHotels(data);
        setFilteredHotels(data); // Фильтруем отели сразу после получения
      } else {
        throw new Error("Ошибка при загрузке отелей");
      }
    } catch (err) {
      console.error(err);
      setError("Не удалось загрузить отели.");
    }
  };

  // Фильтрация направлений
  const handleDirectionFilter = () => {
    let filtered = directions;

    if (filters.id) {
      filtered = filtered.filter((direction) =>
        direction.id.toString().includes(filters.id)
      );
    }

    if (filters.name) {
      filtered = filtered.filter((direction) =>
        direction.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    setFilteredDirections(filtered);
  };

  // Фильтрация отелей
  const handleHotelFilter = () => {
    let filtered = hotels;

    if (hotelFilters.name) {
      filtered = filtered.filter((hotel) =>
        hotel.name.toLowerCase().includes(hotelFilters.name.toLowerCase())
      );
    }

    if (hotelFilters.advantage) {
      filtered = filtered.filter((hotel) =>
        hotel.advantage
          .toLowerCase()
          .includes(hotelFilters.advantage.toLowerCase())
      );
    }

    setFilteredHotels(filtered);
  };

  // Открыть модальное окно для добавления отеля
  const openModal = (directionName: string) => {
    setSelectedDirection(directionName);
    setIsModalOpen(true);
  };

  // Закрыть модальное окно
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDirection(null);
    setHotelData({ name: "", advantage: "", url_img: null });
    setError(null);
  };

  // Обработка выбора файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setHotelData((prev) => ({
        ...prev,
        url_img: file,
      }));
    }
  };

  // Добавить отель
  const addHotel = async () => {
    if (!hotelData.name.trim() || !hotelData.advantage.trim()) {
      setError("Название и описание отеля не могут быть пустыми.");
      return;
    }

    if (!hotelData.url_img) {
      setError("Необходимо прикрепить документ.");
      return;
    }

    const formData = new FormData();
    formData.append("hotel_name", hotelData.name);
    formData.append("hotel_advantage", hotelData.advantage);
    formData.append("file", hotelData.url_img);

    try {
      const response = await fetch(
        `http://0.0.0.0:8000/api/v1/users/add_hotel?direction_name=${selectedDirection}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        closeModal();
        alert("Отель успешно добавлен!");
      } else {
        throw new Error("Ошибка при добавлении отеля");
      }
    } catch (err) {
      console.error(err);
      setError("Не удалось добавить отель.");
    }
  };

  // Удалить направление
  const deleteDirection = async (directionName: string) => {
    try {
      const response = await fetch(
        `http://0.0.0.0:8000/api/v1/users/delete_direction?direction=${directionName}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Выводим сообщение об успешном удалении
        fetchDirections(); // Перезагружаем список направлений
      } else {
        throw new Error("Ошибка при удалении направления");
      }
    } catch (err) {
      console.error(err);
      setError("Не удалось удалить направление.");
    }
  };

  const addDirection = async () => {
    if (!newDirection.trim()) {
      setError("Название направления не может быть пустым.");
      return;
    }

    try {
      const response = await fetch(
        "http://0.0.0.0:8000/api/v1/users/add_direction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newDirection }),
        }
      );

      if (response.ok) {
        setNewDirection(""); // Очищаем поле после добавления
        fetchDirections(); // Перезагружаем список направлений
        alert("Направление успешно добавлено!");
      } else {
        throw new Error("Ошибка при добавлении направления");
      }
    } catch (err) {
      console.error(err);
      setError("Не удалось добавить направление.");
    }
  };

  const deleteHotel = async (hotelName: string) => {
    try {
      const response = await fetch(
        `http://0.0.0.0:8000/api/v1/users/delete_hotel?hotel=${hotelName}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Выводим сообщение об успешном удалении
        fetchHotels(); // Перезагружаем список отелей
      } else {
        throw new Error("Ошибка при удалении отеля");
      }
    } catch (err) {
      console.error(err);
      setError("Не удалось удалить отель.");
    }
  };

  useEffect(() => {
    fetchDirections();
  }, []);

  // Добавим логику для отображения отелей при переключении
  const handleToggleHotels = () => {
    setShowHotels(!showHotels);
    if (!showHotels) {
      fetchHotels(); // Загружаем отели при переключении на страницу отелей
    }
  };

  return (
    <div className="admin-container">
      <header className="content-header">
        <h1>Админ-панель</h1>
      </header>

      {/* Тумблер для переключения между страницами */}
      <section className="toggle-section">
        <button className="block" onClick={() => setShowHotels(false)}>
          Направления
        </button>
        <button onClick={handleToggleHotels}>Отели</button>
      </section>

      {/* Фильтрация и отображение направлений */}
      {!showHotels && (
        <section className="filters">
          <h2>Фильтрация направлений</h2>
          <div className="filter-row">
            <label>
              ID:
              <input
                type="text"
                value={filters.id}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, id: e.target.value }))
                }
              />
            </label>
            <label>
              Название:
              <input
                type="text"
                value={filters.name}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </label>
            <button className="filter" onClick={handleDirectionFilter}>
              Фильтровать
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <section className="results">
            <h2>Список направлений</h2>
            <div className="add-direction">
              <input
                type="text"
                value={newDirection}
                onChange={(e) => setNewDirection(e.target.value)}
                placeholder="Введите новое направление"
              />
              <button onClick={addDirection}>Добавить направление</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Название направления</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {filteredDirections.map((direction) => (
                  <tr key={direction.id}>
                    <td>{direction.id}</td>
                    <td>{direction.name}</td>
                    <td>
                      <div className="delete_direction">
                        <button onClick={() => openModal(direction.name)}>
                          Добавить отель
                        </button>
                        <button
                          onClick={() => deleteDirection(direction.name)}
                          style={{ marginLeft: "10px", color: "red" }}
                        >
                          Удалить направление
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      )}

      {/* Фильтрация и отображение отелей */}
      {showHotels && (
        <section className="filters">
          <h2>Фильтрация отелей</h2>
          <div className="filter-row">
            <label>
              Название:
              <input
                type="text"
                value={hotelFilters.name}
                onChange={(e) =>
                  setHotelFilters((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Преимущество:
              <input
                type="text"
                value={hotelFilters.advantage}
                onChange={(e) =>
                  setHotelFilters((prev) => ({
                    ...prev,
                    advantage: e.target.value,
                  }))
                }
              />
            </label>
            <button className="filter" onClick={handleHotelFilter}>
              Фильтровать
            </button>
          </div>

          <section className="results">
            <h2>Список отелей</h2>
            <table>
              <thead>
                <tr>
                  <th>Название отеля</th>
                  <th>Преимущество</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {filteredHotels.map((hotel) => (
                  <tr key={hotel.name}>
                    <td>{hotel.name}</td>
                    <td>{hotel.advantage}</td>
                    <td>
                      <button
                        onClick={() => deleteHotel(hotel.name)}
                        style={{ color: "red" }}
                      >
                        Удалить отель
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      )}

      {/* Модальное окно для добавления отеля */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Добавить отель для направления: {selectedDirection}</h2>
            <label>
              Название отеля:
              <input
                type="text"
                value={hotelData.name}
                onChange={(e) =>
                  setHotelData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </label>
            <label>
              Преимущество:
              <input
                type="text"
                value={hotelData.advantage}
                onChange={(e) =>
                  setHotelData((prev) => ({
                    ...prev,
                    advantage: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Изображение:
              <input type="file" onChange={handleFileChange} />
            </label>
            {error && <p className="error-message">{error}</p>}
            <div className="and_close">
              <button className="elem" onClick={addHotel}>
                Добавить
              </button>
              <button className="elem" onClick={closeModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
