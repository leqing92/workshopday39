package sg.edu.nus.iss.workshopday39.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
}
