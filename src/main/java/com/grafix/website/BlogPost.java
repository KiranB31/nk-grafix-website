package com.grafix.website;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogPost {
    private String id;
    private String title;
    private String date;
    private String content;
    private String imageUrl;
}
