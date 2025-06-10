'use client';
import { useEffect, useState } from "react";
import styles from "./ImageGallery.module.scss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ImageGallery({ festivalId }) {
    const [images, setImages] = useState([]);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(`${API_URL}/gallery/${festivalId}`);
                if (!res.ok) throw new Error("Erreur lors de la récupération des images");
                const data = await res.json();
                setImages(data.images || []);
            } catch (err) {
                console.error(err);
                setImages([]);
            }
        };

        fetchImages();
    }, [festivalId]);

    if (images.length === 0) return <p>Aucune image disponible</p>;

    const handleClick = (img) => setActiveImage(img);
    const handleClose = () => setActiveImage(null);

    return (
        <>
            <div className={styles.container}>
                {images.map((imgPath, index) => (
                    <img
                        key={index}
                        src={`${API_URL}/${imgPath.replace(/\\/g, '/')}`}
                        alt={`Festival image ${index + 1}`}
                        className={styles.thumbnail}
                        onClick={() => handleClick(imgPath)}
                    />
                ))}
            </div>

            {activeImage && (
                <div className={styles.modal} onClick={handleClose}>
                    <img
                        src={`${API_URL}/${activeImage.replace(/\\/g, '/')}`}
                        alt="Image agrandie"
                        className={styles.fullImage}
                    />
                </div>
            )}
        </>
    );
}