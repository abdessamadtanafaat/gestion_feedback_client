package com.app.api.repositories;

import com.app.api.entities.Campaign.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language,Long> {
}
