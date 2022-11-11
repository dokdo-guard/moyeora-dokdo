package com.ssafy.dokdo.Security.oauth2.user;

import java.util.HashMap;
import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getName() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        if (properties == null)     return null;

        HashMap<String, Object> hashMap = (HashMap<String, Object>)attributes.get("kakao_account");
        HashMap<String, Object> profileHashMap =(HashMap<String, Object>) hashMap.get("profile");

        return (String) profileHashMap.get("nickname");
    }

    @Override
    public String getEmail() {
        HashMap<String, Object> hashMap = (HashMap<String, Object>) attributes.get("kakao_account");
        return (String) hashMap.get("email");
    }
}
