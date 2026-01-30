"use client";

import React, { useState, useEffect } from "react";
//import { createChallenge, updateChallenge } from "@/store/challengesSlice";

// Define allowed difficulty values
type ChallengeDifficulty = "easy" | "medium" | "hard";

interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: ChallengeDifficulty;
    duration: number;
    targetUrl?: string;
    createdAt: string;
    createdBy?: string;
}

interface CreateChallengeFormProps {
    initialData?: Challenge; // The form will use initialData if provided
    onSubmit: (challengeData: Challenge) => void; // Function to handle form submission
}

export const CreateChallengeForm = ({ initialData, onSubmit }: CreateChallengeFormProps) => {
    // Set the form state, using initialData if provided, or default values
    const [formData, setFormData] = useState<Challenge>({
        id: initialData?.id || "",
        title: initialData?.title || "",
        description: initialData?.description || "",
        difficulty: initialData?.difficulty || "easy",
        duration: initialData?.duration || 0,
        createdAt: initialData?.createdAt || "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "duration" ? Number(value) || 0 : value, // Convert duration to number
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData); // Calls the function passed from the parent component
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
                <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2">
                {initialData ? "Update Challenge" : "Create Challenge"}
            </button>
        </form>
    );
};
