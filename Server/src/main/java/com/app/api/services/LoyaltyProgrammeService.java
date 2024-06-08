package com.app.api.services;

import com.app.api.entities.Campaign.*;
import com.app.api.repositories.*;

import com.app.api.responses.CouponCodeConfigResponse;
import com.app.api.responses.MysteryBoxConfigResponse;
import org.springframework.beans.BeanUtils;
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
public class LoyaltyProgrammeService {
    @Autowired
    LoyaltyProgrammeTypeRepository  loyaltyProgrammeTypeRepository;
    @Autowired
    MysteryBoxConfigRepo mysteryBoxConfigRepo;
    @Autowired
    CouponCodeConfigRepo couponCodeConfigRepo;
    @Autowired
    CampaignRepository campaignRepository;

    public static final String loyaltyProgrammeType_PHOTO_DIRECTORY = "src/uploads/loyaltyProgrammeType/";


    public List<LoyaltyProgrammeType> getAllLoyaltyProgrammeTypes() {
        return loyaltyProgrammeTypeRepository.findAll();
    }
    public String uploadPhoto(String loyaltyProgrammeTypeId, MultipartFile file) {
        LoyaltyProgrammeType loyaltyProgrammeType = loyaltyProgrammeTypeRepository.findByLoyaltyProgrammeTypeId(loyaltyProgrammeTypeId);
        String photoUrl = photoFunction.apply(loyaltyProgrammeTypeId, file);
        loyaltyProgrammeType.setPhotoUrl(photoUrl);
        loyaltyProgrammeTypeRepository.save(loyaltyProgrammeType);
        return photoUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (loyaltyProgrammeTypeId, image) -> {
        String filename = loyaltyProgrammeTypeId + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(loyaltyProgrammeType_PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation); }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/campaign/loyaltyProgrammeType/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };
    public void addLoyalType(LoyaltyProgrammeType loyaltyProgrammeType)
    {
        loyaltyProgrammeTypeRepository.save(loyaltyProgrammeType);
    }


    public List<MysteryBoxConfigResponse> getAllMysteryBoxConfig(String campaignId)
    {
        List<MysteryBoxConfigResponse> responses = new ArrayList<>();
        List<MysteryBoxConfig> configs = mysteryBoxConfigRepo.getAllPrizesConfigByCampaign(campaignId);
        for(MysteryBoxConfig config:configs)
        {
            MysteryBoxConfigResponse response = new MysteryBoxConfigResponse();
            BeanUtils.copyProperties(config,response);
            responses.add(response);
        }
        return responses;
    }

    public List<CouponCodeConfigResponse> getAllCouponsConfig(String campaignId)
    {
        List<CouponCodeConfigResponse> responses = new ArrayList<>();
        List<CouponCodeConfig> configs = couponCodeConfigRepo.getAllCouponsConfigByCampaign(campaignId);
        for(CouponCodeConfig config:configs)
        {
            CouponCodeConfigResponse response = new CouponCodeConfigResponse();
            BeanUtils.copyProperties(config,response);
            responses.add(response);
        }
        return responses;
    }


    public String updatePrizeConfig(long prizeId, MysteryBoxConfig config) {
        MysteryBoxConfig configToUpdate = mysteryBoxConfigRepo.findById(prizeId).orElse(null);
        configToUpdate.setMysteryBoxPrize(config.getMysteryBoxPrize());
        configToUpdate.setPrizeFrequency(config.getPrizeFrequency());
        configToUpdate.setPrizeQuantity(config.getPrizeQuantity());
        configToUpdate.setMinAge(config.getMinAge());
        configToUpdate.setMaxAge(config.getMaxAge());
        configToUpdate.setGender(config.getGender());
        mysteryBoxConfigRepo.save(configToUpdate);
        return "prize updated successfully";
    }
    public String updateCouponGroupConfig(long couponId, CouponCodeConfig config) {
        CouponCodeConfig configToUpdate = couponCodeConfigRepo.findById(couponId).orElse(null);
        configToUpdate.setMinAge(config.getMinAge());
        configToUpdate.setMaxAge(config.getMaxAge());
        configToUpdate.setGender(config.getGender());
        configToUpdate.setCouponCodeStatus(config.isCouponCodeStatus()); // a verifier apres
        configToUpdate.setCouponValue(config.getCouponValue());
        couponCodeConfigRepo.save(configToUpdate);
        return "coupon group updated successfully";
    }

    public boolean hasAmysteryboxProgram(String campaignId) {
        Campaign campaign = campaignRepository.findByCampaignId(campaignId);
        List<LoyaltyProgramme> programmes = campaign.getLoyaltyProgrammes();
        if (programmes == null) {
            return false;
        }

        for (LoyaltyProgramme programme : programmes)
        {
            if (programme.getLoyaltyProgrammeType().getTypeName().equalsIgnoreCase("Mystery box")) {
                return true;
            }
        }

        return false;
    }

    public boolean hasAdiscountProgram(String campaignId) {
        Campaign campaign = campaignRepository.findByCampaignId(campaignId);
        List<LoyaltyProgramme> programmes = campaign.getLoyaltyProgrammes();
        if (programmes == null) {
            return false;
        }

        for (LoyaltyProgramme programme : programmes)
        {
            if (programme.getLoyaltyProgrammeType().getTypeName().equalsIgnoreCase("coupon code")) {
                return true;
            }
        }

        return false;
    }
}
