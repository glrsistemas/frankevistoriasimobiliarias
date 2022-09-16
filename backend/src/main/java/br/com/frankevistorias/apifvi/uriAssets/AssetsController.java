package br.com.frankevistorias.apifvi.uriAssets;

import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@RestController
@RequestMapping(value="/assets")
public class AssetsController {

    @Autowired
	private AssetsService assetsService;

    @PostMapping("/upload")
    public ResponseEntity<Long> upload(@RequestParam MultipartFile file, String origemUpload, Integer id){
        return ResponseEntity.ok().body(assetsService.save(file, origemUpload, id));
    }
	@PostMapping("/save")
    public ResponseEntity<Long> save(@RequestBody @Valid AssetsEntity assetsEntity) throws NotFoundException{
		return ResponseEntity.ok().body(assetsService.save(assetsEntity));

    }

	@PutMapping("/update")
    public ResponseEntity<Long> update(@RequestBody AssetsEntity assetsEntity) throws NotFoundException{
        return ResponseEntity.ok().body(assetsService.save(assetsEntity));
    }

	@GetMapping("/findAll")
    public ResponseEntity<List<AssetsEntity>> findAll() {
        return ResponseEntity.ok().body(assetsService.findAll());
    }
	/* @GetMapping("/findByIdUsuario/{idUsuario}")
    public ResponseEntity<AssetsDTO> findIdUsuario(@PathVariable("idUsuario") Long idUsuario) {
        return ResponseEntity.ok().body(assetsService.findIdUsuario(idUsuario));
    } */
	
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) throws NotFoundException {
		assetsService.delete(id);
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