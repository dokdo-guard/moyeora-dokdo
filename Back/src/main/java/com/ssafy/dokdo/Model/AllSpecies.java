package com.ssafy.dokdo.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class AllSpecies {
    public String name;
    public String domain;
    public String img;

    public AllSpecies(String name, String domain, String img) {
        this.name = name;
        this.domain = domain;
        this.img = img;
    }
}
