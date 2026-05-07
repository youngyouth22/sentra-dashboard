import React from "react";

interface ImageProps {
    src: string;
    alt?: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt = "Image", className = "" }) => {
    return (
        <img
            src={src}
            alt={alt}
            className={`object-cover ${className}`}
        />
    );
};

export default Image;
