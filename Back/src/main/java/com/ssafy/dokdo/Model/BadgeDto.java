package com.ssafy.dokdo.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BadgeDto {
    private Long badge_id;
    private String name;
    private String achievement;
    private String image;
}
