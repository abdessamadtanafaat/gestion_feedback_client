package com.app.api.repositories;

import com.app.api.entities.user.ResetPasswordVerification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResetPassVerificationRep extends JpaRepository<ResetPasswordVerification,Long> {

    ResetPasswordVerification findByResetPasswordKey(String token);
}
