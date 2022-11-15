package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.*;
import com.ssafy.dokdo.Entity.Dogam;
import com.ssafy.dokdo.Entity.QuizUser;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Entity.UserBadge;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Model.DogamDto;
import com.ssafy.dokdo.Model.NpcDto;
import com.ssafy.dokdo.Model.UserDto;
import com.ssafy.dokdo.Repository.*;
import com.ssafy.dokdo.Repository.DogamRepository;
import com.ssafy.dokdo.Repository.QuizUserRepository;
import com.ssafy.dokdo.Repository.UserBadgeRepository;
import com.ssafy.dokdo.Repository.UserRepository;
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
    private final DogamRepository dogamRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final NpcRepository npcRepository;

    public UserDto getCurrentUser(Long id) {
        return convertToDto(userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id)));
    }

    public QuizUser getQuizResult(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return user.getQuizUser();
    }

    public void updateQuizResult(Long id, int quiz) {
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
    }

    public UserBadge getUserBadge(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return user.getUserBadge();
    }

    public void updateUserBadge(Long id, String badge){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        UserBadge userBadge = user.getUserBadge();
        switch (badge) {
            case "talkative":
                userBadge.setTalkative(true);
                break;
            case "plantComplete":
            case "plant_complete":
                userBadge.setPlantComplete(true);
                break;
            case "birdComplete":
            case "bird_complete":
                userBadge.setBirdComplete(true);
                break;
            case "seaAnimalComplete":
            case "sea_animal_complete":
                userBadge.setSeaAnimalComplete(true);
                break;
            case "quizFive":
            case "quiz_five":
                userBadge.setQuizFive(true);
                break;
            case "quizTen":
            case "quiz_ten":
                userBadge.setQuizTen(true);
                break;
            case "quizFifteen":
            case "quiz_fifteen":
                userBadge.setQuizFifteen(true);
                break;
            case "visitBiology":
            case "visit_biology":
                userBadge.setVisitBiology(true);
                break;
            case "visitHistory":
            case "visit_history":
                userBadge.setVisitHistory(true);
                break;
            case "visitTerrain":
            case "visit_terrain":
                userBadge.setVisitTerrain(true);
                break;
            default:
                throw new ResourceNotFoundException("Badge", "achivement", badge);
        }
        userBadgeRepository.save(userBadge);
        user.setUserBadge(userBadge);
        userRepository.save(user);
    }

    public void updateUserCharacter(Long id, String userCharacter) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setUserCharacter(userCharacter);
        userRepository.save(user);
    }

    public boolean checkNickName(String nickname){
        return userRepository.findByName(nickname).isPresent();
    }

    public void updateName(Long id, String name) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setName(name);
        userRepository.save(user);
    }

    public void updateFirstVisit(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setVisitedBefore(true);
        userRepository.save(user);
    }

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
        dto.setVisitedBefore(findUser.isVisitedBefore());
        return dto;
    }

    public List<Npc> saveNpcTalk(Long id, String name) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        List<Npc> npcList = user.getNpcList();   //유저가 대화한 npc 리스트를 가져온다.
        Npc newNpc = new Npc();
        newNpc.setUser_id(id);
        newNpc.setName(name);

        Boolean temp = false;  //중복 체크
        if (npcList.isEmpty()) {
            npcRepository.saveAndFlush(newNpc);
        } else {
            for (Npc npc : npcList) {
                if (npc.getName().equals(name) && npc.getUser_id().equals(id)) {  //해당 npc와 이미 대화했으면(user_id는 비교할 필요없을 듯)
                    temp = true;
                    break;
                }
            }
            if (Boolean.FALSE.equals(temp)) {
                npcRepository.saveAndFlush(newNpc);
            }
        }
        return user.getNpcList();  //기존에 있던 npc 리스트(추가로 저장한 npc 반영X)
    }

    public List<Npc> getNpcTalk(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        List<Npc> npcList = user.getNpcList();

        return npcList;
    }
}
