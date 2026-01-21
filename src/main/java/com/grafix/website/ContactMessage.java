package com.grafix.website;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessage {
    private String id;
    private String name;
    private String email;
    private String message;
    private String date;
}
