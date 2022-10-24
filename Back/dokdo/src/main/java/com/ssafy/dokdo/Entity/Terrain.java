package com.ssafy.dokdo.Entity;

import org.springframework.data.annotation.Id;

public class Terrain {
    @Id
    private String id;
    private String name;
    private String summary;
    private String location;
    private String img1;
    private String img2;
    private String img3;
    private String img4;
}
