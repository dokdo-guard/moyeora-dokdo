package com.ssafy.dokdo.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class SeaPlant {
    @Id
    private String id;
    private String name;
    private String summary;
    private String speciesInformation;
    private String img;
}
