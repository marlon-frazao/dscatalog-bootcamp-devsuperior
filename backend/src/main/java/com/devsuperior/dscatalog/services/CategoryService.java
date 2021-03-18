package com.devsuperior.dscatalog.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRespository;

@Service
public class CategoryService implements GenericService<Category, CategoryDTO, Long>{

	@Autowired
	private CategoryRespository repository;
	
	@Override
	public JpaRepository<Category, Long> getRepository() {
		return repository;
	}

	@Override
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category(null, dto.getName());
		
		return repository.save(entity).convert();
	}

}
