package com.ssafy.dokdo;

import com.ssafy.dokdo.Config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class DokdoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DokdoApplication.class, args);
	}

}
