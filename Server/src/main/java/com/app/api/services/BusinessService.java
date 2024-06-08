package com.app.api.services;


import com.app.api.entities.business.Business;
import com.app.api.entities.business.BusinessCategory;
import com.app.api.entities.business.BusinessType;
import com.app.api.exceptions.BusinessException;
import com.app.api.repositories.BusinessCategoryReposiroty;
import com.app.api.repositories.BusinessRepository;
import com.app.api.repositories.BusinessTypeRepository;
import com.app.api.repositories.UserRepository;
import com.app.api.requests.BusinessRequest;
import com.app.api.responses.BusinessResponse;
import com.app.api.responses.BusinessTypeResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;


@Service
public class BusinessService {

    @Autowired
    BusinessRepository businessRepository;
    @Autowired
    BusinessTypeRepository businessTypeRepository;
    @Autowired
    BusinessCategoryReposiroty businessCategoryReposiroty;
    @Autowired
    UserRepository userRepository;

    public static final String Business_PHOTO_DIRECTORY = "src/uploads/business/";

    public void addBusiness(String username, BusinessRequest newBusiness, long id){
        var user = userRepository.findByUsername(username);
        var checkBusiness = businessRepository.findByBusinessName(newBusiness.getBusinessName());
        if(checkBusiness!=null)
        {
            throw new BusinessException("business name already exist!!");
        }
        Business business = new Business();
        BeanUtils.copyProperties(newBusiness, business);
        business.setUser(user);
        BusinessType businessType = businessTypeRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Business type not found"));
        business.setType(businessType);
        business.setCreatedDate(LocalDateTime.now());
        businessRepository.save(business);
        uploadBusinessPhoto(business.getBusinessId(),newBusiness.getFile());
    }
    public String uploadBusinessPhoto(String businessId, MultipartFile file) {
        Business business = businessRepository.findByBusinessId(businessId);
        String photoUrl = photoFunction.apply(businessId, file);
        business.setCoverImageUrl(photoUrl);
        businessRepository.save(business);
        return photoUrl;
    }
    public BusinessResponse getBusinessDetail(String businessId)
    {
        BusinessResponse response = new BusinessResponse();
        BeanUtils.copyProperties(businessRepository.findByBusinessId(businessId),response);
        return response;
        
    }

    public List<BusinessResponse> getListBusinessByUserId(String username)
    {

        var user = userRepository.findByUsername(username);

        List<Business> businesses = (List<Business>) businessRepository.findByUserId(user.getId());
        List<BusinessResponse> businessResponses = new ArrayList<>();
        for (Business business : businesses) {
            ModelMapper modelMapper = new ModelMapper();
            BusinessResponse businessResp = modelMapper.map(business, BusinessResponse.class);
            businessResp.setCategoryName(business.getType().getCategory().getCategoryName());
            businessResponses.add(businessResp);
        }
        return businessResponses;

    }

    public List<BusinessType> getListOfTypes(int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page,limit);
        Page<BusinessType> typePage = businessTypeRepository.findAll(pageRequest);
        if(typePage.isEmpty())
        {
            throw new BusinessException("no types found");
        }
        return typePage.getContent();

    }
    public List<BusinessTypeResponse> getListOfTypesByCatgId(long id) {

        List<BusinessType> listOfTypes = businessTypeRepository.findAllByCatgId(id);
        if(listOfTypes.isEmpty())
        {
            throw new BusinessException("no types found with this category id");
        }
        List<BusinessTypeResponse> businessTypeResponses = new ArrayList<>();
        for(BusinessType type: listOfTypes)
        {
            BusinessTypeResponse businessTypeResponse = new BusinessTypeResponse();
            BeanUtils.copyProperties(type,businessTypeResponse);
            businessTypeResponses.add(businessTypeResponse);
        }


        return businessTypeResponses;

    }
    public List<BusinessCategory> getListOfCategories(int page, int limit){
        PageRequest pageRequest = PageRequest.of(page,limit);
        Page<BusinessCategory> categoryPage = businessCategoryReposiroty.findAll(pageRequest);
        if(categoryPage.isEmpty())
        {
            throw new BusinessException("no category found");
        }
        return categoryPage.getContent();
    }

    public void deleteBusiness(Business business)
    {
        Business businessToDelete = businessRepository.findById(business.getId())
                .orElseThrow(()->new BusinessException("no business found to delete"));
        businessRepository.delete(businessToDelete);

    }

    public BusinessResponse getBusinessByName(String businessName, String username)
    {
        var user = userRepository.findByUsername(username);
        Business business=businessRepository.findByBusinessNameAndUser(businessName,user.getId());
        ModelMapper modelMapper = new ModelMapper();
        BusinessResponse businessResp = modelMapper.map(business, BusinessResponse.class);
        businessResp.setCategoryName(business.getType().getCategory().getCategoryName());
        return businessResp;
    }

    public Business updateBusiness(Business updatedBusiness) {
        Business existingBusiness = businessRepository.findByBusinessName(updatedBusiness.getBusinessName());
        existingBusiness.setEmail(updatedBusiness.getEmail());
        existingBusiness.setPhone(updatedBusiness.getPhone());
        existingBusiness.setAddress(updatedBusiness.getAddress());
        existingBusiness.setFacebookLink(updatedBusiness.getFacebookLink());
        existingBusiness.setInstagramLink(updatedBusiness.getInstagramLink());
        existingBusiness.setGoogleLink(updatedBusiness.getGoogleLink());
        existingBusiness.setCoverImageUrl(updatedBusiness.getCoverImageUrl());
        return businessRepository.save(existingBusiness);
    }


    public String uploadBusinessTypePhoto(String typeId, MultipartFile file) {
        BusinessType type = businessTypeRepository.findByBusinessTypeId(typeId);
        String photoUrl = photoFunction.apply(typeId, file);
        type.setPhotoUrl(photoUrl);
        businessTypeRepository.save(type);
        return photoUrl;
    }


    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (businessTypeId, image) -> {
        String filename = businessTypeId + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(Business_PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation); }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/business/businessCategory/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };

    public void createtype(BusinessType businessType)
    {
        businessTypeRepository.save(businessType);
    }



    public String updateBusiness(String businessId, BusinessRequest businessRequest)
    {
        Business businessToUpdate = businessRepository.findByBusinessId(businessId);
        businessToUpdate.setBusinessName(businessRequest.getBusinessName());

        businessToUpdate.setEmail(businessRequest.getEmail());

        businessToUpdate.setPhone(businessRequest.getPhone());

        businessToUpdate.setAddress(businessRequest.getAddress());

        businessToUpdate.setFacebookLink(businessRequest.getFacebookLink());

        businessToUpdate.setInstagramLink(businessRequest.getInstagramLink());

        businessToUpdate.setGoogleLink(businessRequest.getGoogleLink());
        businessRepository.save(businessToUpdate);

        return "Business updated successfully";

    }


}
