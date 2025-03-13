import { useState } from "react";
import { Star } from "./star";

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const starContainerStyle = {
    display: "flex",
};

export function Rating({
    maxRating = 10,
    color = "#fcc419",
    size = 48,
    onSetRating,
}) {
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    const textStyle = {
        lineHeight: "0",
        margin: "0",
        color: `${color}`,
        fontSize: `${size / 1.5}px`,
    };

    function handleRating(rating) {
        setRating(rating);
        onSetRating(rating);
    }

    function handleHover(rating) {
        setTempRating(rating);
    }

    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        onRate={() => handleRating(i + 1)}
                        full={tempRating ? i < tempRating : i < rating}
                        onHover={() => handleHover(i + 1)}
                        onLeave={() => handleHover(0)}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            <p style={textStyle}>{tempRating || rating || ""} </p>
        </div>
    );
}
