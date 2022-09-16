package br.com.frankevistorias.apifvi.enderecoAtendimento;

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
public class EnderecoAtendimentoService {

	private final EnderecoAtendimentoRepository enderecoAtendimentoRepository;

	@Autowired
	public EnderecoAtendimentoService(EnderecoAtendimentoRepository enderecoAtendimentoRepository) {
		this.enderecoAtendimentoRepository = enderecoAtendimentoRepository;
	}

	public Long save(EnderecoAtendimentoEntity enderecoAtendimentoEntity) throws NotFoundException{

		enderecoAtendimentoEntity = enderecoAtendimentoRepository.save(enderecoAtendimentoEntity);

		return enderecoAtendimentoEntity.getId();
	}
	public List<EnderecoAtendimentoEntity> findByCep(String cep){
		return enderecoAtendimentoRepository.findByCep(cep);
	}

	public Optional<EnderecoAtendimentoEntity> findById(Long id){
		return enderecoAtendimentoRepository.findById(id);
	}

	public List<EnderecoAtendimentoEntity> findAll(){
		return enderecoAtendimentoRepository.findAll();
	}
	public void delete(Long id) throws NotFoundException {
		enderecoAtendimentoRepository.findById(id).orElseThrow(() -> new NotFoundException());
		enderecoAtendimentoRepository.deleteById(id);
	}

}
