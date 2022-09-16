package br.com.frankevistorias.apifvi.enderecoAtendimento;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Repository
public interface EnderecoAtendimentoRepository extends JpaRepository<EnderecoAtendimentoEntity, Long>{

	List<EnderecoAtendimentoEntity> findByCep(String cep);

}
