package br.com.frankevistorias.apifvi.enderecoImobiliaria;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Repository
public interface EnderecoImobiliariaRepository extends JpaRepository<EnderecoImobiliariaEntity, Long>{

	List<EnderecoImobiliariaEntity> findByCep(String cep);

}
