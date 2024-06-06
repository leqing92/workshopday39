package sg.edu.nus.iss.workshopday39.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.workshopday39.models.Employee;

@Repository
public class MYSQLRepo {
    
    @Autowired
    JdbcTemplate template;

    public void save(Employee employee){
        template.update(Queries.save, employee.getFirstName(), employee.getLastName(), employee.getEmail(), employee.getProfileUrl());
    }


}
