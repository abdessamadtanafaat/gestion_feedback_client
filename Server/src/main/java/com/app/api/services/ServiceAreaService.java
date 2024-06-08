package com.app.api.services;

import com.app.api.entities.Campaign.ServiceArea;
import com.app.api.entities.Campaign.ServiceCategory;
import com.app.api.exceptions.UserException;
import com.app.api.repositories.ServiceAreaRepository;
import com.app.api.repositories.ServiceCategoryRepository;
import com.app.api.repositories.UserRepository;
import com.app.api.responses.ServiceAreaResponse;
import com.app.api.responses.ServiceCategoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class ServiceAreaService {
    @Autowired
    ServiceAreaRepository serviceAreaRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ServiceCategoryRepository serviceCategoryRepository;

    public static final String PHOTO_DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads/";


    public List<ServiceArea> getServiceAreasByServiceCategoryId(Long serviceCategoryId) {
        return serviceAreaRepository.findByServiceCategory(serviceCategoryId);
    }
    public void addServiceArea(String username, String serviceName)
    {
        var user = userRepository.findByUsername(username);

        if(serviceAreaRepository.existService(serviceName,user.getId())!=null)
        {
            throw new UserException("you have already create a service with the same name");
        }
        ServiceCategory category = serviceCategoryRepository.findById(6L).orElse(null);
        ServiceArea serviceArea = new ServiceArea();
        serviceArea.setServiceCategory(category);
        serviceArea.setPrivate(true);
        serviceArea.setUser(user);
        serviceArea.setName(serviceName);
        serviceAreaRepository.save(serviceArea);
    }

    public List<ServiceCategoryResponse> getAllServiceAreas(String username) {
        var user = userRepository.findByUsername(username);
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        List<ServiceCategoryResponse> categoryResponseList = new ArrayList<>();
        ServiceCategory personalCategory = serviceCategoryRepository.findByName("Services Personnalisés");

        for (ServiceCategory serviceCategory : serviceCategoryList) {
            List<ServiceAreaResponse> serviceAreaResponses = new ArrayList<>();
            boolean userHasServiceAreaForCategory = false; // Flag to check if the user has any service area for the current category
            for (ServiceArea serviceArea : serviceCategory.getServiceAreas()) {
                if (serviceArea.getUser() == null || serviceArea.getUser() == user) {
                    ServiceAreaResponse serviceAreaResponse = mapToServiceAreaResponse(serviceArea);
                    serviceAreaResponses.add(serviceAreaResponse);
                    userHasServiceAreaForCategory = true; // Set flag to true if user has service area for this category
                }
            }
            if (userHasServiceAreaForCategory) { // Only add category if user has service area for it
                ServiceCategoryResponse serviceCategoryResponse = new ServiceCategoryResponse();
                serviceCategoryResponse.setServiceAreas(serviceAreaResponses);
                serviceCategoryResponse.setName(serviceCategory.getName());
                serviceCategoryResponse.setDescription(serviceCategory.getDescription());
                serviceCategoryResponse.setId(serviceCategory.getId());
                serviceCategoryResponse.setPhotoUrl(serviceCategory.getPhotoUrl());
                categoryResponseList.add(serviceCategoryResponse);
            }
        }
        return categoryResponseList;
    }




    private ServiceAreaResponse mapToServiceAreaResponse(ServiceArea serviceArea) {
        ServiceAreaResponse response = new ServiceAreaResponse();
        response.setId(serviceArea.getId());
        response.setName(serviceArea.getName());
        response.setPrivate(serviceArea.isPrivate());
        return response;
    }

    public String uploadPhoto(String serviceCategoryId, MultipartFile file) {
        ServiceCategory serviceAreaCategory = serviceCategoryRepository.findByServiceCategoryId(serviceCategoryId);
        String photoUrl = photoFunction.apply(serviceCategoryId, file);
        serviceAreaCategory.setPhotoUrl(photoUrl);
        serviceCategoryRepository.save(serviceAreaCategory);
        return photoUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (serviceCategoryId, image) -> {
        String filename = serviceCategoryId + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation); }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/campaign/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };

//    public String addCategory(ServiceCategory serviceCategory)
//    {
//        serviceCategoryRepository.save(serviceCategory);
//        return "catg added successfully";
//    }





}
