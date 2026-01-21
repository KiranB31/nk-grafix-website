package com.grafix.website;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.io.File;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import java.util.UUID;

@Service
public class BlogService {
    private final List<BlogPost> posts = new ArrayList<>();
    private final String FILE_PATH = "blog_posts.json";
    private final ObjectMapper mapper = new ObjectMapper();

    public BlogService() {
        loadPosts();
        if (posts.isEmpty()) {
            posts.add(new BlogPost("1", "The Future of AI in Design", "January 15, 2026",
                    "How machine learning is transforming the way we create brand identities and digital assets.",
                    "/images/card2.png"));
            posts.add(new BlogPost("2", "Color Trends for 2026", "January 10, 2026",
                    "Exploring the shift towards organic neons and grounding earth tones in modern marketing.",
                    "/images/card1.png"));
            posts.add(new BlogPost("3", "Holographic Print Techniques", "January 05, 2026",
                    "A dive into our signature holographic cards.", "/images/card2.png"));
            savePosts();
        }
    }

    private void loadPosts() {
        try {
            File file = new File(FILE_PATH);
            if (file.exists()) {
                BlogPost[] loaded = mapper.readValue(file, BlogPost[].class);
                posts.clear();
                posts.addAll(Arrays.asList(loaded));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void savePosts() {
        try {
            mapper.writeValue(new File(FILE_PATH), posts);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<BlogPost> getAllPosts() {
        return posts;
    }

    public void addPost(BlogPost post) {
        post.setId(UUID.randomUUID().toString());
        post.setDate(java.time.LocalDate.now().toString());
        posts.add(0, post); // Add to top
        savePosts();
    }

    public void deletePost(String id) {
        posts.removeIf(p -> p.getId().equals(id));
        savePosts();
    }
}
