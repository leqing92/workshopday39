package sg.edu.nus.iss.workshopday39;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import sg.edu.nus.iss.workshopday39.models.Employee;
import sg.edu.nus.iss.workshopday39.services.EmployeeService;

@SpringBootApplication
public class Workshopday39Application implements CommandLineRunner{

	@Autowired
	EmployeeService mysqlSvc;
	public static void main(String[] args) {
		SpringApplication.run(Workshopday39Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Employee employee = new Employee();
		// employee.setEmail("email");
		// employee.setFirstName("firstname");
		// employee.setLastName("lastname");
		// employee.setProfileUrl("http");

		// mysqlSvc.save(employee);
	}

}
