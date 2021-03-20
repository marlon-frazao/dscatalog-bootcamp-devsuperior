package com.devsuperior.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService implements GenericService<Product, ProductDTO, Long> {

	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public JpaRepository<Product, Long> getRepository() {
		return repository;
	}
	
	@Override
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
		Page<Product> list = getRepository().findAll(pageRequest);
		return list.map(ProductDTO::new);
	}

	@Override
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		copyDtoToEntity(dto, entity);
		return repository.save(entity).convert();
	}

	@Override
	public Product updateData(Long id, ProductDTO dto) {
		try {
			return copyDtoToEntity(dto,  repository.getOne(id));
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

	private Product copyDtoToEntity(ProductDTO dto, Product entity) {
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setPrice(dto.getPrice());
		entity.setDate(dto.getDate());
		entity.setImgUrl(dto.getImgUrl());
		
		entity.getCategories().clear();
		
		dto.getCategories().forEach(catDto -> entity.getCategories().add(categoryRepository.getOne(catDto.getId())));
		
		return entity;
	}
}
