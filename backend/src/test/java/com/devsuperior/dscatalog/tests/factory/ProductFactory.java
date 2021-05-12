package com.devsuperior.dscatalog.tests.factory;

import java.time.Instant;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

public class ProductFactory {

	public static Product createProduct() {
		Product product = new Product(null, "Phone", "Good phone", 800.0, "http://img.com/img.png", Instant.parse("2021-04-20T03:00:00Z"));
		product.getCategories().add(new Category(1L, ""));
		return product;
	}
	
	public static Product createProduct(Long id) {
		Product product = createProduct();
		product.setId(id);
		return product;
	}
	
	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());		
	}
	
	public static ProductDTO createProductDTO(Long id) {
		Product product = createProduct(id);
		return new ProductDTO(product, product.getCategories());
	}
}
