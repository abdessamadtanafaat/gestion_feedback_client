package com.app.api.repositories;

import com.app.api.entities.Campaign.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemplateRepository extends JpaRepository<Template,Long> {
    Template findByTemplateId(String templateId);
}
