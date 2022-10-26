package com.ssafy.dokdo.Security.oauth2.user;

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
        return (String) properties.get("nickname");
    }

    @Override
    public String getEmail() {
        // 수정한부분
        if(attributes.get("account_email") == null)
            System.out.println("\n\n>>> email is null <<<\n");
        return (String) attributes.get("account_email");
    }
}
