package com.app.api.controllers;


import com.app.api.entities.business.Business;
import com.app.api.entities.business.BusinessCategory;
import com.app.api.entities.business.BusinessType;
import com.app.api.requests.BusinessRequest;
import com.app.api.responses.BusinessResponse;
import com.app.api.responses.BusinessTypeResponse;
import com.app.api.services.BusinessService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import java.util.List;

import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("api/v1/business")
public class BusinessController {
    @Autowired
    BusinessService businessService;

    public static final String Business_PHOTO_DIRECTORY = "src/uploads/business/";
    @PostMapping(value="/add/{id}")
    public void createBusiness(@ModelAttribute BusinessRequest business, @PathVariable long id)

    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        businessService.addBusiness(username,business,id);
    }

//    @PostMapping("/image")
//    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file) throws IOException {
//        String uploadImage = storageService.uploadImage(file);
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(uploadImage);
//    }

    @GetMapping("/getBusiness/{name}")
    public BusinessResponse getBusinessByName(@PathVariable String name)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return businessService.getBusinessByName(name,username);

    }

    @GetMapping("/list-types")
    public List<BusinessType> getAllTypes(@RequestParam(value = "page") int page,
                                          @RequestParam(value="limit") int limit)
    {
        return businessService.getListOfTypes(page, limit);

    }
    @GetMapping("/list-categories")
    public List<BusinessCategory> getAllCategories(@RequestParam(value = "page") int page,
                                                   @RequestParam(value="limit") int limit)
    {
        return businessService.getListOfCategories(page,limit);

    }
    @GetMapping("/list-types/{id}")
    public List<BusinessTypeResponse> getTypesByCategory(@PathVariable long id)
    {
        return businessService.getListOfTypesByCatgId(id);

    }
    @GetMapping("/list-businesses")
    public List<BusinessResponse> getTBusinesses()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return businessService.getListBusinessByUserId(username);
    }

    @DeleteMapping("/delete")
    public void deleteBusiness(@RequestBody Business business)
    {
        businessService.deleteBusiness(business);
    }



    @PutMapping("/businessCategoryPhoto")
    public ResponseEntity<String> uploadBusinessTypePhoto(@RequestParam("businessTypeId") String businessTypeId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(businessService.uploadBusinessTypePhoto(businessTypeId, file));
    }

    @GetMapping("/business-detail/{businessId}")
    public BusinessResponse getBusinessInfo(@PathVariable String businessId)
    {
        return businessService.getBusinessDetail(businessId);
    }

    @PatchMapping("/update-business/{businessId}")
    public String updateBusiness(@RequestBody BusinessRequest request, @PathVariable String businessId)
    {
        return businessService.updateBusiness(businessId,request);
    }





    @GetMapping(path = "businessCategory/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getBusinessCatgPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(Business_PHOTO_DIRECTORY + filename));
    }

    @PostMapping("/addtype")
    public void createBtype(@RequestBody BusinessType businessType)
    {
        businessService.createtype(businessType);
    }



}
