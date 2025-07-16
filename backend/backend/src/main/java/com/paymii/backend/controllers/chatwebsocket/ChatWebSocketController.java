package com.paymii.backend.controllers.chatwebsocket;

import com.paymii.backend.dtos.chat_message.ChatMessageDto;
import com.paymii.backend.entities.ChatMessage;
import com.paymii.backend.repositories.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageRepository chatMessageRepository;

    @MessageMapping("/chat.send") // client sends to /app/chat.send
    public void sendMessage(@Payload ChatMessageDto messageDTO) {
        ChatMessage saved = chatMessageRepository.save(ChatMessage.builder()
                .sender(messageDTO.getSender())
                .content(messageDTO.getContent())
                .timestamp(LocalDateTime.now())
                .room(messageDTO.getRoom())
                .build());

        messagingTemplate.convertAndSend("/topic/" + messageDTO.getRoom(), saved);
    }
}
