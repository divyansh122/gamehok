package com.example.tournament_api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {
  @Bean
  CommandLineRunner loadData(TournamentRepository repository) {
    return args -> {
      // Clear existing data
      repository.deleteAll();

      // Seed fresh data
      repository.save(new Tournament(null, "Winter Clash 2025", "Valorant", "2025-03-10", 5000.0, "Upcoming",
          "5v5, Best of 3, Open to all"));
      repository.save(new Tournament(null, "Apex Legends Showdown", "Apex Legends", "2025-02-20", 3000.0, "Completed",
          "Trios, $1000 per player"));
      repository.save(
          new Tournament(null, "CS:GO Pro League", "CS:GO", "2025-04-01", 10000.0, "Upcoming", "5v5, Bracket Style"));
      repository.save(
          new Tournament(null, "Summer Brawl", "Fortnite", "2025-06-15", 7500.0, "Upcoming", "Solo, Battle Royale"));
      repository
          .save(new Tournament(null, "Fall Finals", "Overwatch", "2024-11-30", 4000.0, "Completed", "6v6, Best of 5"));
    };
  }
}