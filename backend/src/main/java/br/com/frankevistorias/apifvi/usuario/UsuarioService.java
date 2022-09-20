package br.com.frankevistorias.apifvi.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Optional;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Service
public class UsuarioService {

	@Value("${upload.arquivo.raiz}")
	private String raiz;

	@Value("${upload.arquivo.usuario}")
	private String usuario;

    private final UsuarioRepository usuarioRepository;
	private final PasswordEncoder encoder;

    @Autowired
	public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder encoder) {
		this.usuarioRepository = usuarioRepository;
		this.encoder = encoder;
	}

	public Long save(UsuarioEntity usuarioEntity, MultipartFile file) throws NotFoundException{

		if (!file.isEmpty()){
			usuarioEntity.setUri(upload(file));
		}
		
		usuarioEntity.setSenha(encoder.encode(usuarioEntity.getSenha()));
		usuarioEntity = usuarioRepository.save(usuarioEntity);

		return usuarioEntity.getId();
	}

	public  Optional<UsuarioEntity> findByEmail(String email){
		return usuarioRepository.findByEmail(email);
	}

	public  Optional<UsuarioEntity> findByLogin(String login){
		return usuarioRepository.findByLogin(login);
	}

	public void delete(Long id) throws NotFoundException {
		usuarioRepository.findById(id).orElseThrow(() -> new NotFoundException());
		usuarioRepository.deleteById(id);
	}

	public UsuarioDTO findUsuarioLogado(Long id){
		UsuarioDTO userLogado = new UsuarioDTO(usuarioRepository.findById(id).get());
		return userLogado ;
	}

	public String upload(MultipartFile file) throws NotFoundException {

		Path diretorioPath = Paths.get(this.raiz, usuario);;
		String uri = raiz + "/" + usuario;
		String nome = String.valueOf(file.getOriginalFilename()).split("[.]")[0];
		String timeStamp = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
		String formato = String.valueOf(file.getOriginalFilename()).split("[.]")[1];
		String arquivo = nome + " " + timeStamp + "." + formato;

		Path arquivoPath = diretorioPath.resolve(arquivo);

		try {
			Files.createDirectories(diretorioPath);
			file.transferTo(arquivoPath.toFile());
		} catch (IOException e) {
			throw new RuntimeException("Problemas na tentativa de salvar arquivo.", e);
		}

		return uri + "/" + arquivo;
	}
    
}