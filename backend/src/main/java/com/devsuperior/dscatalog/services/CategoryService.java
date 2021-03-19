package com.devsuperior.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService implements GenericService<Category, CategoryDTO, Long> {

	@Autowired
	private CategoryRepository repository;

	@Override
	public JpaRepository<Category, Long> getRepository() {
		return repository;
	}

	@Override
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category(null, dto.getName());

		return repository.save(entity).convert();
	}

	@Override
	public Category updateData(Long id, CategoryDTO dto) {
		try {
			Category entity = repository.getOne(id);
			entity.setName(dto.getName());
			return entity;
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

}
