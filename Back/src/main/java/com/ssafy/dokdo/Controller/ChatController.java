package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Model.ChatMessage;
import com.ssafy.dokdo.Model.PlayerMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;

//    @SendTo("/sub/chat/room/")
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType()))
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }

    @MessageMapping("/chat/playerMessage")
    public void movement(PlayerMessage message) {
//        if (PlayerMessage.MessageType.ENTER.equals(message.getType()))
//            message.setCoordi(0.0f, 0.0f, 0.0f);
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}