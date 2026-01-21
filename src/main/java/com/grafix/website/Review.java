package com.grafix.website;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    private String id;
    private String name;
    private String email;
    private String contact;
    private String address;
    private String interest; // e.g., "Interested" or "Not Interested"
    private String note;
    private String date;
}
