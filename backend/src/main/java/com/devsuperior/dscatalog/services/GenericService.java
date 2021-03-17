package com.devsuperior.dscatalog.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface GenericService<T, ID> {

	JpaRepository<T, ID> getRepository();
	
	default List<T> findAll() {
		return getRepository().findAll();
	}
}
