"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Calendar,
  DollarSign,
  Menu,
  X,
  CirclePlus,
  GalleryHorizontalEnd,
  CircleCheck,
  CircleChevronUp,
  ReceiptText,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";
import TournamentForm from "@/app/tournamentform/page"; // Adjust path as needed
import gsap from "gsap";

type Tournament = {
  id?: number;
  title: string;
  gameName: string;
  date: string;
  prizePool: number;
  status: string;
  description: string;
};

export default function TournamentDashboard() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const response = await fetch("http://localhost:8080/api/tournaments");
        if (!response.ok) throw new Error("Failed to fetch tournaments");
        const data: Tournament[] = await response.json();
        setTournaments(data);
      } catch (err) {
        setError("Couldn't load tournaments. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchTournaments();
  }, []);

  // GSAP Animation for Mobile Menu
  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          menuRef.current,
          { x: "100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      } else {
        gsap.to(menuRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        });
      }
    }
  }, [isMenuOpen]);

  const handleAddTournament = async (newTournament: Tournament) => {
    try {
      const response = await fetch("http://localhost:8080/api/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTournament),
      });
      if (!response.ok) throw new Error("Failed to add tournament");
      const savedTournament = await response.json();
      setTournaments([...tournaments, savedTournament]);
    } catch (err) {
      setError("Failed to add tournament. Please try again.");
    }
  };

  const filteredTournaments = tournaments.filter((tournament) => {
    if (filter === "all") return true;
    return filter === tournament.status.toLowerCase();
  });

  if (loading) {
    return (
      <div className="min-h-screen gaming-gradient text-white p-4 sm:p-8 font-['Chakra_Petch']">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <Gamepad2 className="w-12 h-12 text-[#01a74b]" />
            <span className="text-xl">Loading Tournaments...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen gaming-gradient text-white p-4 sm:p-8 font-['Chakra_Petch']">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gaming-gradient text-white p-4 sm:p-8 font-['Chakra_Petch'] relative">
      <div className="max-w-7xl mx-auto">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#01a74b] font-['Orbitron'] neon-text flex items-center gap-2 sm:gap-3">
            <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10" />
            Tournament Hub
          </h1>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex gap-2 lg:gap-3">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={`gaming-button text-white ${
                filter === "all"
                  ? "bg-[#01a74b] hover:bg-[#018a3d]"
                  : "border-[#01a74b] text-[#01a74b] bg-transparent hover:bg-[#01a74b] hover:text-white"
              }`}
            >
              All
              <GalleryHorizontalEnd className="ml-2 sm:ml-4 w-5 h-5" />
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
              className={`gaming-button ${
                filter === "upcoming"
                  ? "bg-[#01a74b] hover:bg-[#018a3d] text-white"
                  : "border-[#01a74b] text-white bg-transparent hover:bg-[#01a74b] hover:text-white"
              }`}
            >
              Upcoming
              <CircleChevronUp className="ml-2 sm:ml-4 w-5 h-5" />
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className={`gaming-button ${
                filter === "completed"
                  ? "bg-[#01a74b] hover:bg-[#018a3d] text-white"
                  : "border-[#01a74b] text-white bg-transparent hover:bg-[#01a74b] hover:text-white"
              }`}
            >
              Completed
              <CircleCheck className="ml-2 sm:ml-4 w-5 h-5" />
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="gaming-button bg-[#01a74b] hover:bg-[#018a3d] text-white"
            >
              Add Tournament
              <CirclePlus className="ml-2 sm:ml-4 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu (Full-Screen) */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="fixed inset-0 md:hidden bg-[rgba(17,24,39,0.98)] backdrop-blur-lg z-50 flex flex-col items-center justify-center p-6"
          >
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-white p-2"
            >
              <X size={32} />
            </Button>
            <div className="flex flex-col gap-6 w-full max-w-md">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => {
                  setFilter("all");
                  setIsMenuOpen(false);
                }}
                className={`gaming-button text-white w-full text-lg py-6 ${
                  filter === "all"
                    ? "bg-[#01a74b] hover:bg-[#018a3d]"
                    : "border-[#01a74b] text-[#01a74b] bg-transparent hover:bg-[#01a74b] hover:text-white"
                }`}
              >
                All
                <GalleryHorizontalEnd className="ml-4 w-6 h-6" />
              </Button>
              <Button
                variant={filter === "upcoming" ? "default" : "outline"}
                onClick={() => {
                  setFilter("upcoming");
                  setIsMenuOpen(false);
                }}
                className={`gaming-button text-white w-full text-lg py-6 ${
                  filter === "upcoming"
                    ? "bg-[#01a74b] hover:bg-[#018a3d]"
                    : "border-[#01a74b] text-[#01a74b] bg-transparent hover:bg-[#01a74b] hover:text-white"
                }`}
              >
                Upcoming
                <CircleChevronUp className="ml-4 w-6 h-6" />
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                onClick={() => {
                  setFilter("completed");
                  setIsMenuOpen(false);
                }}
                className={`gaming-button text-white w-full text-lg py-6 ${
                  filter === "completed"
                    ? "bg-[#01a74b] hover:bg-[#018a3d]"
                    : "border-[#01a74b] text-[#01a74b] bg-transparent hover:bg-[#01a74b] hover:text-white"
                }`}
              >
                Completed
                <CircleCheck className="ml-4 w-6 h-6" />
              </Button>
              <Button
                onClick={() => {
                  setShowForm(true);
                  setIsMenuOpen(false);
                }}
                className="gaming-button bg-[#01a74b] hover:bg-[#018a3d] text-white w-full text-lg py-6"
              >
                Add Tournament
                <CirclePlus className="ml-4 w-6 h-6" />
              </Button>
            </div>
          </div>
        )}

        {/* Dashboard Content with Blur Effect */}
        <div className={showForm ? "blur-md" : ""}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTournaments.map((tournament) => (
              <Card
                key={tournament.id}
                className="tournament-card p-4 sm:p-6 rounded-xl"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#01a74b] font-['Orbitron'] neon-text">
                      {tournament.title}
                    </h2>
                    <Badge
                      variant={
                        tournament.status === "Upcoming"
                          ? "default"
                          : "secondary"
                      }
                      className={`${
                        tournament.status === "Upcoming"
                          ? "bg-[#01a74b] font-['Chakra_Petch']"
                          : "font-['Chakra_Petch'] bg-zinc-700"
                      }`}
                    >
                      {tournament.status}
                    </Badge>
                  </div>
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 flex-grow">
                    <div className="flex items-center gap-2 sm:gap-3 text-zinc-300">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#01a74b]" />
                      <span className="text-base sm:text-lg">
                        {tournament.gameName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-zinc-300">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#01a74b]" />
                      <span className="text-base sm:text-lg">
                        {new Date(tournament.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-zinc-300">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[#01a74b]" />
                      <span className="text-base sm:text-lg">
                        ${tournament.prizePool.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-zinc-400 mt-2 sm:mt-4 leading-relaxed">
                      {tournament.description}
                    </p>
                  </div>
                  <Link
                    href={`/tournaments/${tournament.id}`}
                    className="mt-auto"
                  >
                    <Button className="w-full gaming-button text-white">
                      View Details
                      <ReceiptText className="ml-2 sm:ml-4 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tournament Form Modal */}
        {showForm && (
          <div className="modal-overlay">
            <TournamentForm
              onSubmit={handleAddTournament}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
