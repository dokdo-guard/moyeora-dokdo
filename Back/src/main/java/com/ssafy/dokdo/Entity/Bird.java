package com.ssafy.dokdo.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Bird {
    @Id
    private String id;
    private String name;
    private String scientificName;
    private String classificationSystem;
    private String information;
    private String summary;
    private String speciesInformation;
    private String img;


}
