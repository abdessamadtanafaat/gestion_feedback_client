package com.app.api.controllers;

import com.app.api.entities.Campaign.*;
import com.app.api.requests.CampaignRequest;
import com.app.api.requests.ServiceAreaRequest;
import com.app.api.requests.TemplateRequest;
import com.app.api.responses.*;
import com.app.api.services.*;
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
@RequestMapping("api/v1/campaign")
public class CampaignController {
    @Autowired
    CampaignService campaignService;
    @Autowired
    ServiceAreaService serviceAreaService;
    @Autowired
    LanguageService languageService;
    @Autowired
    AnswerService answerService;
    @Autowired
    LoyaltyProgrammeService loyaltyProgrammeService;

    public static final String PHOTO_DIRECTORY = "src/uploads/";
    public static final String loyaltyProgrammeType_PHOTO_DIRECTORY = "src/uploads/loyaltyProgrammeType/";
    public static final String Template_PHOTO_DIRECTORY = "src/uploads/templates/";
    public static final String Language_PHOTO_DIRECTORY = "src/uploads/languages/";


    @GetMapping("/service-area/{serviceCategoryId}")
    public List<ServiceArea> getServiceAreasByServiceCategoryId(
            @PathVariable Long serviceCategoryId) {
        return serviceAreaService.getServiceAreasByServiceCategoryId(serviceCategoryId);
    }



    @PostMapping("/create")
    public ResponseEntity<String> createCampaign(@RequestBody CampaignRequest request) {
        Campaign createdCampaign = campaignService.createCampaign(request);
        String campaignUrl = "http://localhost:5173/campaign/" + createdCampaign.getCampaignId();
        campaignService.generateQRCodeForCampaign(campaignUrl, createdCampaign.getCampaignId());
        return ResponseEntity.ok(createdCampaign.getCampaignId());
    }
    @PatchMapping("/update-campaign/{campaignId}")
    public ResponseEntity<Void> updateCampaign(@PathVariable String campaignId, @RequestBody CampaignRequest request) {
        campaignService.updateCampaign(campaignId, request);

        return ResponseEntity.ok().build();
    }


    @GetMapping("/displays")
    public List<DisplayResponse> getAllDisplays() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return campaignService.getAllDisplays(username);
    }


    @PostMapping("/displays/{id}/incrementScan")
    public void incrementScan(@PathVariable Long id) {
        campaignService.incrementScan(id);
    }




    @PostMapping("/add-new-service")
    public ResponseEntity<String> addServiceArea(@RequestBody ServiceAreaRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        serviceAreaService.addServiceArea(username,request.getServiceName());
        return ResponseEntity.ok("new personal service added successfully");
    }
    @GetMapping("/list/{businessId}")
    public ResponseEntity<List<Campaign>> getListOfCampaigns(@PathVariable int businessId) {
        List<Campaign> campaigns = campaignService.getListOfCampaigns(businessId);
        return ResponseEntity.ok(campaigns);
    }
    @GetMapping("/list-languages")
    public List<Language> getListOfLanguages()
    {
        return languageService.getListLanguages();
    }

    @GetMapping("/list-LoyaltyProgrammeType")
    public List<LoyaltyProgrammeType> getAllLoyaltyProgrammeTypes()
    {
        return loyaltyProgrammeService.getAllLoyaltyProgrammeTypes();
    }
    @GetMapping("/data/answers/count/{campaignId}")
    public int getNumberOfAnswers(@PathVariable String campaignId) {
        return answerService.numberOfAnswersForCampaign(campaignId);
    }

    @GetMapping("/data/nps/average/{campaignId}")
    public int avgOfNpsForCampaign(@PathVariable String campaignId) {
        return answerService.avgOfNpsForCampaign(campaignId);
    }
    @GetMapping("/service-areas/all")
    public List<ServiceCategoryResponse> getListOfServices() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return serviceAreaService.getAllServiceAreas(username);
    }

    @PutMapping("/loyaltyProgrammePhoto")
    public ResponseEntity<String> uploadLoyaltyProgrammePhoto(@RequestParam("loyaltyProgrammeTypeId") String loyaltyProgrammeTypeId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(loyaltyProgrammeService.uploadPhoto(loyaltyProgrammeTypeId, file));
    }
    @PutMapping("/serviceAreaCategoryImage")
    public ResponseEntity<String> uploadServiceAreaPhoto(@RequestParam("serviceCategoryId") String serviceCategoryId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(serviceAreaService.uploadPhoto(serviceCategoryId, file));
    }


    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }
    @GetMapping(path = "loyaltyProgrammeType/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getLoyaltyProgrammeTypePhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(loyaltyProgrammeType_PHOTO_DIRECTORY + filename));
    }
    @GetMapping(path = "template/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getTemplateBackImage(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(Template_PHOTO_DIRECTORY + filename));
    }
    @GetMapping(path = "languages/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getLanguageImage(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(Language_PHOTO_DIRECTORY + filename));
    }
    @PostMapping("/create-template")
    public Template createTemplate(@ModelAttribute TemplateRequest request)
    {
        return campaignService.createTemplate(request);
    }

//    @PostMapping("/addLoyalType")
//    public void addCategory(@RequestBody LoyaltyProgrammeType loyaltyProgrammeType)
//    {
//         loyaltyProgrammeService.addLoyalType(loyaltyProgrammeType);
//    }

//    @PostMapping("/addServiceCategory")
//    public void addCategory(@RequestBody ServiceCategory serviceCategory)
//    {
//        serviceAreaService.addCategory(serviceCategory);
//    }

    @GetMapping("/OverView/all")
    public List<CampaignOverviewResponse> getCampaignsOverView() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return campaignService.getCampaignsOverView(username);
    }
    @GetMapping("/campaign-detail/{campaignId}")
    public CampaignOverviewResponse getCampaignDetail(@PathVariable String campaignId)
    {
        return  campaignService.getCampaignDetails(campaignId);
    }

    @GetMapping("/campaigns/coupon-code/all")
    public List<Object> getDiscountCampaigns() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return campaignService.getDiscountCampaigns(username);
    }

    @GetMapping("/coupon-code/config/{campaignId}")
    public List<Object> getDiscountConfigByCampaign(@PathVariable Long campaignId) {
        return campaignService.getCouponConfigByCampaign(campaignId);
    }



    @PutMapping("/upload-language-photo")
    public ResponseEntity<String> uploadLanguagePhoto(@RequestParam("languageId") Long languageId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(languageService.uploadLanguagesPhoto(languageId, file));
    }

    @PatchMapping("/mystery-box/config/{campaignId}")
    public String updateMysteryBoxConfig(@RequestBody MysteryBoxConfig config, @PathVariable String campaignId)
    {
        return campaignService.updateMysteryBoxPrize(config, campaignId);
    }

    @PatchMapping("/Coupon-code/config/{campaignId}")
    public String updateCouponCodeConfig(@RequestBody CouponCodeConfig config, @PathVariable String campaignId)
    {
        return campaignService.updateCouponCode(config, campaignId);
    }

//    @PatchMapping("/client-ambassador/config/{campaignId}")
//    public String updateClientAmbassadorConfig(@RequestBody LoyaltyProgrammeRequest request, @PathVariable Long campaignId)
//    {
//        return campaignService.updateClientAmbassador(request, campaignId);
//    }
     @GetMapping("/Mystery-box/config/all/{campaignId}")
     public List<MysteryBoxConfigResponse> getAllMysteryBoxConfigs(@PathVariable String campaignId)
     {
        return loyaltyProgrammeService.getAllMysteryBoxConfig(campaignId);
     }

    @GetMapping("/coupon-code/config/all/{campaignId}")
    public List<CouponCodeConfigResponse> getAllCouponsConfigs(@PathVariable String campaignId)
    {
        return loyaltyProgrammeService.getAllCouponsConfig(campaignId);
    }

    @DeleteMapping("/delete-coupon/{couponId}")
    public String deleteCoupon(@PathVariable long couponId)
    {
        return campaignService.deleteCoupon(couponId);
    }

    @DeleteMapping("/delete-prize/{prizeId}")
    public String deleteMysteryBoxConfig(@PathVariable long prizeId)
    {

        return campaignService.deletePrize(prizeId);
    }

    @GetMapping("Mystery-box/winner-list/{campaignId}")
    public List<WinnerResponse> getAllMysteryBoxWinners(@PathVariable String campaignId)
    {
        return answerService.getListOfMysteryBoxWinnersForCampaign(campaignId);
    }

    @GetMapping("discount/winner-list/{campaignId}")
    public List<WinnerResponse> getAllCouponCodeWinners(@PathVariable String campaignId)
    {
        return answerService.getListOfDiscountWinnersForCampaign(campaignId);
    }

    @PatchMapping("prize-config/details/update/{prizeId}")
    public String updatePrizeConfig(@PathVariable long prizeId, @RequestBody MysteryBoxConfig config)
    {
        return loyaltyProgrammeService.updatePrizeConfig(prizeId,config);
    }

    @PatchMapping("coupon-config/details/update/{couponId}")
    public String updateCouponConfig(@PathVariable long couponId, @RequestBody CouponCodeConfig config)
    {
        return loyaltyProgrammeService.updateCouponGroupConfig(couponId,config);
    }

    @GetMapping("coupon-winners/{couponGroupId}")
    public List<WinnerResponse> getListOfWinnersByGroup(@PathVariable long couponGroupId)
    {
        return campaignService.getCouponWinnersByGroup(couponGroupId);
    }

    @GetMapping("has-MysteryBox-program/{campaignId}")
    public boolean hasMysteryBox(@PathVariable String campaignId)
    {
        return loyaltyProgrammeService.hasAmysteryboxProgram(campaignId);
    }
    @GetMapping("has-Discount-program/{campaignId}")
    public boolean hasDiscountProgram(@PathVariable String campaignId)
    {
        return loyaltyProgrammeService.hasAdiscountProgram(campaignId);
    }




}
