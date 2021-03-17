package com.devsuperior.dscatalog.resources;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dscatalog.services.GenericService;

@RestController
public interface GenericResource<T, ID> {

	GenericService<T, ID> getService();
	
	@GetMapping
	default ResponseEntity<List<T>> findAll() {		
		return ResponseEntity.ok().body(getService().findAll());
	}
}
