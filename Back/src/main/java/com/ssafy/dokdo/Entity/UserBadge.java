package com.ssafy.dokdo.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(name = "user_badge")
public class UserBadge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_badge_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    public void setUser(User user){
        this.user = user;
        // 무한루프에 빠지지 않도록 체크
        if(!user.getBadgeList().contains(this)){
            user.getBadgeList().add(this);
        }
    }
    @ManyToOne
    @JoinColumn(name = "badge_id")
    private Badge badge;

    public void setBadge(Badge badge){
        this.badge = badge;
        // 무한루프에 빠지지 않도록 체크
        if(!badge.getUserList().contains(this)){
            badge.getUserList().add(this);
        }
    }
}