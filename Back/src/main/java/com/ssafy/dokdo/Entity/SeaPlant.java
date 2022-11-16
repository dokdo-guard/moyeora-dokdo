package com.ssafy.dokdo.Entity;

import com.ssafy.dokdo.Model.AllSpecies;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document
public class SeaPlant extends AllSpecies {
    @Id
    private String id;
    private String summary;
    private String speciesInformation;

    public SeaPlant(String name, String domain, String img) {
        super(name, domain, img);
    }
}
