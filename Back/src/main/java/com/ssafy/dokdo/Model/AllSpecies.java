package com.ssafy.dokdo.Model;

import lombok.AllArgsConstructor;

public  class AllSpecies {
    public String name;
    public String summary;
    public String img;

    public AllSpecies(String name, String summary, String img) {
        this.name = name;
        this.summary = summary;
        this.img = img;
    }
}
