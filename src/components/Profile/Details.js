import React from 'react';
import { useParams } from "react-router";

export default function Details() {

    const params = useParams();
    return (
        <div className="page-content">
            edit profile for user {params.id}
        </div>
    );
}
