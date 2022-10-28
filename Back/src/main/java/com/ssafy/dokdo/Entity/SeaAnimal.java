package com.ssafy.dokdo.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class SeaAnimal {
    @Id
    private String id;
    private String name;
    private String summary;
    private String speciesInformation;
    private String img;
}
