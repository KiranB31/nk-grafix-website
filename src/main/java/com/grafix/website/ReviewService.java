package com.grafix.website;

import org.springframework.stereotype.Service;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ReviewService {
    private final List<Review> reviews = new ArrayList<>();
    private final String FILE_PATH = "reviews.json";
    private final ObjectMapper mapper = new ObjectMapper();

    public ReviewService() {
        loadReviews();
    }

    private void loadReviews() {
        try {
            File file = new File(FILE_PATH);
            if (file.exists()) {
                Review[] loaded = mapper.readValue(file, Review[].class);
                reviews.clear();
                reviews.addAll(Arrays.asList(loaded));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveReviews() {
        try {
            mapper.writeValue(new File(FILE_PATH), reviews);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Review> getAllReviews() {
        return reviews;
    }

    public void addReview(Review review) {
        review.setId(UUID.randomUUID().toString());
        review.setDate(java.time.LocalDate.now().toString());
        reviews.add(review);
        saveReviews();
    }

    public void deleteReview(String id) {
        reviews.removeIf(r -> r.getId().equals(id));
        saveReviews();
    }
}
