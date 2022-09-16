package br.com.frankevistorias.apifvi.enderecoImobiliaria;


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
import java.util.Optional;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@RestController
@RequestMapping(value="/enderecoImobiliaria")
public class EnderecoImobiliariaController {

    @Autowired
    private EnderecoImobiliariaService enderecoImobiliariaService;

    @PostMapping("/save")
    public ResponseEntity<Long> save(@RequestBody @Valid EnderecoImobiliariaEntity enderecoImobiliariaEntity) throws NotFoundException{
        return ResponseEntity.ok().body(enderecoImobiliariaService.save(enderecoImobiliariaEntity));
    }

    @PutMapping("/update")
    public ResponseEntity<Long> update(@RequestBody EnderecoImobiliariaEntity enderecoImobiliariaEntity) throws NotFoundException{
        return ResponseEntity.ok().body(enderecoImobiliariaService.save(enderecoImobiliariaEntity));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<EnderecoImobiliariaEntity>> findAll() {
        return ResponseEntity.ok().body(enderecoImobiliariaService.findAll());
    }

    @GetMapping("/findByCep/{cep}")
    public ResponseEntity<List<EnderecoImobiliariaEntity>> findByCep(@PathVariable("cep") String cep) {
        return ResponseEntity.ok().body(enderecoImobiliariaService.findByCep(cep));
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<Optional<EnderecoImobiliariaEntity>> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(enderecoImobiliariaService.findById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) throws NotFoundException {
        enderecoImobiliariaService.delete(id);
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