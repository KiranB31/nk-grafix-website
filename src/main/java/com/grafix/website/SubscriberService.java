package com.grafix.website;

import org.springframework.stereotype.Service;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class SubscriberService {
    private final List<String> subscribers = new ArrayList<>();
    private final String FILE_PATH = "subscribers.json";
    private final ObjectMapper mapper = new ObjectMapper();

    public SubscriberService() {
        loadSubscribers();
    }

    private void loadSubscribers() {
        try {
            File file = new File(FILE_PATH);
            if (file.exists()) {
                String[] loaded = mapper.readValue(file, String[].class);
                subscribers.clear();
                subscribers.addAll(Arrays.asList(loaded));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveSubscribers() {
        try {
            mapper.writeValue(new File(FILE_PATH), subscribers);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<String> getAllSubscribers() {
        return subscribers;
    }

    public void addSubscriber(String email) {
        if (!subscribers.contains(email)) {
            subscribers.add(email);
            saveSubscribers();
        }
    }
}
