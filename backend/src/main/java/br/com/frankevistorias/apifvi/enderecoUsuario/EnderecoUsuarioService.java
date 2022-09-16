package br.com.frankevistorias.apifvi.enderecoUsuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Service
public class EnderecoUsuarioService {

    private final EnderecoUsuarioRepository enderecoUsuarioRepository;

    @Autowired
	public EnderecoUsuarioService(EnderecoUsuarioRepository enderecoUsuarioRepository) {
		this.enderecoUsuarioRepository = enderecoUsuarioRepository;
	}

	public Long save(EnderecoUsuarioEntity enderecoUsuarioEntity) throws NotFoundException{

		enderecoUsuarioEntity = enderecoUsuarioRepository.save(enderecoUsuarioEntity);

		return enderecoUsuarioEntity.getId();
	}
	public List<EnderecoUsuarioEntity> findByCep(String cep){
		return enderecoUsuarioRepository.findByCep(cep);
	}
	
	public Optional<EnderecoUsuarioEntity> findById(Long id){
		return enderecoUsuarioRepository.findById(id);
	}
	
	public List<EnderecoUsuarioEntity> findAll(){
		return enderecoUsuarioRepository.findAll();
	}
	public void delete(Long id) throws NotFoundException {
		enderecoUsuarioRepository.findById(id).orElseThrow(() -> new NotFoundException());
		enderecoUsuarioRepository.deleteById(id);
	}
    
}
