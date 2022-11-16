package com.ssafy.dokdo.Entity;

import com.ssafy.dokdo.Model.AllSpecies;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document
public class Plant extends AllSpecies {
    @Id
    private String id;
    private String scientificName;
    private String classificationSystem;
    private String information;
    private String summary;
    private String speciesInformation;

    public Plant(String name, String domain, String img) {
        super(name, domain, img);
    }
}
