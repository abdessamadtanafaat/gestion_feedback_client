package com.app.api.services;

import com.app.api.entities.Campaign.*;
import com.app.api.entities.business.Business;

import com.app.api.repositories.*;
import com.app.api.requests.CampaignRequest;
import com.app.api.requests.LoyaltyProgrammeRequest;
import com.app.api.requests.TemplateRequest;
import com.app.api.responses.*;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;


@Service
public class CampaignService {
    @Autowired
    CampaignRepository campaignRepository;
    @Autowired
    BusinessRepository businessRepository;
    @Autowired
    LoyaltyProgrammeRepository loyaltyProgrammeRepository;

    @Autowired
    LoyaltyProgrammeTypeRepository loyaltyProgrammeTypeRepository;
    @Autowired
    ServiceAreaRepository serviceAreaRepository;
    @Autowired
    TemplateRepository templateRepository;
    @Autowired
    LanguageRepository languageRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AnswerService answerService;
    @Autowired
    MysteryBoxConfigRepo mysteryBoxConfigRepo;
    @Autowired
    CouponCodeConfigRepo couponCodeConfigRepo;

    @Autowired
    WinnerRepository winnerRepository;

    @Autowired
    DisplayRepository displayRepository;
    public static final String Template_PHOTO_DIRECTORY = "src/uploads/templates/";
    public static final String[] typeNames = {"Mystery box", "Client ambassador", "coupon code", "Raffle"};


    public Campaign createCampaign(CampaignRequest campaignRequest) {
        Campaign campaign = new Campaign();
        Business business = businessRepository.findByBusinessId(campaignRequest.getBusinessId());
        campaign.setBusiness(business);
        Template template = templateRepository.findById(campaignRequest.getTemplate_id())
                .orElseThrow(()->new RuntimeException("template not found"));
        campaign.setTemplate(template);
        // Set service areas
        List<ServiceArea> serviceAreas = new ArrayList<>();
        for (ServiceArea serviceArea : campaignRequest.getServiceAreas()) {
            // Fetch ServiceArea entities from the database using service area IDs
            ServiceArea fetchedServiceArea = serviceAreaRepository.findById(serviceArea.getId())
                    .orElseThrow(() -> new RuntimeException("Service area not found"));
            serviceAreas.add(fetchedServiceArea);
        }
        campaign.setServiceAreas(serviceAreas);
        // set languages
        List<Language> languages = new ArrayList<>();
        for(Language language:campaignRequest.getLanguages())
        {
            Language fetchedLanguages = languageRepository.findById(language.getId())
                    .orElseThrow(() -> new RuntimeException(" not found"));
            languages.add(fetchedLanguages);
        }
        campaign.setLanguages(languages);
        Campaign savedCampaign= campaignRepository.save(campaign);
        // set loyalty programmes
        List<LoyaltyProgramme> loyaltyProgrammes = new ArrayList<>();
        for (LoyaltyProgrammeRequest loyaltyProgrammeRequest : campaignRequest.getLoyaltyProgrammes()) {
            LoyaltyProgramme loyaltyProgramme = new LoyaltyProgramme();

            // Fetch loyalty program type by ID
            LoyaltyProgrammeType loyaltyProgrammeType = loyaltyProgrammeTypeRepository
                    .findById(loyaltyProgrammeRequest.getId()).orElse(null);

            if (loyaltyProgrammeType != null) {
                loyaltyProgramme.setLoyaltyProgrammeType(loyaltyProgrammeType);
                loyaltyProgrammeRepository.save(loyaltyProgramme);
                loyaltyProgrammes.add(loyaltyProgramme);
                loyaltyProgramme.setCampaign(savedCampaign);

            }
        }
        savedCampaign.setLoyaltyProgrammes(loyaltyProgrammes);
        return savedCampaign;

    }

    public void updateCampaign(String campaignId, CampaignRequest campaignRequest) {
        Campaign campaignToUpdate = campaignRepository.findByCampaignId(campaignId);
        Business business = businessRepository.findByBusinessId(campaignRequest.getBusinessId());
        campaignToUpdate.setBusiness(business);

        List<ServiceArea> serviceAreas = new ArrayList<>();
        for (ServiceArea serviceArea : campaignRequest.getServiceAreas()) {
            ServiceArea fetchedServiceArea = serviceAreaRepository.findById(serviceArea.getId())
                    .orElseThrow(() -> new RuntimeException("Service area not found"));
            serviceAreas.add(fetchedServiceArea);
        }
        campaignToUpdate.setServiceAreas(serviceAreas);

        List<Language> languages = new ArrayList<>();
        for(Language language:campaignRequest.getLanguages())
        {
            Language fetchedLanguages = languageRepository.findById(language.getId())
                    .orElseThrow(() -> new RuntimeException(" not found"));
            languages.add(fetchedLanguages);
        }
        campaignToUpdate.setLanguages(languages);

        List<LoyaltyProgramme> loyaltyProgrammes = new ArrayList<>();
        for (LoyaltyProgrammeRequest loyaltyProgrammeRequest : campaignRequest.getLoyaltyProgrammes()) {
            LoyaltyProgramme loyaltyProgramme = new LoyaltyProgramme();
            LoyaltyProgrammeType loyaltyProgrammeType = loyaltyProgrammeTypeRepository
                    .findById(loyaltyProgrammeRequest.getId()).orElse(null);
            if (loyaltyProgrammeType != null) {
                loyaltyProgramme.setLoyaltyProgrammeType(loyaltyProgrammeType);
                loyaltyProgramme.setCampaign(campaignToUpdate);
                loyaltyProgrammeRepository.save(loyaltyProgramme);
                loyaltyProgrammes.add(loyaltyProgramme);
            }
        }
        campaignToUpdate.setLoyaltyProgrammes(loyaltyProgrammes);
        campaignRepository.save(campaignToUpdate);
    }

//    public String sendNotification()
//    {
//
//    }

    public String updateMysteryBoxPrize(MysteryBoxConfig config, String campaignId)
    {
        LoyaltyProgrammeType type = loyaltyProgrammeTypeRepository.findByTypeName(typeNames[0]);
        LoyaltyProgramme program = loyaltyProgrammeRepository.findByCampaignAndType(campaignId,type.getId());
        if(program == null){
            throw new RuntimeException("no specific program found");
        }
        MysteryBoxConfig newPrizeConfig = new MysteryBoxConfig();
        BeanUtils.copyProperties(config,newPrizeConfig);
        newPrizeConfig.setProgram(program);
        mysteryBoxConfigRepo.save(newPrizeConfig);
        return "mystery box prize configuration with success";
    }
    public String updateCouponCode(CouponCodeConfig config, String campaignId)
    {
        LoyaltyProgrammeType type = loyaltyProgrammeTypeRepository.findByTypeName(typeNames[2]);
        LoyaltyProgramme program = loyaltyProgrammeRepository.findByCampaignAndType(campaignId,type.getId());
        if(program == null){
            throw new RuntimeException("no specific program found");
        }
        CouponCodeConfig newCoupon = new CouponCodeConfig();
        BeanUtils.copyProperties(config, newCoupon);
        newCoupon.setProgram(program);
        couponCodeConfigRepo.save(newCoupon);
        return "coupon code program updated";
    }
//    public String updateClientAmbassador(LoyaltyProgrammeRequest request, Long campaignId)
//    {
//        LoyaltyProgrammeType type = loyaltyProgrammeTypeRepository.findByTypeName(typeNames[1]);
//        LoyaltyProgramme program = loyaltyProgrammeRepository.findByCampaignAndType(campaignId,type.getId());
//        program.setNpsValue(request.getNpsValue());
//        program.setMaxAge(request.getMaxAge());
//        program.setMinAge(request.getMinAge());
//        program.setGenders(request.getGenders());
//        loyaltyProgrammeRepository.save(program);
//        return "client ambassador program updated";
//    }
//
//
//
    public CampaignResponse getCampaignById(String campaignId)
    {

        CampaignResponse campaignResponse = new CampaignResponse();
        Campaign campaign = campaignRepository.findByCampaignId(campaignId);
        Display display = displayRepository.getDisplayByCampaignId(campaign.getId());
        display.setNumberOfScans(display.getNumberOfScans()+1);
        displayRepository.save(display);
        BeanUtils.copyProperties(campaign,campaignResponse);
        BusinessResponse businessResponse = new BusinessResponse();
        BeanUtils.copyProperties(campaign.getBusiness(),businessResponse);
        campaignResponse.setBusiness(businessResponse);
        List<ServiceAreaResponse> serviceAreas = new ArrayList<>();

        for (ServiceArea serviceArea : campaign.getServiceAreas()) {
            ServiceAreaResponse serviceAreaResponse = new ServiceAreaResponse();
            BeanUtils.copyProperties(serviceArea,serviceAreaResponse);
            serviceAreas.add(serviceAreaResponse);
        }
        campaignResponse.setServiceAreas(serviceAreas);

        List<String> loyaltyProgrammesTypes= new ArrayList<>();
        for(LoyaltyProgramme loyaltyProgramme:campaign.getLoyaltyProgrammes())
        {
            loyaltyProgrammesTypes.add(loyaltyProgramme.getLoyaltyProgrammeType().getTypeName());
        }
        campaignResponse.setLoyaltyProgrammeTypes(loyaltyProgrammesTypes);

        return campaignResponse;

    }
    public List<Campaign> getListOfCampaigns(int businessId)
    {

        return campaignRepository.findByBusinessId(businessId);
    }


    public static String generateQRCode(String content) {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix;
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            bitMatrix = qrCodeWriter.encode(content, com.google.zxing.BarcodeFormat.QR_CODE, 500, 500);
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", byteArrayOutputStream);
            byte[] byteArray = byteArrayOutputStream.toByteArray();
            // Save or return the byte array or convert it to Base64 or save it as an image file
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(byteArray);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    public String generateQRCodeForCampaign(String campaignLink, String campaignId) {
        // Logic to generate QR code using ZXing
        String qrCode = generateQRCode(campaignLink);

        // Save the display information with initial scan count as 0
        Campaign campaign = campaignRepository.findByCampaignId(campaignId);
        Display display = new Display();
        display.setQrCode(qrCode);
        display.setNumberOfScans(0);
        display.setCampaign(campaign);
        displayRepository.save(display);

        return qrCode;
    }

    public void incrementScan(Long id) {
        Display display = displayRepository.findById(id).orElse(null);
        if (display != null) {
            display.setNumberOfScans(display.getNumberOfScans() + 1);
            displayRepository.save(display);
        }
    }

    public List<DisplayResponse> getAllDisplays(String username) {
        var user = userRepository.findByUsername(username);

        List<Display> displays = displayRepository.getAllDisplays(user.getId());
        List<DisplayResponse> displayList = new ArrayList<>();

        for(Display display : displays) {
            DisplayResponse displayResponse = new DisplayResponse();
            displayResponse.setBusinessName(display.getCampaign().getBusiness().getBusinessName());
            BeanUtils.copyProperties(display, displayResponse);
            displayList.add(displayResponse);
        }

        return displayList;
    }
    public CampaignOverviewResponse getCampaignDetails(String campaignId)
    {
        CampaignOverviewResponse  response= new CampaignOverviewResponse();
        Campaign campaign = campaignRepository.findByCampaignId(campaignId);
        response.setCampaignId(campaign.getCampaignId());
        response.setNumberOfAnswers(answerService.numberOfAnswersForCampaign(campaign.getCampaignId()));
        response.setCsat(answerService.calculateCsat(campaignId));
        response.setAverageNPS(answerService.avgOfNpsForCampaign(campaign.getCampaignId()));
        Display display = displayRepository.getDisplayByCampaignId(campaign.getId());
        response.setNumberOfScans(display.getNumberOfScans());
        return response;
    }


    public List<CampaignOverviewResponse> getCampaignsOverView(String username)
    {
        var user = userRepository.findByUsername(username);
        List<Campaign> campaigns = campaignRepository.findCampaignsByUser(user.getId());
        List<CampaignOverviewResponse> campaignOverviewResponses = new ArrayList<>();

        for (Campaign campaign : campaigns) {
            CampaignOverviewResponse response = new CampaignOverviewResponse();
            response.setCampaignId(campaign.getCampaignId());
            response.setBusinessName(campaign.getBusiness().getBusinessName());
            response.setBackgroundImageUrl(campaign.getTemplate().getBackgroundImageUrl());
            response.setNumberOfAnswers(answerService.numberOfAnswersForCampaign(campaign.getCampaignId()));
            response.setAverageNPS(answerService.avgOfNpsForCampaign(campaign.getCampaignId()));
            Display display = displayRepository.getDisplayByCampaignId(campaign.getId());
            response.setNumberOfScans(display.getNumberOfScans());
            response.setCsat(answerService.calculateCsat(campaign.getCampaignId()));
            campaignOverviewResponses.add(response);
        }

        return campaignOverviewResponses;
    }

    public Template createTemplate(TemplateRequest request)
    {
        if(request.getFile()==null)
        {
            throw new RuntimeException("you must upload a background image for your campaign");
        }
        Template template = new Template();
        System.out.print("isstar "+request.isUserChoice());
        template.setStar(request.isUserChoice());
        System.out.print(request.isUserChoice());
        template.setFace(!request.isUserChoice());
        System.out.print(request.isUserChoice());
        Template savedTemplate = templateRepository.save(template);
        uploadTemplateBackground(savedTemplate.getTemplateId(),request.getFile());
        return savedTemplate;
    }
    public String uploadTemplateBackground(String templateId, MultipartFile file) {
        Template template = templateRepository.findByTemplateId(templateId);
        String photoUrl = photoFunction.apply(templateId, file);
        template.setBackgroundImageUrl(photoUrl);
        templateRepository.save(template);
        return photoUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (templateId, image) -> {
        String filename = templateId + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(Template_PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation); }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/campaign/template/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };


    public List<Object> getDiscountCampaigns(String username) {
        var user  = userRepository.findByUsername(username);
//        List <CampaignResponse> responses = new ArrayList<>();
//        List<Campaign> campaigns = campaignRepository.getCampaignsByProgramType(typeNames[2],user.getId());
//        for(Campaign campaign:campaigns)
//        {
//            CampaignResponse response = new CampaignResponse();
//            BeanUtils.copyProperties();
//        }
        return campaignRepository.getCampaignsByProgramType(typeNames[2],user.getId());


    }
    public List<Object> getCouponConfigByCampaign(Long id)
    {
        return campaignRepository.getAllCouponsCodeByCampaign(id);
    }


    public String deleteCoupon(long couponId) {
        CouponCodeConfig couponCode = couponCodeConfigRepo.findById(couponId).orElse(null);
        if (couponCode != null) {
            // Check if any Winner entity is associated with this config
            List<Winner> winners = winnerRepository.findByConfig(couponCode);
            if (!winners.isEmpty()) {
                for (Winner winner : winners) {
                    winner.setConfig(null);
                    winnerRepository.save(winner);
                }
                // You might also log a warning or return an error message here
                return "Coupon deleted, but associated winners found. Config reference nullified in winners.";
            }
            couponCodeConfigRepo.delete(couponCode);
            return "Coupon deleted";
        }
        return "Error in delete coupon";
    }

    public String deletePrize(long prizeId) {
        MysteryBoxConfig prizeConfig = mysteryBoxConfigRepo.findById(prizeId).orElse(null);
        if (prizeConfig != null) {
            mysteryBoxConfigRepo.delete(prizeConfig);
            return "prize deleted";
        }
        return "error in delete prize";
    }

    public List<WinnerResponse> getCouponWinnersByGroup(long couponGroupId) {
        List<Winner> winners = winnerRepository.getAllDiscountWinnersByGroup(couponGroupId);
        List<WinnerResponse> responses = new ArrayList<>();
        for(Winner winner:winners)
        {
            WinnerResponse response = new WinnerResponse();
            response.setName(winner.getCustomer().getName());
            response.setDiscountCodeReference(winner.getDiscountCodeReference());
            response.setEmail(winner.getCustomer().getEmail());
            response.setTel(winner.getCustomer().getTel());
            response.setWinningDate(winner.getWinningDate());
            responses.add(response);
        }
        return responses;

    }
}
