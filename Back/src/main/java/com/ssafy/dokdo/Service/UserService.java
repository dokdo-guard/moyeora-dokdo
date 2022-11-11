package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Badge;
import com.ssafy.dokdo.Entity.Dogam;
import com.ssafy.dokdo.Entity.QuizUser;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Model.UserDto;
import com.ssafy.dokdo.Repository.DogamRepository;
import com.ssafy.dokdo.Repository.QuizUserRepository;
import com.ssafy.dokdo.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final QuizUserRepository quizUserRepository;
    private final DogamRepository dogamRepository;

    public UserDto getCurrentUser(Long id) {
        return convertToDto(userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id)));
    }

    public QuizUser getQuizResult(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return user.getQuizUser();
    }

    public QuizUser updateQuizResult(Long id, int quiz) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        QuizUser quizUser = user.getQuizUser();
        switch (quiz) {
            case 5:
                quizUser.setFive(true);
                break;
            case 10:
                quizUser.setTen(true);
                break;
            case 15:
                quizUser.setFifteen(true);
                break;
            default:
                throw new NoSuchElementException();
        }
        quizUserRepository.save(quizUser);
        user.setQuizUser(quizUser);
        userRepository.save(user);
        return quizUser;
    }

    public UserDto updateUserCharacter(Long id, String userCharacter) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setUserCharacter(userCharacter);
        return convertToDto(userRepository.save(user));
    }

    public Boolean checkNickName(String nickname){
        return userRepository.findByName(nickname).isPresent();
    }

    public UserDto updateName(Long id, String name) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setName(name);
        return convertToDto(userRepository.save(user));
    }

    public List<Dogam> getDogamList(Long id, String domain) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        List<Dogam> domainList = new ArrayList<>();

        List<Dogam> dogamList = user.getDogamList();
        for (Dogam dogam : dogamList) {
            if (dogam.getDomain().equals(domain)) {
                domainList.add(dogam);
            }
        }

        return domainList;
    }

    public List<Badge> getAllBadges(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        return user.getBadgeList();
    }

    public Boolean checkDogam(Long id, String domain, String mongoId) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        List<Dogam> dogamList = user.getDogamList();

        boolean flag = false;

        for (Dogam dogam : dogamList) {
            if (dogam.getDomain().equals(domain) && dogam.getMongo_id().equals(mongoId)) {
                flag = true;
                break;
            }
        }

        return flag;
    }

    private UserDto convertToDto(User findUser) {
        if (findUser == null) return null;
        UserDto dto = new UserDto();
        dto.setName(findUser.getName());
        dto.setEmail(findUser.getEmail());
        dto.setUserCharacter(findUser.getUserCharacter());
        return dto;
    }
}
