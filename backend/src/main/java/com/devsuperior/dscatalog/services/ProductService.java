package com.devsuperior.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService implements GenericService<Product, ProductDTO, Long> {

	@Autowired
	private ProductRepository repository;

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

		return repository.save(entity).convert();
	}

	@Override
	public Product updateData(Long id, ProductDTO dto) {
		try {
			Product entity = repository.getOne(id);
			//entity.setName(dto.getName());
			return entity;
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

}
