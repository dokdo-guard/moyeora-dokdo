package com.ssafy.dokdo.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Quiz {
    @Id
    private String id;
    private String quizText;
    private String answer;
}
