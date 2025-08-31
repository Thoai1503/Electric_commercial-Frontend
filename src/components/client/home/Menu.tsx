import { useState } from "react";
import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaApple,
  FaWindows,
  FaKeyboard,
} from "react-icons/fa";
import "./css/Menu.css";

const Menu = () => {
  const categories = [
    {
      id: 1,
      name: "Điện thoại",
      count: 14,
      icon: <FaMobileAlt />,
      children: [
        { name: "iPhone", icon: <FaApple /> },
        { name: "Samsung", icon: <FaMobileAlt /> },
        { name: "Xiaomi", icon: <FaMobileAlt /> },
      ],
    },
    {
      id: 2,
      name: "Laptop",
      count: 8,
      icon: <FaLaptop />,
      children: [
        { name: "MacBook", icon: <FaApple /> },
        { name: "Dell", icon: <FaWindows /> },
        { name: "Asus", icon: <FaWindows /> },
      ],
    },
    {
      id: 3,
      name: "Phụ kiện",
      count: 20,
      icon: <FaHeadphones />,
      children: [
        { name: "Chuột", icon: <FaKeyboard /> },
        { name: "Bàn phím", icon: <FaKeyboard /> },
        { name: "Tai nghe", icon: <FaHeadphones /> },
      ],
    },
    {
      id: 4,
      name: "Điện thoại",
      count: 14,
      icon: <FaMobileAlt />,
      children: [
        { name: "iPhone", icon: <FaApple /> },
        { name: "Samsung", icon: <FaMobileAlt /> },
        { name: "Xiaomi", icon: <FaMobileAlt /> },
      ],
    },
    {
      id: 5,
      name: "Laptop",
      count: 8,
      icon: <FaLaptop />,
      children: [
        { name: "MacBook", icon: <FaApple /> },
        { name: "Dell", icon: <FaWindows /> },
        { name: "Asus", icon: <FaWindows /> },
      ],
    },
    {
      id: 6,
      name: "Phụ kiện",
      count: 20,
      icon: <FaHeadphones />,
      children: [
        { name: "Chuột", icon: <FaKeyboard /> },
        { name: "Bàn phím", icon: <FaKeyboard /> },
        { name: "Tai nghe", icon: <FaHeadphones /> },
      ],
    },
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const activeCategory = categories.find((c) => c.id === hoveredId);

  return (
    <div
      className="menu-container"
      onMouseLeave={() => setHoveredId(null)} // khi rời toàn bộ container thì ẩn panel
    >
      {/* Sidebar */}
      <ul className="list-group list-group-light sidebar-menu">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={`menu-list text-primary d-flex justify-content-between align-items-center ${
              hoveredId === cat.id ? "active" : ""
            }`}
            onMouseEnter={() => setHoveredId(cat.id)} // hover vào item thì hiện panel
          >
            <span className="d-flex align-items-center gap-2">
              {cat.icon} {cat.name}
            </span>
          </li>
        ))}
      </ul>

      {/* Panel hiển thị khi hover */}
      {activeCategory && (
        <div className="submenu-panel">
          <h6 className="mb-3">{activeCategory.name}</h6>
          <ul className="list-group">
            {activeCategory.children.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex align-items-center gap-2"
              >
                {item.icon} {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
