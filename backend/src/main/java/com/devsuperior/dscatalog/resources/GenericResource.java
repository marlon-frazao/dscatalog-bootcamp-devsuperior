package com.devsuperior.dscatalog.resources;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dscatalog.services.GenericService;
import com.devsuperior.dscatalog.util.Convertible;

@RestController
public interface GenericResource<T extends Convertible<DTO>, DTO, ID> {

	GenericService<T, DTO, ID> getService();
	
	@GetMapping
	default ResponseEntity<List<DTO>> findAll() {		
		return ResponseEntity.ok().body(getService().findAll());
	}
	
	@GetMapping(value = "/{id}")
	default ResponseEntity<DTO> findById(@PathVariable ID id) {
		return ResponseEntity.ok().body(getService().findById(id));
	}
}
