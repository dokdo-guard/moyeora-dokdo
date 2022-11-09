package com.ssafy.dokdo.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@NoArgsConstructor
@Document
public class Resource {
    @Id
    private String id;
    private String name;
    private String summary;
    private String information;
    private String img1;
    private String img2;
    private String img3;

    @Builder
    public Resource(String id, String name, String summary, String information, String img1, String img2, String img3) {
        this.id = id;
        this.name = name;
        this.summary = summary;
        this.information = information;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
    }
}
