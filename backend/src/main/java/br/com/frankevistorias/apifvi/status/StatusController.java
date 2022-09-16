package br.com.frankevistorias.apifvi.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@RestController
@RequestMapping(value="/status")
public class StatusController {

    @Autowired
	private StatusService statusService;

	@PostMapping("/save")
    public ResponseEntity<Long> save(@RequestBody @Valid StatusEntity statusEntity) throws NotFoundException{
		return ResponseEntity.ok().body(statusService.save(statusEntity));

    }

	@PutMapping("/update")
    public ResponseEntity<Long> update(@RequestBody StatusEntity statusEntity) throws NotFoundException{
        return ResponseEntity.ok().body(statusService.save(statusEntity));
    }

	@GetMapping("/findAll")
    public ResponseEntity<List<StatusEntity>> findAll() {
        return ResponseEntity.ok().body(statusService.findAll());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) throws NotFoundException {
		statusService.delete(id);
        return ResponseEntity.ok("Deleted");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException ex) {

        Map<String, String> erros = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            erros.put(fieldName, errorMessage);
        });

        return erros;
    }
    
}