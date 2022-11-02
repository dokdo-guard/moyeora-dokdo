package com.ssafy.dokdo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "QuizUser")
public class QuizUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    @JsonIgnore
    private Long id;
    private boolean five;
    private boolean ten;
    private boolean fifteen;

    public QuizUser(){}

    public QuizUser(boolean five, boolean ten, boolean fifteen) {
        this.five = five;
        this.ten = ten;
        this.fifteen = fifteen;
    }
}
