package sg.edu.nus.iss.workshopday39.repository;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.workshopday39.models.Employee;

@Repository
public class MYSQLRepo {
    
    @Autowired
    JdbcTemplate template;

    public void save(Employee employee){
        template.update(Queries.SAVE_EMPLOYEE, employee.getFirstName(), employee.getLastName(), employee.getEmail(), employee.getProfileUrl());
    }

    public List<Employee> getList(){
        List<Employee> employees = new LinkedList<>();

        final SqlRowSet rs = template.queryForRowSet(Queries.GET_LIST);

        while(rs.next()){
            Employee employee = new Employee();
            employee.setId(rs.getInt("id"));
            employee.setFirstName(rs.getString("firstName"));
            employee.setLastName(rs.getString("lastName"));
            employee.setEmail(rs.getString("email"));
            employee.setProfileUrl(rs.getString("profileUrl"));

            employees.add(employee);
        }   

        return employees;
    }

    public Optional<Employee> getEmployeeById(int id){
        Employee employee = new Employee();

        final SqlRowSet rs = template.queryForRowSet(Queries.GET_EMPLOYEE_BY_ID, id);
        
        if(rs.next()){
            employee.setId(rs.getInt("id"));
            employee.setFirstName(rs.getString("firstName"));
            employee.setLastName(rs.getString("lastName"));
            employee.setEmail(rs.getString("email"));
            employee.setProfileUrl(rs.getString("profileUrl"));
        }else{
            Optional.empty();
        }
        return Optional.of(employee);
    }

    public Boolean updateEmployeeById(Employee employee){

        int change = template.update(Queries.UPDATE_EMPLOYEE_BY_ID, 
                                        employee.getFirstName(), 
                                        employee.getLastName(), 
                                        employee.getEmail(), 
                                        employee.getProfileUrl(), 
                                        employee.getId());

        return change >= 1 ? true : false;
    }

    public Boolean deleteEmployeeById(int id){      
        
        return template.update(Queries.DELETE_EMPLOYEE_BY_ID, id) >= 1 ? true : false;
    }
}
