package com.ssafy.dokdo.Entity;

import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document
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
    private String lat;
    private String lng;

}
