package br.com.frankevistorias.apifvi.enderecoAtendimento;


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
@RequestMapping(value="/enderecoAtendimento")
public class EnderecoAtendimentoController {

    @Autowired
    private EnderecoAtendimentoService enderecoAtendimentoService;

    @PostMapping("/save")
    public ResponseEntity<Long> save(@RequestBody @Valid EnderecoAtendimentoEntity enderecoAtendimentoEntity) throws NotFoundException{
        return ResponseEntity.ok().body(enderecoAtendimentoService.save(enderecoAtendimentoEntity));
    }

    @PutMapping("/update")
    public ResponseEntity<Long> update(@RequestBody EnderecoAtendimentoEntity enderecoAtendimentoEntity) throws NotFoundException{
        return ResponseEntity.ok().body(enderecoAtendimentoService.save(enderecoAtendimentoEntity));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<EnderecoAtendimentoEntity>> findAll() {
        return ResponseEntity.ok().body(enderecoAtendimentoService.findAll());
    }

    @GetMapping("/findByCep/{cep}")
    public ResponseEntity<List<EnderecoAtendimentoEntity>> findByCep(@PathVariable("cep") String cep) {
        return ResponseEntity.ok().body(enderecoAtendimentoService.findByCep(cep));
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<Optional<EnderecoAtendimentoEntity>> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(enderecoAtendimentoService.findById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) throws NotFoundException {
        enderecoAtendimentoService.delete(id);
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