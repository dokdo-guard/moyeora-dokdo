package com.ssafy.dokdo.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "id")
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

    @JsonIgnore
    private String password;

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
    @OneToMany(mappedBy = "user")
    private List<Dogam> dogamList = new ArrayList<>();

    public void addDogam(Dogam dogam){
        this.dogamList.add(dogam);
        if(dogam.getUser() != this) { // 무한루프에 빠지지 않도록 체크
            dogam.setUser(this);
        }
    }

    @OneToMany(mappedBy = "user")
    private List<UserBadge> badgeList = new ArrayList<>();

    public void addUserBadge(UserBadge userBadge){
        this.badgeList.add(userBadge);
        if(userBadge.getUser() != this) { // 무한루프에 빠지지 않도록 체크
            userBadge.setUser(this);
        }
    }

}
