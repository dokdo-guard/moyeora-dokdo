package com.ssafy.dokdo.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DogamDto {
    private Long id;
    private Long user_id;
    private String domain;
    private String name;
    private String image;
}
