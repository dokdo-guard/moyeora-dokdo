package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.*;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Model.DogamDto;
import com.ssafy.dokdo.Model.UserDto;
import com.ssafy.dokdo.Repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final QuizUserRepository quizUserRepository;
    private final PlantRepository plantRepository;
    private final BirdRepository birdRepository;
    private final SeaPlantRepository seaPlantRepository;
    private final SeaAnimalRepository seaAnimalRepository;

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

//    public List<DogamDto> getDogamList(Long id, String domain) {
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
//
//        List<Dogam> dogamList = user.getDogamList();
//
//        return dogamList;
//    }

    public List<DogamDto> getPlantDogam(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        List<DogamDto> domainList = new ArrayList<>();

        List<Dogam> dogamList = user.getDogamList();  //유저가 가진 도감 리스트
        for (Dogam dogam : dogamList) {
            if (dogam.getDomain().equals("plant")) {
                DogamDto dg = new DogamDto();
                dg.setUser_id(dogam.getUser_id());
                dg.setDomain(dogam.getDomain());
                dg.setName(dogam.getMongo_id());
                Optional<Plant> d = plantRepository.findPlantByName(dogam.getMongo_id());
                String img = d.get().getImg();
                dg.setImage(img);

                domainList.add(dg);
            }
        }
        return domainList;
    }

    public List<DogamDto> getBirdDogam(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        List<DogamDto> domainList = new ArrayList<>();

        List<Dogam> dogamList = user.getDogamList();
        for (Dogam dogam : dogamList) {
            if (dogam.getDomain().equals("bird")) {
                DogamDto dg = new DogamDto();
                dg.setUser_id(dogam.getUser_id());
                dg.setDomain(dogam.getDomain());
                dg.setName(dogam.getMongo_id());
                Optional<Bird> d = birdRepository.findBirdByName(dogam.getMongo_id());
                String img = d.get().getImg();
                dg.setImage(img);

                domainList.add(dg);
            }
        }
        return domainList;
    }

    public List<DogamDto> getSeaPlantDogam(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        List<DogamDto> domainList = new ArrayList<>();

        List<Dogam> dogamList = user.getDogamList();
        for (Dogam dogam : dogamList) {
            if (dogam.getDomain().equals("seaPlant")) {
                DogamDto dg = new DogamDto();
                dg.setUser_id(dogam.getUser_id());
                dg.setDomain(dogam.getDomain());
                dg.setName(dogam.getMongo_id());
                Optional<SeaPlant> d = seaPlantRepository.findSeaPlantByName(dogam.getMongo_id());
                String img = d.get().getImg();
                dg.setImage(img);

                domainList.add(dg);
            }
        }
        return domainList;
    }

    public List<DogamDto> getSeaAnimalDogam(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        List<DogamDto> domainList = new ArrayList<>();

        List<Dogam> dogamList = user.getDogamList();
        for (Dogam dogam : dogamList) {
            if (dogam.getDomain().equals("seaAnimal")) {
                DogamDto dg = new DogamDto();
                dg.setUser_id(dogam.getUser_id());
                dg.setDomain(dogam.getDomain());
                dg.setName(dogam.getMongo_id());
                Optional<SeaAnimal> d = seaAnimalRepository.findSeaAnimalByName(dogam.getMongo_id());
                String img = d.get().getImg();
                dg.setImage(img);

                domainList.add(dg);
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
