package com.zee.zee5app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zee.zee5app.dto.Role;
import com.zee.zee5app.enums.EROLE;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
	Optional<Role> findByRoleName(EROLE roleName);
}
