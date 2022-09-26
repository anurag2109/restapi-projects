package com.zee.zee5app.restcontroller;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zee.zee5app.dto.Role;
import com.zee.zee5app.dto.User;
import com.zee.zee5app.enums.EROLE;
import com.zee.zee5app.exceptions.EntryAlreadyExistException;
import com.zee.zee5app.exceptions.NoDataFoundException;
import com.zee.zee5app.exceptions.UnableToGenerateIdException;
import com.zee.zee5app.payload.request.LoginRequest;
import com.zee.zee5app.payload.request.SignupRequest;
import com.zee.zee5app.payload.responce.JwtResponse;
import com.zee.zee5app.repo.RoleRepository;
import com.zee.zee5app.security.jwt.JwtUtils;
import com.zee.zee5app.security.services.UserDetailsImpl;
import com.zee.zee5app.service.UserServiceImpl;

@RestController
@RequestMapping("/api/auth")
public class UserController {

	@Autowired
	UserServiceImpl userServiceImpl;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	AuthenticationManager authenticationManager;
	
	

	@PostMapping("/signup") // It is a combination of post method and request mapping
	public ResponseEntity<?> createUser(@Valid @RequestBody SignupRequest signupRequest)
			throws UnableToGenerateIdException, EntryAlreadyExistException {

//		User user2 = userServiceImpl.insertuser(user);
//		return ResponseEntity.status(HttpStatus.CREATED).body(user2);

		Set<String> strRoles = signupRequest.getRole();
		Set<Role> roles = new HashSet<>();
		if (strRoles == null) {
			Role userRoll = roleRepository.findByRoleName(EROLE.ROLE_USER) // findByRoleName is defined in
																			// roleRepository
					.orElseThrow(() -> new RuntimeException("Error: role not found")); // orElseThrow method defined in
																						// Optional class
			roles.add(userRoll);
		} else {
			strRoles.forEach(e -> {
				switch (e) {
				case "admin":
					System.out.println(e);
					Role adminRoll = roleRepository.findByRoleName(EROLE.ROLE_ADMIN) // findByRoleName is defined in
																						// roleRepository
							.orElseThrow(() -> new RuntimeException("Error: admin role not found")); // orElseThrow
																										// method
																										// defined in
																										// Optional
																										// class
					roles.add(adminRoll);
					break;

				case "moderator":
					Role modRoll = roleRepository.findByRoleName(EROLE.ROLE_MOD) // findByRoleName is defined in
																					// roleRepository
							.orElseThrow(() -> new RuntimeException("Error: moderator role not found")); // orElseThrow
																											// method
																											// defined
																											// in
																											// Optional
																											// class
					roles.add(modRoll);
					break;

				default:
					Role userRoll = roleRepository.findByRoleName(EROLE.ROLE_USER) // findByRoleName is defined in
																					// roleRepository
							.orElseThrow(() -> new RuntimeException("Error: user role not found")); // orElseThrow
																									// method defined in
																									// Optional class
					roles.add(userRoll);
					break;
				}
			});
		}

		User user = new User(null, signupRequest.getFirstName(), signupRequest.getLastName(),
				signupRequest.getUsername(), passwordEncoder.encode(signupRequest.getPassword()),
				signupRequest.getEmail(), LocalDate.now(), signupRequest.getDob(), true, roles);
		userServiceImpl.insertuser(user);
		System.out.println(user);

		return ResponseEntity.status(201).body("msg: successfully created");
	}

	@DeleteMapping("/{id}")
	public String deleteUser(@PathVariable("id") String id) {
		try {
			userServiceImpl.deleteUser(id);
			return "delete success: " + id;
		} catch (NoDataFoundException e) {
			e.printStackTrace();
		}
		return "failed to delete";
	}

	@GetMapping("/{id}")
	public Optional<User> getUserById(@PathVariable("id") String userid) {
		return userServiceImpl.getUserByUserId(userid);
	}

	@PutMapping()
	public String updateUserByUserId(String userid) {
		return "update success";
	}

	@GetMapping("")
	public Optional<User> auth() {
		
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return userServiceImpl.getUserByUserId(userDetailsImpl.getId());
	}
	
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateToken(authentication);
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
		
		List<String> roles = userDetailsImpl.getAuthorities().stream().map(i -> i.getAuthority())
				.collect(Collectors.toList());
		
		return ResponseEntity.ok(new JwtResponse(jwt, userDetailsImpl.getId(), userDetailsImpl.getUsername(),
				userDetailsImpl.getEmail(), roles));
	}

}
