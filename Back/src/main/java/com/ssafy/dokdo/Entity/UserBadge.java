package com.ssafy.dokdo.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table
public class UserBadge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean talkative = false;
    private Boolean birdComplete = false;
    private Boolean plantComplete = false;
    private Boolean SeaAnimalComplete = false;
    private Boolean quizFive = false;
    private Boolean quizTen = false;
    private Boolean quizFifteen = false;
    private Boolean visitBiology = false;
    private Boolean visitHistory = false;
    private Boolean visitTerrain = false;
}