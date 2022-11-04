package com.ssafy.dokdo.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "badge")
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_id")
    private Long id;

    private String name;
    private String achievement;
    private String image;

    @Builder
    public Badge(Long id, String name, String achievement, String image) {
        this.id = id;
        this.name = name;
        this.achievement = achievement;
        this.image = image;
    }
}