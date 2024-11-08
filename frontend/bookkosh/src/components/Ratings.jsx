import React from 'react'
import { FaStar } from "react-icons/fa";
import { useState } from 'react';
function Ratings() {
    const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex text-xs">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="hidden text-xs"
            />
            <FaStar
              className="cursor-pointer text-sm"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={10}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  )
}

export default Ratings