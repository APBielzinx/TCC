package br.com.tcc.api.produto;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Up_Api", version = "2.0", description = "Uma lista dos comandos da api. <br> " +
		"Alguns links como atualizar, login e cadastrar precisão ser enviados por objetos como o exmplo mostrado. <br> " +
		"Preste atenção nas urls e tipos de requisição."))
public class ApiProdutoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiProdutoApplication.class, args);
	}



}
