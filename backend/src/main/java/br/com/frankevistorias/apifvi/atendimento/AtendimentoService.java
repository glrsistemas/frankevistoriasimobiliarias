package br.com.frankevistorias.apifvi.atendimento;

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
public class AtendimentoService {

    private final AtendimentoRepository atendimentoRepository;

    @Autowired
	public AtendimentoService(AtendimentoRepository atendimentoRepository) {
		this.atendimentoRepository = atendimentoRepository;
	}

	public Long save(AtendimentoEntity atendimentoEntity) throws NotFoundException{

		atendimentoEntity = atendimentoRepository.save(atendimentoEntity);

		return atendimentoEntity.getId();
	}

	public List<AtendimentoEntity> findAll(){
		return atendimentoRepository.findAll();
	}

	public void delete(Long id) throws NotFoundException {
		atendimentoRepository.findById(id).orElseThrow(() -> new NotFoundException());
		atendimentoRepository.deleteById(id);
	}

	public List<AtendimentoEntity> findByReferenciaImovel(String referenciaImovel){
		return atendimentoRepository.findByReferenciaImovel(referenciaImovel);
	}

	public List<AtendimentoEntity> findByStatusEntityId(Long statusEntityId){
		return atendimentoRepository.findByStatusEntityId(statusEntityId);
	}
	public Optional<AtendimentoEntity> findById(Long id){
		return atendimentoRepository.findById(id);
	}
	public List<AtendimentoEntity> findByResponsavel(String responsavel){
		return atendimentoRepository.findByResponsavel(responsavel);
	}
	public List<AtendimentoEntity> findByImobiliariaEntityId(Long imobiliariaEntityId){
		return atendimentoRepository.findByImobiliariaEntityId(imobiliariaEntityId);
	}
    
}