package br.com.frankevistorias.apifvi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableWebMvc
public class ApifviApplication implements WebMvcConfigurer{

	@Override
	public void addCorsMappings (CorsRegistry registry){
		registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
	}

	public static void main(String[] args) throws IOException, InterruptedException {
		SpringApplication.run(ApifviApplication.class, args);
	}

	@Bean
	public PasswordEncoder getPasswordEncoder(){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}

}
