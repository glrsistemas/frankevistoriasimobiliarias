package br.com.frankevistorias.apifvi.enderecoUsuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Repository
public interface EnderecoUsuarioRepository extends JpaRepository<EnderecoUsuarioEntity, Long>{

	List<EnderecoUsuarioEntity> findByCep(String cep);

}
