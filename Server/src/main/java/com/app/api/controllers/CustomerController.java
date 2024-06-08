package com.app.api.controllers;

import com.app.api.entities.Campaign.Customer;
import com.app.api.services.CustomerManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/customers")
public class CustomerController {
    @Autowired
    CustomerManagementService customerManagementService;

    @GetMapping("/anonymous/{campaignId}")
    public List<Customer> listOfAnonymousCustomers(@PathVariable String campaignId) {
        return customerManagementService.listOfAnonymousCustomers(campaignId);
    }
    @GetMapping("/identified/{campaignId}")
    public List<Customer> listOfCustomers(@PathVariable String campaignId) {

        return customerManagementService.listOfCustomers(campaignId);
    }
    @GetMapping("/{campaignId}/gender")
    public List<Object[]> getCustomersByGender(@PathVariable String campaignId) {
        return customerManagementService.getCustomersByGender(campaignId);
    }
    @GetMapping("/{campaignId}/age")
    public List<Object[]> getCustomersByAge(@PathVariable String campaignId) {
        return customerManagementService.getCustomersByAge(campaignId);
    }
    @GetMapping("/{campaignId}/all")
    public List<Map<String, Integer>> getCustomers(@PathVariable String campaignId) {
        return customerManagementService.getAllCustomers(campaignId);
    }
    @GetMapping("/{campaignId}/avg-rating-services")
    public List<Object[]> getAvgRate(@PathVariable String campaignId) {
        return customerManagementService.getAvgCustomerRatingForEveryService(campaignId);
    }






}
