package com.ssafy.dokdo.Security.oauth2.user;

import java.util.HashMap;
import java.util.LinkedHashMap;
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

        HashMap hashMap = (HashMap)attributes.get("kakao_account");
        HashMap profileHashMap =(HashMap) hashMap.get("profile");

        return (String) profileHashMap.get("nickname");
    }

    @Override
    public String getEmail() {
        HashMap hashMap = (HashMap) attributes.get("kakao_account");
        return (String) hashMap.get("email");
    }
}
