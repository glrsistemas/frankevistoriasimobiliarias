package br.com.frankevistorias.apifvi.grupoImagem;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author Ilson Junior
 * @since 20/09/2022
 */

@Service
public class GrupoImagemService {

    private final GrupoImagemRepository grupoImagemRepository;

    @Autowired
	public GrupoImagemService(GrupoImagemRepository grupoImagemRepository) {
		this.grupoImagemRepository = grupoImagemRepository;
	}

	public Long save(GrupoImagemEntity grupoImagemEntity) throws NotFoundException{

		grupoImagemEntity = grupoImagemRepository.save(grupoImagemEntity);

		return grupoImagemEntity.getId();
	}

	public List<GrupoImagemEntity> findAll(){
		return grupoImagemRepository.findAll();
	}

	public void delete(Long id) throws NotFoundException {
		grupoImagemRepository.findById(id).orElseThrow(() -> new NotFoundException());
		grupoImagemRepository.deleteById(id);
	}
    
}