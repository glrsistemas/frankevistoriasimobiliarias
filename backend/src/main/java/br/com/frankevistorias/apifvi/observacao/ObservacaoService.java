package br.com.frankevistorias.apifvi.observacao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author Ilson Junior
 * @since 20/08/2022
 */

@Service
public class ObservacaoService {

    private final ObservacaoRepository observacaoRepository;

    @Autowired
	public ObservacaoService(ObservacaoRepository observacaoRepository) {
		this.observacaoRepository = observacaoRepository;
	}

	public Long save(ObservacaoEntity observacaoEntity) throws NotFoundException{

		observacaoEntity = observacaoRepository.save(observacaoEntity);

		return observacaoEntity.getId();
	}

	public List<ObservacaoEntity> findAll(){
		return observacaoRepository.findAll();
	}

	public void delete(Long id) throws NotFoundException {
		observacaoRepository.findById(id).orElseThrow(() -> new NotFoundException());
		observacaoRepository.deleteById(id);
	}
    
}