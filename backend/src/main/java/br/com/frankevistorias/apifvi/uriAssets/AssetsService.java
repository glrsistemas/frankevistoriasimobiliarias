package br.com.frankevistorias.apifvi.uriAssets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Service
public class AssetsService {

    private final AssetsRepository assetsRepository;

    @Autowired
	public AssetsService(AssetsRepository assetsRepository) {
		this.assetsRepository = assetsRepository;
	}

	public Long save(AssetsEntity assetsEntity) throws NotFoundException{

		assetsEntity = assetsRepository.save(assetsEntity);

		return assetsEntity.getId();
	}

	public Long save(MultipartFile file, String origemUpload, Integer id) throws NotFoundException{

		String diretorio = null;

		if(origemUpload == "atendimento"){
			diretorio = "uploads/atendimento";
		}else if(origemUpload == "usuario"){
			diretorio = "uploads/usuario";
		}else {
			diretorio = "uploads";
		}

		assetsRepository.init(diretorio);

		assetsEntity = assetsRepository.save(assetsEntity);

		return assetsEntity.getId();
	}

	public List<AssetsEntity> findAll(){
		return assetsRepository.findAll();
	}
	
	public void delete(Long id) throws NotFoundException {
		assetsRepository.findById(id).orElseThrow(() -> new NotFoundException());
		assetsRepository.deleteById(id);
	}
	/*
	public AssetsDTO findIdUsuario(Long idUsuario){
		AssetsDTO assetsUsuario = new AssetsDTO(assetsRepository.findIdUsuario(idUsuario).get());
		return assetsUsuario ;
	}
    */
}