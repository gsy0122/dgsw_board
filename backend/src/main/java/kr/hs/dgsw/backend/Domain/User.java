package kr.hs.dgsw.backend.Domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class User {
    private Long id;
    private String account;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String name;
    private String gender;
    private Long grade;
    private String storedPath;
    private String originalName;
    private LocalDateTime created;
    private LocalDateTime updated;
}
