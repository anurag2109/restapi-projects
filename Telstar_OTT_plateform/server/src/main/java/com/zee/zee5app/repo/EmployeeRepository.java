package com.zee.zee5app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zee.zee5app.dto.Employee;
import com.zee.zee5app.dto.Movie;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
	List<Employee> findByDept(String deptName);
	
	List<Employee> findBySalary(float salary);

	List<Employee> findBySalaryGreaterThan(int salary);
	List<Employee> findBySalaryGreaterThanEqual(int salary); // find employee whose salary is greater than or equal to given salary

	List<Employee> findByDeptAndSalaryLessThan(String deptName, int salary);
}
