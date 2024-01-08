package com.cooksys.groupfinal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.cooksys.groupfinal")
public class GroupFinalApplication {

	public static void main(String[] args) {
		SpringApplication.run(GroupFinalApplication.class, args);
	}

}
