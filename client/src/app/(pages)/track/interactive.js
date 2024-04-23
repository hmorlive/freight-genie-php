"use client";

import { useRouter, useSearchParams } from "next/navigation";
import TrackForm from "./track-form";
import { getQuotes } from "@/app/api-calls";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard";

export default function Interactive() {
    const path = useSearchParams();
    const [email, setEmail] = useState(path.get("email"));
    const [error, setError] = useState(false);
    const router = useRouter();

    const [data, setData] = useState(null);

    const fetchQuote = async (email) => {
        try {
            const response = await getQuotes(email);  // Attempt to fetch the quotes
    
            if (!response.ok) {  // Check if the response was successful
                throw new Error('Failed to fetch quotes');  // Throw an error to be caught
            }
    
            const data = await response.json();  // Try parsing the JSON data
    
            if (!data || data.length === 0) {  // Ensure that data was successfully parsed and is not empty
                throw new Error('No data received');
            }
    
            setData(data);  // Set data if everything is okay
            router.push(`/track?email=${encodeURIComponent(email)}`);  // Redirect to track page
        } catch (error) {
            console.error(error);  // Log the error to the console or handle it as needed
            setEmail(null);  // Reset email on error
            setError(true);  // Indicate an error state in the UI
        }
    }    

    useEffect(() => {
        if (email) {
            fetchQuote(email);
        }
    }, [email]);

    if (email && !data) return <span className="m-auto rounded-full w-16 h-16 border-4 border-l-sky-600 animate-spin"></span>;

    if (!email && !data) return <TrackForm fetchQuote={fetchQuote} error={error} />

    if (data) {
        return <Dashboard data={data} />;
    }
}