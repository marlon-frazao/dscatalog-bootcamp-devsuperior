package com.devsuperior.dscatalog.resources;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.services.CategoryService;
import com.devsuperior.dscatalog.services.GenericService;

@RestController
@RequestMapping(value = "/categories")
public class CategoryResource implements GenericResource<Category, CategoryDTO, Long> {

	@Autowired
	private CategoryService service;

	@Override
	public GenericService<Category, CategoryDTO, Long> getService() {
		return service;
	}

	@PostMapping
	public ResponseEntity<CategoryDTO> insert(CategoryDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}

}
