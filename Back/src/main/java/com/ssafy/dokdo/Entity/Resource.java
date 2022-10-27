package com.ssafy.dokdo.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "resource")
public class Resource {
    @Id
    private String id;
    private String name;
    private String summary;
    private String information;
    private String img1;
    private String img2;
    private String img3;
}
