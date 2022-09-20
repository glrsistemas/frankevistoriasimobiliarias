package br.com.frankevistorias.apifvi.observacao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Ilson Junior
 * @since 20/09/2022
 */

@Repository
public interface ObservacaoRepository extends JpaRepository<ObservacaoEntity, Long>{

}
