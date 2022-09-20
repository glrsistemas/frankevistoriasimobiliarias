package br.com.frankevistorias.apifvi.imobiliaria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Service
public class ImobiliariaService {

	@Value("${upload.arquivo.raiz}")
	private String raiz;

	@Value("${upload.arquivo.imobiliaria}")
	private String imobiliaria;

    private final ImobiliariaRepository imobiliariaRepository;

    @Autowired
	public ImobiliariaService(ImobiliariaRepository imobiliariaRepository) {
		this.imobiliariaRepository = imobiliariaRepository;
	}

	public Long save(ImobiliariaEntity imobiliariaEntity, MultipartFile file) throws NotFoundException{

		if(!file.isEmpty()) {
			imobiliariaEntity.setUri(upload(file));
		}

		imobiliariaEntity = imobiliariaRepository.save(imobiliariaEntity);

		return imobiliariaEntity.getId();
	}

	public List<ImobiliariaEntity> findAll(){
		return imobiliariaRepository.findAll();
	}
	public Optional<ImobiliariaEntity> findById(Long id){
		return imobiliariaRepository.findById(id);
	}
	public void delete(Long id) throws NotFoundException {
		imobiliariaRepository.findById(id).orElseThrow(() -> new NotFoundException());
		imobiliariaRepository.deleteById(id);
	}

	public String upload(MultipartFile file) throws NotFoundException {

		Path diretorioPath = Paths.get(this.raiz, imobiliaria);;
		String uri = raiz + "/" + imobiliaria;
		String nome = String.valueOf(file.getOriginalFilename()).split("[.]")[0];
		String timeStamp = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
		String formato = String.valueOf(file.getOriginalFilename()).split("[.]")[1];
		String arquivo = nome + " " + timeStamp + "." + formato;

		Path arquivoPath = diretorioPath.resolve(arquivo);

		try {
			Files.createDirectories(diretorioPath);
			file.transferTo(arquivoPath.toFile());
		} catch (IOException e) {
			throw new RuntimeException("Problemas na tentativa de salvar arquivo.", e);
		}

		return uri + "/" + arquivo;
	}
    
}