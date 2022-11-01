package com.ssafy.dokdo.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Board {
    @Id
    private String id;
    private String writer;
    private String content;
    private String image_url;
    private String created_at;
}
