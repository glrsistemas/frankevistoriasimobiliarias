package br.com.frankevistorias.apifvi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Service
public class ConfigService {

    private final ConfigRepository configRepository;

    @Autowired
	public ConfigService(ConfigRepository configRepository) {
		this.configRepository = configRepository;
	}

	public Long save(ConfigEntity configEntity) throws NotFoundException{

		configEntity = configRepository.save(configEntity);

		return configEntity.getId();
	}

	public List<ConfigEntity> findAll(){
		return configRepository.findAll();
	}

	public void delete(Long id) throws NotFoundException {
		configRepository.findById(id).orElseThrow(() -> new NotFoundException());
		configRepository.deleteById(id);
	}
    
}