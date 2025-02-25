"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component from shadcn/ui
import { Label } from "@/components/ui/label"; // Optional, for accessibility

type Tournament = {
  title: string;
  gameName: string;
  date: string;
  prizePool: number;
  status: string;
  description: string;
};

interface TournamentFormProps {
  onSubmit: (tournament: Tournament) => Promise<void>;
  onClose: () => void; // To close the form
}

export default function TournamentForm({
  onSubmit,
  onClose,
}: TournamentFormProps) {
  const [formData, setFormData] = useState<Tournament>({
    title: "",
    gameName: "",
    date: "",
    prizePool: 0,
    status: "Upcoming",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "prizePool" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#01a74b] mb-4">
          Add New Tournament
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Tournament Title"
              className="bg-zinc-800 text-white border-zinc-700"
              required
            />
          </div>
          <div>
            <Label htmlFor="gameName">Game Name</Label>
            <Input
              id="gameName"
              name="gameName"
              value={formData.gameName}
              onChange={handleChange}
              placeholder="Game Name"
              className="bg-zinc-800 text-white border-zinc-700"
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="bg-zinc-800 text-white border-zinc-700"
              required
            />
          </div>
          <div>
            <Label htmlFor="prizePool">Prize Pool ($)</Label>
            <Input
              id="prizePool"
              name="prizePool"
              type="number"
              value={formData.prizePool}
              onChange={handleChange}
              placeholder="Prize Pool"
              className="bg-zinc-800 text-white border-zinc-700"
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-zinc-800 text-white border-zinc-700 w-full p-2 rounded"
              aria-label="Status"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="bg-zinc-800 text-white border-zinc-700"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-[#01a74b] hover:bg-[#018a3d] w-full"
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="bg-zinc-700 hover:bg-zinc-600 w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
