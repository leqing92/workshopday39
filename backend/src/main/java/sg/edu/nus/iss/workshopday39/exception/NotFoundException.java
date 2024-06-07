package sg.edu.nus.iss.workshopday39.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException() {
        super();
    }

    public NotFoundException(String msg){
        super(msg);
    }
}
