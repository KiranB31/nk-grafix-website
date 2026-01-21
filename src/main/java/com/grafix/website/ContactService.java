package com.grafix.website;

import org.springframework.stereotype.Service;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ContactService {
    private final List<ContactMessage> messages = new ArrayList<>();
    private final String FILE_PATH = "messages.json";
    private final ObjectMapper mapper = new ObjectMapper();

    public ContactService() {
        loadMessages();
    }

    private void loadMessages() {
        try {
            File file = new File(FILE_PATH);
            if (file.exists()) {
                ContactMessage[] loaded = mapper.readValue(file, ContactMessage[].class);
                messages.clear();
                messages.addAll(Arrays.asList(loaded));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveMessages() {
        try {
            mapper.writeValue(new File(FILE_PATH), messages);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<ContactMessage> getAllMessages() {
        return messages;
    }

    public void addMessage(ContactMessage message) {
        message.setId(UUID.randomUUID().toString());
        message.setDate(java.time.LocalDateTime.now().toString());
        messages.add(message);
        saveMessages();
    }

    public void deleteMessage(String id) {
        messages.removeIf(m -> m.getId().equals(id));
        saveMessages();
    }
}
