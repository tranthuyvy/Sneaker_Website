package com.project.ecommerce.service;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class OAuth2UserServiceImpl implements OAuth2UserService {
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2AccessToken token = userRequest.getAccessToken();
        System.out.println(userRequest.toString());
        System.out.println(token);

        // Create a new User object
        User user = new User();

        // Return the User object
        return (OAuth2User) user;
    }
}
