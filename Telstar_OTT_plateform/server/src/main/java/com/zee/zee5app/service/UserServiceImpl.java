package com.zee.zee5app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zee.zee5app.dto.User;
import com.zee.zee5app.exceptions.EntryAlreadyExistException;
import com.zee.zee5app.exceptions.NoDataFoundException;
import com.zee.zee5app.exceptions.UnableToGenerateIdException;
import com.zee.zee5app.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	
	@Autowired
	private UserRepository repo;
	
	// insertion user
	@Override
	public User insertuser(User user) throws UnableToGenerateIdException, EntryAlreadyExistException {
		if(repo.existsByEmail(user.getEmail()) || repo.existsByUsername(user.getUsername())) {
			throw new EntryAlreadyExistException("entry already exist");
		}else {
			return repo.save(user);
		}
	}
	
	// delete user
	@Override
	public String deleteUser(String uid) throws NoDataFoundException {
		try {
			if(repo.existsById(uid)) {			
				repo.deleteById(uid);
				return "success";
			}else {
				throw new NoDataFoundException("No user find with this ID.");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "failed";
		
	}
	
	// update user
	@Override
	public Optional<User> updateUser(String id, User user) throws NoDataFoundException {
		return Optional.ofNullable(repo.save(user));
	}
	
	// get all users
	@Override
	public Optional<List<User>> getAllUsers() {
		return Optional.ofNullable(repo.findAll());
	}
	
	// get specific user
	@Override
	public Optional<User> getUserByUserId(String userId) {
		return repo.findById(userId);
	}

	@Override
	public Optional<User[]> findByOrderByUserNameDsc() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
