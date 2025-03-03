package com.korit.dorandoran.common.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class TodayCreator {

    public static String todayCreator(){
        
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formatted = today.format(formatter);

        return formatted;
    }
}
