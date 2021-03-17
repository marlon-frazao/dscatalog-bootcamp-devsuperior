package com.devsuperior.dscatalog.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.services.CategoryService;
import com.devsuperior.dscatalog.services.GenericService;

@RestController
@RequestMapping(value = "/categories")
public class CategoryResource implements GenericResource<Category, CategoryDTO, Long>{

	@Autowired
	private CategoryService service;

	@Override
	public GenericService<Category, CategoryDTO, Long> getService() {
		return service;
	}
}
