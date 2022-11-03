package com.ssafy.dokdo.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Visited")
public class Visited {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visited_id")
    private Long id;

    private boolean history =false;
    private boolean biology =false;
    private boolean terrain =false;
    @Builder
    public Visited(Long id, boolean history, boolean biology, boolean terrain) {
        this.id = id;
        this.history = history;
        this.biology = biology;
        this.terrain = terrain;
    }
}
