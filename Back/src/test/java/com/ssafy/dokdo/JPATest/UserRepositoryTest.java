package com.ssafy.dokdo.JPATest;

import com.ssafy.dokdo.Repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DisplayName("User Repository test case")
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    @Test
    void getCurrentUserTest(){
//        userRepository.
    }

    @Test
    void updateFirstVisiteTest(){

    }
}
