package br.com.frankevistorias.apifvi.subGrupoImagem;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Service
public class SubGrupoImagemService {

    private final SubGrupoImagemRepository subGrupoImagemRepository;

    @Autowired
	public SubGrupoImagemService(SubGrupoImagemRepository subGrupoImagemRepository) {
		this.subGrupoImagemRepository = subGrupoImagemRepository;
	}

	public Long save(SubGrupoImagemEntity subGrupoImagemEntity) throws NotFoundException{

		subGrupoImagemEntity = subGrupoImagemRepository.save(subGrupoImagemEntity);

		return subGrupoImagemEntity.getId();
	}

	public List<SubGrupoImagemEntity> findAll(){
		return subGrupoImagemRepository.findAll();
	}

	public void delete(Long id) throws NotFoundException {
		subGrupoImagemRepository.findById(id).orElseThrow(() -> new NotFoundException());
		subGrupoImagemRepository.deleteById(id);
	}
    
}