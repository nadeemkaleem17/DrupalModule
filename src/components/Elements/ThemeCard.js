import { Link } from "react-router-dom";
import { useTheme } from "../../context/theme-context";
import romance from "../../assets/images/romance.jpg";
import scifi from "../../assets/images/scifi.jpg";
import thriller from "../../assets/images/thriller.jpg";
import memoir from "../../assets/images/memoir.jpg";

const imageMap = {
  "romance.jpg": romance,
  "scifi.jpg": scifi,
  "thriller.jpg": thriller,
  "memoir.jpg": memoir,
};

export const ThemeCard = ({ theme }) => {
  const { title, image } = theme;
  const { darkMode } = useTheme();
  const imageSrc = imageMap[image];

  return (
    <div
      className="card my-2 shadow-sm border-0"
      style={{ width: "14rem", height: "240px", overflow: "hidden", position: "relative" }}
    >
      <Link to="/" className="position-relative d-block h-100">
        <img
          src={imageSrc}
          className="w-100 h-100"
          alt="Theme cover"
          style={{ objectFit: "cover", borderRadius: "0.25rem" }}
        />
        <div
          className="position-absolute w-100 px-3 py-2"
          style={{
            bottom: "0",
            background: darkMode
              ? "rgba(0, 0, 0, 0.6)"
              : "rgba(255, 255, 255, 0.7)",
            color: darkMode ? "white" : "black",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {title}
        </div>
      </Link>
    </div>
  );
};
