package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.util.Convertible;

@Service
public interface GenericService<T extends Convertible<DTO>, DTO, ID> {

	JpaRepository<T, ID> getRepository();
	
	@Transactional(readOnly = true)
	default List<DTO> findAll() {
		return getRepository().findAll().stream().map(T::convert).collect(Collectors.toList());
	}
}
