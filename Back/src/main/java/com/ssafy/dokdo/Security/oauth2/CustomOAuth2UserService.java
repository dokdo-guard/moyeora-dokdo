package com.ssafy.dokdo.Security.oauth2;

import com.ssafy.dokdo.Entity.QuizUser;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Entity.UserBadge;
import com.ssafy.dokdo.Entity.Visited;
import com.ssafy.dokdo.Exception.OAuth2AuthenticationProcessingException;
import com.ssafy.dokdo.Model.AuthProvider;
import com.ssafy.dokdo.Repository.QuizUserRepository;
import com.ssafy.dokdo.Repository.UserBadgeRepository;
import com.ssafy.dokdo.Repository.UserRepository;
import com.ssafy.dokdo.Repository.VisitedRepository;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Security.oauth2.user.OAuth2UserInfo;
import com.ssafy.dokdo.Security.oauth2.user.OAuth2UserInfoFactory;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final QuizUserRepository quizUserRepository;
    private final VisitedRepository visitedRepository;
    private final UserBadgeRepository userBadgeRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if(userOptional.isPresent()) {
            user = userOptional.get();
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();

        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setUserCharacter("siryeong");
        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());

        Visited visited = new Visited();
        user.setVisited(visited);
        visitedRepository.saveAndFlush(visited);

        QuizUser quizUser = new QuizUser();
        user.setQuizUser(quizUser);
        quizUserRepository.saveAndFlush(quizUser);

        UserBadge userBadge = new UserBadge();
        user.setUserBadge(userBadge);
        userBadgeRepository.saveAndFlush(userBadge);

        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        return userRepository.save(existingUser);
    }

}
