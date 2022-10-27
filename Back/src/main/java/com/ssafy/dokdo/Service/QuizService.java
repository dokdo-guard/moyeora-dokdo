package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Quiz;
import com.ssafy.dokdo.Repository.QuizRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@AllArgsConstructor
@Service
public class QuizService {

    private final QuizRepository quizRepository;
    public List<Quiz> getQuizByNumber(int number){
         List<Quiz> quizList = quizRepository.findAll();
         List<Quiz> randomQuiz = new ArrayList<>();

        long seed = System.currentTimeMillis();
        Random rand = new Random(seed);

        int numberOfElements = number;

        for(int i=0;i<numberOfElements;i++){
            int randomIndex = rand.nextInt(quizList.size());
            Quiz randomElement = quizList.get(randomIndex);
            randomQuiz.add(randomElement);
            quizList.remove(randomIndex);
        }

         return  randomQuiz;
    }

}
