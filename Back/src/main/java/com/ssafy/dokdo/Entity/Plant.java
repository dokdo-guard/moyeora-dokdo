package com.ssafy.dokdo.Entity;

import com.ssafy.dokdo.Model.AllSpecies;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document
public class Plant {
    @Id
    private String id;
    private String name;
    private String scientificName;
    private String classificationSystem;
    private String information;
    private String summary;
    private String speciesInformation;
    private String img;
    private String domain;
}
