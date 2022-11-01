package com.ssafy.dokdo.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Board {
    @Id
    private String id;
    private String writer;
    private String image_url;
    private Timestamp created_at;
}
