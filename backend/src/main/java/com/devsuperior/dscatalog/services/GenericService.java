package com.devsuperior.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;
import com.devsuperior.dscatalog.util.Convertible;

@Service
public interface GenericService<T extends Convertible<DTO>, DTO, ID> {

	JpaRepository<T, ID> getRepository();

	@Transactional(readOnly = true)
	default Page<DTO> findAllPaged(PageRequest pageRequest) {
		Page<T> list = getRepository().findAll(pageRequest);
		return list.map(T::convert);
	}

	@Transactional(readOnly = true)
	default DTO findById(ID id) {
		return getRepository().findById(id).orElseThrow(() -> new EntityNotFoundException("Entity not found!"))
				.convert();
	}

	@Transactional
	DTO insert(DTO dto);

	@Transactional
	default DTO update(ID id, DTO dto) {
		return getRepository().save(updateData(id, dto)).convert();
	}

	T updateData(ID id, DTO dto);

	default void delete(ID id) {
		try {
			getRepository().deleteById(id);
		} catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		} catch(DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation!");
		}
	}
}
