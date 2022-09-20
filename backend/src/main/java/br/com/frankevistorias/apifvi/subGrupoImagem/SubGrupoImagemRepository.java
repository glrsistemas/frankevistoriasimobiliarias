package br.com.frankevistorias.apifvi.subGrupoImagem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Ilson Junior
 * @since 20/09/2022
 */

 @Repository
public interface SubGrupoImagemRepository extends JpaRepository<SubGrupoImagemEntity, Long>{

}