package com.app.api.utils;

public class EmailUtils {
    public static String getEmailMessage(String name, String host, String confirmationKey) {
        return "Hello " + name + ",\n\nYour new account has been created. Please click the link below to verify your account. \n\n" +
                getVerificationUrl(host, confirmationKey) + "\n\nThe support Team";
    }

    public static String getVerificationUrl(String host, String confirmationKey) {
        return host + "/auth?token=" + confirmationKey;
    }
    public static String getRestPassEmailMessage(String name, String host, String confirmationKey) {
        return "Hello " + name + ",\n\nPlease click the link below to reset your password. \n\n" +
                getResetPassVerificationUrl(host, confirmationKey) + "\n\nThe support Team";
    }

    public static String getResetPassVerificationUrl(String host, String confirmationKey) {
        return host + "/reset-password-process?token=" + confirmationKey;
    }



}
