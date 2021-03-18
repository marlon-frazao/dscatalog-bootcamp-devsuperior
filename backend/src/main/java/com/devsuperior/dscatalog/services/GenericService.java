package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.services.exceptions.EntityNotFoundException;
import com.devsuperior.dscatalog.util.Convertible;

@Service
public interface GenericService<T extends Convertible<DTO>, DTO, ID> {

	JpaRepository<T, ID> getRepository();

	@Transactional(readOnly = true)
	default List<DTO> findAll() {
		return getRepository().findAll().stream().map(T::convert).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	default DTO findById(ID id) {
		return getRepository().findById(id).orElseThrow(() -> new EntityNotFoundException("Entity not found!"))
				.convert();
	}
	
	@Transactional
	DTO insert(DTO dto);
}
