package com.example.tournament_api;

import jakarta.persistence.*;

@Entity
@Table(name = "tournaments")
public class Tournament {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String gameName;
    private String date;
    private Double prizePool;
    private String status;
    private String description;

    // Default constructor (required by JPA)
    public Tournament() {
    }

    // Parameterized constructor
    public Tournament(Long id, String title, String gameName, String date, Double prizePool, String status,
            String description) {
        this.id = id;
        this.title = title;
        this.gameName = gameName;
        this.date = date;
        this.prizePool = prizePool;
        this.status = status;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Double getPrizePool() {
        return prizePool;
    }

    public void setPrizePool(Double prizePool) {
        this.prizePool = prizePool;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}