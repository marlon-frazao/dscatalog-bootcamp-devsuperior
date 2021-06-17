package com.devsuperior.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.AlreadyExistsException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService implements GenericService<Category, CategoryDTO, Long> {

	@Autowired
	private CategoryRepository repository;

	@Override
	public JpaRepository<Category, Long> getRepository() {
		return repository;
	}
	
	@Transactional(readOnly = true)
	public Page<CategoryDTO> findAllPaged(String name, PageRequest pageRequest) {
		return repository.find(name, pageRequest).map(Category::convert);
	}
	
	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		if(repository.findByName(dto.getName()) != null) {
			throw new AlreadyExistsException("Entity already exists");
		}
		Category entity = new Category(null, dto.getName());

		return repository.save(entity).convert();
	}

	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		try {
			Category entity = repository.getOne(id);
			entity.setName(dto.getName());
			return repository.save(entity).convert();
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found: " + id);
		}
	}

}
