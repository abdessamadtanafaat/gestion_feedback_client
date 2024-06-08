package com.app.api.services;

import com.app.api.entities.Campaign.*;
import com.app.api.repositories.*;
import com.app.api.responses.WinnerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AnswerService {
    @Autowired
    AnswerRepository answerRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    CampaignRepository campaignRepository;
    @Autowired
    CustomerServicesRatingRepository customerServicesRatingRepository;
    @Autowired
    MysteryBoxConfigRepo mysteryBoxConfigRepo;
    @Autowired
    CouponCodeConfigRepo couponCodeConfigRepo;

    @Autowired
    WinnerRepository winnerRepository;


    public static final String[] typeNames = {"Mystery box", "Client ambassador", "coupon code", "Raffle"};
    int cpt = 0;

    public Long saveAnswer(Answer answer, String campaignId) {
        customerRepository.save(answer.getCustomer());
        Campaign campaign = campaignRepository.findByCampaignId(campaignId);
        answer.setCampaign(campaign);
        Answer savedAnswer = answerRepository.save(answer);

        if (answer.getCustomerServicesRatings() != null && !answer.getCustomerServicesRatings().isEmpty()) {
            for (Customer_Services_rating csr : answer.getCustomerServicesRatings()) {
                csr.setAnswer(answer);
                csr.setCampaign_Id(campaignId);
            }
            customerServicesRatingRepository.saveAll(answer.getCustomerServicesRatings());
        }


        return savedAnswer.getCustomer().getId();
    }


    public CouponCodeConfig handleCouponCodeConfig(Campaign campaign,Customer customer)
    {
        List<CouponCodeConfig> configs = couponCodeConfigRepo.getAllCouponsConfigByCampaign(campaign.getCampaignId());
        for(CouponCodeConfig config:configs)
        {
            if (isAgeInRange(customer.getAge(), config.getMinAge(), config.getMaxAge()) &&
                    isGenderAccepted(customer.getGender(), config.getGender())) {
                return config;
            }
        }
        return null;
    }

    public MysteryBoxConfig handleMysteryBoxWinner(Campaign campaign, Customer customer) {
        List<MysteryBoxConfig> configs = mysteryBoxConfigRepo.getAllPrizesConfigByCampaign(campaign.getCampaignId());
        for(MysteryBoxConfig config : configs) {
            if (isAgeInRange(customer.getAge(), config.getMinAge(), config.getMaxAge()) &&
                    isGenderAccepted(customer.getGender(), config.getGender())) {
                return config;
            }
        }
        return null;
    }


    public static String generateDiscountCode(String discountCodeGroup) {
        String uniqueID = UUID.randomUUID().toString();
        String reference = uniqueID.substring(0, 8);
        return discountCodeGroup + "-" + reference;
    }



    private boolean isAgeInRange(int age, int minAge, int maxAge) {
        return age >= minAge && age <= maxAge;
    }

    private boolean isGenderAccepted(String customerGender, String acceptedGender) {
            if (acceptedGender.equalsIgnoreCase(customerGender)) {
                return true;
            }
        return false;
    }

//    public boolean handleClientAmbassadorWinner(Campaign campaign, Answer answer) {
//        LoyaltyProgramme loyaltyProgramme = loyaltyProgrammeService.getLoyaltyProgrammeByType(campaign.getId(), typeNames[1]);
//        int npsValue = loyaltyProgramme.getNpsValue();
//        return answer.getNpsValue() >= npsValue;
//    }




    public int numberOfAnswersForCampaign(String campaignId)
    {
        return answerRepository.countNumberOfAnswersForCampaign(campaignId);
    }
    public int avgOfNpsForCampaign(String campaignId)
    {

        return answerRepository.avgOfNpsForCampaign(campaignId);
    }
    public int calculateCsat(String campaignId)
    {
        return answerRepository.calculateCsat(campaignId);
    }


//    public String updateAnswer(Answer answer, long answerId)
//    {
//        Answer answerToUpdate  = answerRepository.findById(answerId).orElse(null);
//        answerToUpdate.setCustomer(answer.getCustomer());
//        return "answer updated";
//
//    }

    public List<WinnerResponse> updateCustomerInfo(Long customerId, Customer customer, String campaignId)
    {
        Customer customerToUpdate = customerRepository.findById(customerId).orElse(null);
        customerToUpdate.setName(customer.getName());
        customerToUpdate.setEmail(customer.getEmail());
        customerToUpdate.setTel(customer.getTel());
        customerRepository.save(customerToUpdate);
        Campaign campaign = campaignRepository.findByCampaignId(campaignId);

        List<WinnerResponse> responses = new ArrayList<>();
        if (handleMysteryBoxWinner(campaign, customerToUpdate)!=null) {
            WinnerResponse response = new WinnerResponse();
            cpt++;
            MysteryBoxConfig config = handleMysteryBoxWinner(campaign, customerToUpdate);
            int frequency = config.getPrizeFrequency();
            int quantity = config.getPrizeQuantity();
            if (frequency == cpt && quantity!=0) {
                Winner winner = Winner.builder().customer(customerToUpdate)
                        .winningDate(LocalDateTime.now())
                        .program(config.getProgram())
                        .mysteryBoxPrize(config.getMysteryBoxPrize())
                        .build();
                winnerRepository.save(winner);
                config.setPrizeQuantity(config.getPrizeQuantity()-1);
                mysteryBoxConfigRepo.save(config);
                System.out.print("Congratulations! You are a mystery box winner: {}"+customerToUpdate.getName());
                cpt = 0;
                response.setMysteryBoxPrize(config.getMysteryBoxPrize());
                response.setProgrammeTypeId(2);
                responses.add(response);
            }


        }

        if (handleCouponCodeConfig(campaign, customerToUpdate)!=null) {
            WinnerResponse response = new WinnerResponse();
            CouponCodeConfig config = handleCouponCodeConfig(campaign, customerToUpdate);
            if(config.isCouponCodeStatus())
            {
                Winner winner = Winner.builder().customer(customerToUpdate)
                        .discountCodeReference(generateDiscountCode(config.getCouponCode()))
                        .winningDate(LocalDateTime.now())
                        .program(config.getProgram())
                        .config(config)
                        .build();
                winnerRepository.save(winner);
                System.out.print("Congratulations! You are a coupon code winner: {}"+customerToUpdate.getName());
                response.setProgrammeTypeId(3);
                response.setDiscountCodeReference(winner.getDiscountCodeReference());
                responses.add(response);
            }

        }
        return responses;
    }

    public List<WinnerResponse> getListOfMysteryBoxWinnersForCampaign(String campaignId)
    {
        List<WinnerResponse> responses = new ArrayList<>();
        List<Winner> listOfWinners = winnerRepository.getAllMysteryBoxWinnersByCampaign(campaignId);
        if(listOfWinners.isEmpty())
        {
            return null;
        }
        for(Winner winner:listOfWinners)
        {
            WinnerResponse response = new WinnerResponse();
            response.setName(winner.getCustomer().getName());
            response.setEmail(winner.getCustomer().getEmail());
            response.setTel(winner.getCustomer().getTel());
            response.setWinningDate(winner.getWinningDate());
            response.setMysteryBoxPrize(winner.getMysteryBoxPrize());
            responses.add(response);
        }
        return responses;
    }

    public List<WinnerResponse> getListOfDiscountWinnersForCampaign(String campaignId)
    {
        List<WinnerResponse> responses = new ArrayList<>();
        List<Winner> listOfWinners = winnerRepository.getAllDiscountWinnersByCampaign(campaignId);
        if(listOfWinners.isEmpty())
        {
            return null;
        }
        for(Winner winner:listOfWinners)
        {
            WinnerResponse response = new WinnerResponse();
            response.setName(winner.getCustomer().getName());
            response.setEmail(winner.getCustomer().getEmail());
            response.setTel(winner.getCustomer().getTel());
            response.setWinningDate(winner.getWinningDate());
            response.setDiscountCodeReference(winner.getDiscountCodeReference());
            responses.add(response);
        }
        return responses;
    }






}
