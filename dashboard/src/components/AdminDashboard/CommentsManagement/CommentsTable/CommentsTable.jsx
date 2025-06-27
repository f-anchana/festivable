'use client';
import styles from "@/styles/Table.module.scss";

import CommentRow from "../CommentRow/CommentRow";

import { useState, useEffect } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CommentsTable({ festivalId }) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`${API_URL}/comments/${festivalId}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!res.ok) throw new Error("Erreur de récupération");
                const data = await res.json();

                setComments(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchComments();
    }, [festivalId]); // <-- dépendance ici

    return (
        <>
            <table className={styles.container}>
                <thead className={styles.head}>
                    <tr>
                        <th>Avatar</th>
                        <th>Pseudo</th>
                        <th>Handicap</th>
                        <th>Date</th>
                        <th>Commentaire</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment) => (
                        <CommentRow
                            key={comment?._id || ''}
                            _id={comment?._id || ''}
                            profile_picture={comment?.userId?.profile_picture || ''}
                            pseudo={comment?.userId?.pseudo || 'Anonyme'}
                            disability={comment?.disability || ''}
                            date={comment?.date || ''}
                            comment={comment?.comment || ''}
                        />
                    ))}
                </tbody>
            </table >
        </>
    );
}