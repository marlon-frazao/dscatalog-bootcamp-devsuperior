package com.devsuperior.dscatalog.tests.factory;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;

public class CategoryFactory {

	public static Category createCategory() {
		return new Category(null, "Teste");
	}
	
	public static Category createCategory(Long id) {
		return new Category(id, "Teste");
	}
	
	public static CategoryDTO createCategoryDTO() {
		return new CategoryDTO(createCategory());
	}
	
	public static CategoryDTO createCategoryDTO(Long id) {
		return new CategoryDTO(createCategory(id));
	}
}
