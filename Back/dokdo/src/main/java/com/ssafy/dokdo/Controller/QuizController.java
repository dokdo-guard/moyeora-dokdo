package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Bird;
import com.ssafy.dokdo.Entity.Quiz;
import com.ssafy.dokdo.Service.BirdService;
import com.ssafy.dokdo.Service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
@AllArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("quiz")
    public List<Quiz> fetchQuiz(@RequestParam(value = "number") int number){
        return quizService.getQuizByNumber(number);
    }
}
