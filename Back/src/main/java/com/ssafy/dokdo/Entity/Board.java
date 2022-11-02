package com.ssafy.dokdo.Entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Getter
@Setter
@Document
public class Board {
    @Id
    private String id;
    private String writer;
    private String content;
    private String image_url;
    private String created_at;
}
