package sg.edu.nus.iss.workshopday39.repository;

public interface Queries {
    final String save =
        """
              INSERT into employees (firstName, lastName, email, profileUrl) 
              VALUES (?, ?, ?, ?)
        """;
}
