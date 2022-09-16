package br.com.frankevistorias.apifvi.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@RestController
@RequestMapping(value="/usuario")
public class UsuarioController {

    @Autowired
	private UsuarioService usuarioService;
    @Autowired
    private PasswordEncoder encoder;


	@PostMapping("/save")
    public ResponseEntity<Long> save(@RequestBody  @Valid UsuarioEntity usuarioEntity) throws NotFoundException{
        Optional<UsuarioEntity> usuario = usuarioService.findByEmail(usuarioEntity.getEmail());
        if(usuario.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(usuario.get().getId());
        }
		return ResponseEntity.ok().body(usuarioService.save(usuarioEntity));

    }

	@PutMapping("/update") 	
    public ResponseEntity<Long> update(@RequestBody UsuarioEntity usuarioEntity) throws NotFoundException{
        return ResponseEntity.ok().body(usuarioService.save(usuarioEntity));
    }
	
    @GetMapping("/login")
    public ResponseEntity<Boolean> login(@RequestParam("login") String login, @RequestParam("senha") String senha) {
        
        
        Optional<UsuarioEntity> usuario = usuarioService.findByLogin(login);
        if(!usuario.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }

        boolean valid = false;
        valid = encoder.matches(senha, usuario.get().getSenha());

        HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(valid);
    }

    @GetMapping("/findByUsuarioLogado/{id}")
    public ResponseEntity<UsuarioDTO> findByUsuarioLogado(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(usuarioService.findUsuarioLogado(id));
    }
    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<Optional<UsuarioEntity>> findUsuarioByEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok().body(usuarioService.findByEmail(email));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) throws NotFoundException {
		usuarioService.delete(id);
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