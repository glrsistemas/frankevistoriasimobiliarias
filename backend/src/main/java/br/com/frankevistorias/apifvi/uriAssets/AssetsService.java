package br.com.frankevistorias.apifvi.uriAssets;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Service
public class AssetsService {

    private final AssetsRepository assetsRepository;

	@Value("${upload.arquivo.raiz}")
	private String raiz;

	@Value("${upload.arquivo.atendimento}")
	private String atendimento;

    @Autowired
	public AssetsService(AssetsRepository assetsRepository) {
		this.assetsRepository = assetsRepository;
	}

	public List<Long> save(AssetsEntity assetsEntity, List<MultipartFile> file) throws NotFoundException{

		List<Long> ids = new ArrayList();
		Path diretorioPath;
		AssetsEntity asset = new AssetsEntity();
		String uri;
		Long difereId = (long) 1;

		diretorioPath = Paths.get(this.raiz, atendimento);
		uri = raiz + "/" + atendimento;

		for (MultipartFile element : file) {

			String nome = String.valueOf(element.getOriginalFilename()).split("[.]")[0];
			String timeStamp = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
			String formato = String.valueOf(element.getOriginalFilename()).split("[.]")[1];
			String arquivo = nome + " " + timeStamp + "." + formato;

			Path arquivoPath = diretorioPath.resolve(arquivo);

			try {
				Files.createDirectories(diretorioPath);
				element.transferTo(arquivoPath.toFile());
			} catch (IOException e) {
				throw new RuntimeException("Problemas na tentativa de salvar arquivo.", e);
			}

			assetsEntity.setUri(uri + "/" + arquivo);
			assetsEntity.setId(difereId);
			difereId += 1;
			asset = assetsRepository.save(assetsEntity);

			ids.add(asset.getId());

		}

		return ids;
	}

	public List<AssetsEntity> findAll(){
		return assetsRepository.findAll();
	}

	public void delete(Long id) throws NotFoundException {
		assetsRepository.findById(id).orElseThrow(() -> new NotFoundException());
		assetsRepository.deleteById(id);
	}
    
}