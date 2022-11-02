package com.ssafy.dokdo.Entity;


import lombok.*;

import javax.persistence.*;


@Entity
@Data
@Getter
@NoArgsConstructor
@Table(name = "Dogam")
public class Dogam {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dogam_id")
    private Long id;
    private Long user_id;
    private String domain;
    private String mongo_id;
    @Builder
    public Dogam(Long id, Long user_id, String domain, String mongo_id) {
        this.id = id;
        this.user_id = user_id;
        this.domain = domain;
        this.mongo_id = mongo_id;
    }
}
