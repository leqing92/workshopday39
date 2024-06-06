package sg.edu.nus.iss.workshopday39.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import sg.edu.nus.iss.workshopday39.models.Employee;
import sg.edu.nus.iss.workshopday39.repository.MYSQLRepo;
import sg.edu.nus.iss.workshopday39.repository.S3Repo;

@Service
public class EmployeeService {
    
    @Autowired
    MYSQLRepo mysqlRepo;

    @Autowired
    S3Repo s3Repo;

    public void save(Employee employee, MultipartFile profile){
        try {
            String profileUrl = s3Repo.upload(profile);
            employee.setProfileUrl(profileUrl);

            mysqlRepo.save(employee);

        } catch (IOException e) {
            
            e.printStackTrace();
        }       
        
    }

    public String getList(){
        JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();

        List<Employee> employees = mysqlRepo.getList();
        System.out.println("\n\n\nservice:" + employees.toString());
        for(Employee e : employees){
            JsonObject employee = Json.createObjectBuilder()
                                    .add("id", e.getId())
                                    .add("firstName", e.getFirstName())
                                    .add("lastName", e.getLastName())
                                    .add("email", e.getEmail())
                                    .add("profileUrl", e.getProfileUrl())
                                    .build();
            jArrayBuilder.add(employee);
        }        

        return jArrayBuilder.build().toString();
    }

    public Employee getEmployeeById(int id){
        if(null != mysqlRepo.getEmployeeById(id)){
            Employee employee = mysqlRepo.getEmployeeById(id).get();
            return employee;
        }
        else
        return null;
    }

    public Boolean deleteEmployeeById(int id){
        return mysqlRepo.deleteEmployeeById(id);
    }

    public Boolean updateEmployeeById(Employee employee, MultipartFile profile){
        try {
            String profileUrl = s3Repo.upload(profile);
            employee.setProfileUrl(profileUrl);

            return mysqlRepo.updateEmployeeById(employee);

        } catch (IOException e) {            
            e.printStackTrace();
            return false;
        }    
    }
}
