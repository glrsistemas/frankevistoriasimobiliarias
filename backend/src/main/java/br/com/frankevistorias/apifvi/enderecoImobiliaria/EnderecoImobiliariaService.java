package br.com.frankevistorias.apifvi.enderecoImobiliaria;

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
public class EnderecoImobiliariaService {

    private final EnderecoImobiliariaRepository enderecoImobiliariaRepository;

    @Autowired
	public EnderecoImobiliariaService(EnderecoImobiliariaRepository enderecoImobiliariaRepository) {
		this.enderecoImobiliariaRepository = enderecoImobiliariaRepository;
	}

	public Long save(EnderecoImobiliariaEntity enderecoImobiliariaEntity) throws NotFoundException{

		enderecoImobiliariaEntity = enderecoImobiliariaRepository.save(enderecoImobiliariaEntity);

		return enderecoImobiliariaEntity.getId();
	}
	public List<EnderecoImobiliariaEntity> findByCep(String cep){
		return enderecoImobiliariaRepository.findByCep(cep);
	}
	
	public Optional<EnderecoImobiliariaEntity> findById(Long id){
		return enderecoImobiliariaRepository.findById(id);
	}
	
	public List<EnderecoImobiliariaEntity> findAll(){
		return enderecoImobiliariaRepository.findAll();
	}
	public void delete(Long id) throws NotFoundException {
		enderecoImobiliariaRepository.findById(id).orElseThrow(() -> new NotFoundException());
		enderecoImobiliariaRepository.deleteById(id);
	}
    
}
