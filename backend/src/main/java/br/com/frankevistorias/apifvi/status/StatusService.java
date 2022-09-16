package br.com.frankevistorias.apifvi.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Service
public class StatusService {

    private final StatusRepository statusRepository;

    @Autowired
	public StatusService(StatusRepository statusRepository) {
		this.statusRepository = statusRepository;
	}

	public Long save(StatusEntity statusEntity) throws NotFoundException{

		statusEntity = statusRepository.save(statusEntity);

		return statusEntity.getId();
	}

	public List<StatusEntity> findAll(){
		return statusRepository.findAll();
	}

	public void delete(Long id) throws NotFoundException {
		statusRepository.findById(id).orElseThrow(() -> new NotFoundException());
		statusRepository.deleteById(id);
	}
    
}