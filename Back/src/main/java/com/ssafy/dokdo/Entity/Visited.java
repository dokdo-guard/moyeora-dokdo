package com.ssafy.dokdo.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data

@Table(name = "Visited")
public class Visited {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visited_id")
    private Long id;

    private boolean history =false;
    private boolean biology =false;
    private boolean terrain =false;


}
