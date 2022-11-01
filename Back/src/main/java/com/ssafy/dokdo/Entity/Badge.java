package com.ssafy.dokdo.Entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "badge")
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_id")
    private Long id;

    private String name;
    private String achievement;
    private String image;

    @OneToMany(mappedBy = "badge")
    private List<UserBadge> userList;

    public void addUserBadge(UserBadge userBadge){
        this.userList.add(userBadge);
        if(userBadge.getBadge() != this) { // 무한루프에 빠지지 않도록 체크
            userBadge.setBadge(this);
        }
    }
}