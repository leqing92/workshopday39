package sg.edu.nus.iss.workshopday39.repository;

public interface Queries {
    final String SAVE_EMPLOYEE =
        """
              INSERT into employees (firstName, lastName, email, profileUrl) 
              VALUES (?, ?, ?, ?)
        """;
    final String GET_LIST =
        """
              SELECT * from employees
        """;
    final String GET_EMPLOYEE_BY_ID =
        """
            SELECT * from employees 
            WHERE id= ?;    
        """;
    final String DELETE_EMPLOYEE_BY_ID = 
        """
            DELETE from employees 
            WHERE id = ?;        
        """;
    final String UPDATE_EMPLOYEE_BY_ID = 
        """
            UPDATE employees
            SET firstName = ?,
                lastName = ?,
                email = ?,
                profileUrl = ?
            WHERE id = ?;        
        """;
}
