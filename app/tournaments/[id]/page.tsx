"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Calendar,
  DollarSign,
  ArrowLeft,
  Gamepad2,
  ReceiptText,
} from "lucide-react";
import Link from "next/link";

type Tournament = {
  id: number;
  title: string;
  gameName: string;
  date: string;
  prizePool: number;
  status: string;
  description: string;
};

export default function TournamentDetails() {
  const params = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTournament() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/tournaments/${params.id}`
        );
        if (!response.ok) throw new Error("Tournament not found");
        const data: Tournament = await response.json();
        setTournament(data);
      } catch (err) {
        setError("Failed to load tournament details.");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchTournament();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen gaming-gradient text-white p-4 sm:p-8 font-['Chakra_Petch']">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <Gamepad2 className="w-12 h-12 text-[#01a74b]" />
            <span className="text-xl">Loading Tournament Details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tournament) {
    return (
      <div className="min-h-screen gaming-gradient text-white p-4 sm:p-8 font-['Chakra_Petch']">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[#01a74b] neon-text">
            {error || "Tournament not found"}
          </h1>
          <Link href="/">
            <Button className="mt-4 gaming-button text-white">
              Back to Tournaments
              <ArrowLeft className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const rules = ["Rule 1", "Rule 2", "Rule 3"];
  const prizeBreakdown = { first: "50%", second: "30%", third: "20%" };

  return (
    <div className="min-h-screen gaming-gradient text-white p-4 sm:p-8 font-['Chakra_Petch']">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:text-white hover:bg-[#01a74b] gaming-button"
            >
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Back to Tournaments
            </Button>
          </Link>
        </Link>
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#01a74b] font-['Orbitron'] neon-text">
              {tournament.title}
            </h1>
            <Badge
              variant={
                tournament.status === "Upcoming" ? "default" : "secondary"
              }
              className={`${
                tournament.status === "Upcoming"
                  ? "bg-[#01a74b] text-white"
                  : "bg-zinc-700 text-white"
              } text-sm sm:text-base`}
            >
              {tournament.status}
            </Badge>
          </div>
          <Card className="tournament-card p-4 sm:p-6 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
            </div>
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#01a74b] neon-text mb-3">
                  Description
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base">
                  {tournament.description}
                </p>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#01a74b] neon-text mb-3">
                  Rules
                </h2>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 text-sm sm:text-base">
                  {rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#01a74b] neon-text mb-3">
                  Prize Breakdown
                </h2>
                <div className="space-y-2 text-zinc-400 text-sm sm:text-base">
                  {Object.entries(prizeBreakdown).map(
                    ([place, percentage], index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="capitalize">{place} Place</span>
                        <span>
                          {percentage} ($
                          {(
                            (parseFloat(percentage) / 100) *
                            tournament.prizePool
                          ).toLocaleString()}
                          )
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
