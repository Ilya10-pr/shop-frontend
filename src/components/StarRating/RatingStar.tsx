import { FC } from "react";


const RatingStar: FC<{ rating: number, setRating: (value: number) => void }> = ({ rating, setRating }) => {
  

  return (<div>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                <input
                  type="checkbox"
                  checked={rating >= value}
                  onChange={() => setRating(value)}
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
  );
};

export default RatingStar;