package com.devsuperior.dscatalog.resources;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dscatalog.services.GenericService;
import com.devsuperior.dscatalog.util.Convertible;

@RestController
public interface GenericResource<T extends Convertible<DTO>, DTO, ID> {

	GenericService<T, DTO, ID> getService();

	@GetMapping(value = "/{id}")
	default ResponseEntity<DTO> findById(@PathVariable ID id) {
		return ResponseEntity.ok().body(getService().findById(id));
	}

	@DeleteMapping(value = "/{id}")
	default ResponseEntity<DTO> delete(@PathVariable ID id) {
		getService().delete(id);
		return ResponseEntity.noContent().build();
	}
}
