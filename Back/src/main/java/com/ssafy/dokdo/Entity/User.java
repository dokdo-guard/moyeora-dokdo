package com.ssafy.dokdo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.dokdo.Model.AuthProvider;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "name")
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    @JsonIgnore
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false)
    private String email;

    @NotNull
    private String userCharacter = "default";

    @NotNull
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private AuthProvider provider;

    @JsonIgnore
    private String providerId;

    //Visited 참조
    @OneToOne
    @JoinColumn(name = "visited_id")
    private Visited visited;

    //QuizUser 참조
    @OneToOne
    @JoinColumn(name = "quiz_id")
    private QuizUser quizUser;

    //Dogam 참조
    @OneToMany
    @JoinColumn(name = "user_id")
    private List<Dogam> dogamList = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "user_badge", // 연결 테이블 지정
            joinColumns = @JoinColumn(name = "user_id"), // joinColumns: 현재 방향인 회원과 매핑할 조인 컬럼 정보 지정
            inverseJoinColumns = @JoinColumn(name = "badge_id"))
    private List<Badge> badgeList = new ArrayList<>();

}
