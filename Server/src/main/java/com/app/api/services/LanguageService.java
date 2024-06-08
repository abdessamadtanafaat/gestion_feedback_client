package com.app.api.services;

import com.app.api.entities.Campaign.Language;
import com.app.api.repositories.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class LanguageService {
    @Autowired
    LanguageRepository languageRepository;

    public static final String Language_PHOTO_DIRECTORY = "src/uploads/languages/";

    public List<Language> getListLanguages()
    {
        return languageRepository.findAll();
    }

    public String uploadLanguagesPhoto(long languageId, MultipartFile file) {
        Language language = languageRepository.findById(languageId).orElse(null);
        String photoUrl = photoFunction.apply(languageId, file);
        language.setCoverImageUrl(photoUrl);
        languageRepository.save(language);
        return photoUrl;
    }
    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<Long, MultipartFile, String> photoFunction = (languageId, image) -> {
        String filename = languageId + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(Language_PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation); }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/campaign/languages/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };

}
