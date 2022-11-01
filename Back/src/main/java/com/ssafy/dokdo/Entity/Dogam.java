package com.ssafy.dokdo.Entity;



import lombok.*;


import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(name = "Dogam")
public class Dogam {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dogam_id")
    private Long id;
    private Long user_id;
    private String domain;
    private String mongo_id;
}
