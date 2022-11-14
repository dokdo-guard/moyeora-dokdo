package com.ssafy.dokdo.Entity;

import com.ssafy.dokdo.Model.AllSpecies;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@NoArgsConstructor
@Document
public class SeaPlant {
    @Id
    private String id;
    private String name;
    private String summary;
    private String speciesInformation;
    private String img;
    @Builder
    public SeaPlant(String id, String name, String summary, String speciesInformation, String img) {
        this.id = id;
        this.name = name;
        this.summary = summary;
        this.speciesInformation = speciesInformation;
        this.img = img;
    }
}
