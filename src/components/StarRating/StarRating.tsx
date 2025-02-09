import { useState } from "react";


const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  return (
    <div style={{height: 60}}>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="checkbox"
              checked={rating >= value}
              onChange={() => handleRatingChange(value)}
              style={{ display: "none" }}
            />
            <span
              style={{
                cursor: "pointer",
                fontSize: "3rem",
                color: rating >= value ? "gold" : "gray",
              }}
            >
              ★
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StarRating;