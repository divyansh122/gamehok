package com.example.tournament_api;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {
  private final TournamentRepository repository;

  public TournamentController(TournamentRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  public List<Tournament> getAllTournaments() {
    return repository.findAll();
  }

  @GetMapping("/{id}")
  public Tournament getTournamentById(@PathVariable Long id) {
    return repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Tournament not found with ID: " + id));
  }

  @PostMapping
  public Tournament createTournament(@RequestBody Tournament tournament) {

    if (tournament.getTitle() == null) {
      tournament = new Tournament(
          null,
          "Spring Showdown 2025",
          "Rocket League",
          "2025-05-01",
          2500.0,
          "Upcoming",
          "3v3, Double Elimination");
    }
    return repository.save(tournament);
  }
}