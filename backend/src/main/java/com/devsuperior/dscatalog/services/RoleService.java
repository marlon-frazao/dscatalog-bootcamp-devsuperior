package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.RoleDTO;
import com.devsuperior.dscatalog.repositories.RoleRepository;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class RoleService {

	@Autowired
	private RoleRepository repository;
	
	@Transactional(readOnly = true)
	public List<RoleDTO> findAll() {
		return repository.findAll().stream().map(x -> x.convert()).collect(Collectors.toList());
	}
	
	public RoleDTO findById(Long id) {
		return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Entity not found!"))
				.convert();
	}
}
