package sg.edu.nus.iss.workshopday39.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import sg.edu.nus.iss.workshopday39.models.Employee;
import sg.edu.nus.iss.workshopday39.services.EmployeeService;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequestMapping(path = "/api")
public class EmployeeController {
    
    @Autowired
    EmployeeService employeeSvc;

    @PostMapping(path="/add" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
    public ResponseEntity<String> addEmployee(
        @RequestPart ("firstName") String firstName,
        @RequestPart ("lastName") String lastName, 
        @RequestPart ("email") String email,  
        @RequestPart ("profile") MultipartFile profile) {
        
        Employee employee = new Employee();
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setEmail(email);
        // employee.setFirstName(payload.getFirst("firstName"));
        // employee.setFirstName(payload.getFirst("lastName"));
        // employee.setEmail(payload.getFirst("email"));
       
        employeeSvc.save(employee, profile);
        
        return ResponseEntity.ok("ok");
    }
    

}
