package com.app.api.entities.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.UUID;


@NoArgsConstructor
@Setter
@Getter
@Entity
public class ResetPasswordVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String resetPasswordKey;
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private LocalDateTime createdDate;
    private LocalDateTime expirationDate; // New field for expiration time
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
    private boolean keyUsed;

    public ResetPasswordVerification(UserEntity user, LocalDateTime expirationDate) {
        this.user = user;
        this.createdDate = LocalDateTime.now();
        this.resetPasswordKey = UUID.randomUUID().toString();
        this.expirationDate = expirationDate; // Set expiration date
        this.keyUsed = false;
    }

    // Method to check if the reset password key is expired
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expirationDate);
    }
}
