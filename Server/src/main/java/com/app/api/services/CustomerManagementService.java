package com.app.api.services;

import com.app.api.entities.Campaign.Customer;
import com.app.api.repositories.CustomerRepository;
import com.app.api.repositories.CustomerServicesRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CustomerManagementService {
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    CustomerServicesRatingRepository customerServicesRatingRepository;
    public List<Customer> listOfAnonymousCustomers(String campaignId) {
            List<Customer> anonymousCustomers = customerRepository.getAnonymousData(campaignId);
            if(anonymousCustomers.isEmpty())
            {
                throw new RuntimeException("there is no answers for this campaign");
            }
            return anonymousCustomers;
    }
    public List<Customer> listOfCustomers(String campaignId) {
        List<Customer> Customers = customerRepository.findAllCustomers(campaignId);
        if(Customers.isEmpty())
        {
            throw new RuntimeException("there is no identified answers for this campaign");
        }
        return Customers;
    }

    public List<Object[]> getCustomersByGender(String campaignId) {
        return customerRepository.getCustomersByGender(campaignId);
    }
    public List<Object[]> getCustomersByAge(String campaignId) {
        return customerRepository.getCustomersByAge(campaignId);
    }
    public List<Map<String, Integer>> getAllCustomers(String campaignId) {
        return customerRepository.getAllCustomers(campaignId);
    }
    public List<Object[]> getAvgCustomerRatingForEveryService(String campaignId) {
        return customerServicesRatingRepository.getAvgCustomerRatingForEveryService(campaignId);
    }





}
