package br.com.tcc.api.produto;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Up_Api", version = "2.0", description = "Uma lista dos comandos da api"))
public class ApiProdutoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiProdutoApplication.class, args);
	}



}
